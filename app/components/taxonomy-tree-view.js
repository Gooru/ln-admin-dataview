/**
 * Collapsible Tree
 *
 * Component responsible for showing the collapsible tree view for given data.
 *
 * @module
 * @augments ember/Component
 */
import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['taxonomy-tree-view'],
  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    const $component = this.$();

    // Get the component dimensions from the css
    this.setProperties({
      height: parseInt($component.height()),
      width: parseInt($component.width())
    });
    // Render the tree view
    this.renderTreeView();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} width
   */
  width: null,

  /**
   * @property {Number} height
   */
  height: null,

  /**
   * @property {Object} margin
   * @return {Object}
   */
  margin: Ember.computed(function() {
    let margin = Ember.Object.create({
      top: 20,
      right: 120,
      bottom: 20,
      left: 120
    });
    return margin;
  }),

  /**
   * Root node of the tree
   * @type {[type]}
   */
  root: null,

  /**
   * Index value of each nodes
   * @type {Number}
   */
  index: 0,

  /**
   * Tree node links animation duration.
   * @type {Number}
   */
  duration: 750,

  // -------------------------------------------------------------------------
  // Methods
  //
  renderTreeView: function() {
    let component = this;
    let height = component.get('height');
    let treeData = this.get('data');
    let root = d3.hierarchy(treeData, function(d) {
      return d.children;
    });
    root.x0 = height / 2;
    root.y0 = 0;
    /**
     * collapse the tree node
     */
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }
    root.children.forEach(collapse);
    component.set('root', root);
    this.update(root);
  },

  update: function(source) {
    let component = this;
    let duration = component.get('duration');
    let width = component.get('width');
    let margin = component.get('margin');
    let root = component.get('root');


    // compute the new height
    let levelWidth = [1];
    let childCount = function(level, n) {
      if (n.children && n.children.length > 0) {
        if (levelWidth.length <= level + 1) {
          levelWidth.push(0);
        }
        levelWidth[level + 1] += n.children.length;
        n.children.forEach(function(d) {
          childCount(level + 1, d);
        });
      }
    };
    childCount(0, root);

    let newHeight = d3.max(levelWidth) * 80;

    let treemap = d3.tree().size([newHeight, width]);

    let treeData = treemap(component.get('root'));
    let nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);


    d3.select('svg').remove();

    let svg = d3.select(component.element).append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', newHeight + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${  margin.left  },${  margin.top  })`);

    nodes.forEach(function(d) {
      d.y = d.depth * 200;
    });

    let node = svg.selectAll('g.node')
      .data(nodes, function(d) {
        let index = component.get('index');
        component.set('index', ++index);
        return d.id || (d.id = component.get('index'));
      });
    /**
     * Click handling on when each node get choosed
     */
    function click(d) {
      if (d.depth > 0) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
          component.update(d);
        } else {
          component.sendAction('onClickNode', d, component);
        }
      }
    }

    /**
     * Event get triggered when more info button got clicked
     * @param  {Node} d selected node
     */
    function onMoreInfoClick(d) {
      component.sendAction('onClickNodeMoreInfo', d.data.id);
      d3.event.stopPropagation();
    }

    let nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', function() {
        return `translate(${  source.y0  },${  source.x0  })`;
      })
      .on('click', click);

    let nodeText = nodeEnter.append('svg:foreignObject')
      .attr('y', -10)
      .attr('text-anchor', function(d) {
        return d.children || d._children ? 'end' : 'start';
      })
      .style('fill-opacity', 1e-6)
      .attr('width', 200).attr('height', 50)
      .append('xhtml:div')
      .attr('class', function(d) {
        return `${'node-label node-'}${d.depth}`;
      });

    //Node label
    nodeText.append('xhtml:div')
      .attr('class', 'node-text')
      .text(function(d) {
        return d.data.name;
      });

    nodeText.append('xhtml:div').attr('class', 'node-more-info').append('i')
      .attr('class', 'ic_info_outline material-icons').text('ic_info_outline').on('click', onMoreInfoClick);

    let nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(duration)
      .attr('transform', function(d) {
        return `translate(${  d.y  },${  d.x  })`;
      });


    node.exit().transition()
      .duration(duration)
      .attr('transform', function() {
        return `translate(${  source.y  },${  source.x  })`;
      })
      .remove();

    let link = svg.selectAll('path.link')
      .data(links, function(d) {
        return d.id;
      });
    /**
     * Generates the diagonal path
     */
    function diagonal(s, d) {
      let path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;

      return path;
    }

    let linkEnter = link.enter().insert('path', 'g')
      .attr('class', 'link')
      .attr('d', function() {
        var o = {
          x: source.x0,
          y: source.y0
        };
        return diagonal(o, o);
      });

    let linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d) {
        return diagonal(d, d.parent);
      });

    link.exit().transition()
      .duration(duration)
      .attr('d', function() {
        var o = {
          x: source.x,
          y: source.y
        };
        return diagonal(o, o);
      })
      .remove();

    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  },

  data: null,

  updateData: function(selectedNode, newNodes) {
    let component = this;

    if (!selectedNode.children) {
      var childArray = [];
    }

    selectedNode.height = selectedNode.height + 1;

    newNodes.forEach(function(d) {
      var obj = d3.hierarchy(d);
      obj.data.parent = selectedNode.name;
      obj.depth = selectedNode.depth + 1;
      obj.parent = selectedNode;
      obj.name = d.name;
      childArray.push(obj);
    });
    selectedNode.children = childArray;


    component.update(selectedNode);
  }

});
