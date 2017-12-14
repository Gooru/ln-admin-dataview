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
      height: parseInt($component.css('height').split('px')[0]),
      width: parseInt($component.css('width').split('px')[0])
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

  nodeClickEventNotifyCount: 0,

  root: null,

  treemap: null,

  index: 0,

  svg: null,

  duration: 750,

  // -------------------------------------------------------------------------
  // Methods
  //
  renderTreeView: function() {
    let component = this;
    let width = component.get('width');
    let height = component.get('height');
    let svg = d3.select(component.element).append('svg')
      .attr('width', component.get('width'))
      .attr('height', component.get('height'))
      .append('g');
    let treemap = d3.tree().size([height, width]);
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
    component.set('treemap', treemap);
    component.set('svg', svg);
    this.update(root);
  },

  update: function(source) {
    let component = this;
    let duration = component.get('duration');
    let treemap = component.get('treemap');
    let svg = component.get('svg');
    let treeData = treemap(component.get('root'));
    let nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

    nodes.forEach(function(d) {
      d.y = d.depth * 180;
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
      if (d.children) {
        d._children = d.children;
        d.children = null;
        component.update(d);
      } else {
        component.sendAction('onClickNode', d, component);
      }
    }
    let nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', function() {
        return `translate(${  source.y0  },${  source.x0  })`;
      })
      .on('click', click);

    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 3)
      .style('fill', function(d) {
        return d._children ? 'lightsteelblue' : '#fff';
      });

    nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('x', function(d) {
        return d.children || d._children ? -13 : 13;
      })
      .attr('text-anchor', function(d) {
        return d.children || d._children ? 'end' : 'start';
      })
      .text(function(d) {
        return d.data.name;
      });

    let nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(duration)
      .attr('transform', function(d) {
        return `translate(${  d.y  },${  d.x  })`;
      });

    nodeUpdate.select('circle.node')
      .attr('r', 5)
      .style('fill', function(d) {
        return d._children ? 'lightsteelblue' : '#fff';
      })
      .attr('cursor', 'pointer');

    let nodeExit = node.exit().transition()
      .duration(duration)
      .attr('transform', function() {
        return `translate(${  source.y  },${  source.x  })`;
      })
      .remove();

    nodeExit.select('circle')
      .attr('r', 1e-6);

    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

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

    /*var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {
          x: source.x,
          y: source.y
        };
        return diagonal(o, o);
      })
      .remove(); */

    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  },

  data: null,

  updateData: function(d) {
    let component = this;
    /*console.log(d);


    let childNodes = d._children;
    var childData = [];
    if (!d.children) {

    }
    childNodes.forEach(childNode => {
      let nodes = childNode.data.children;
      var childArray = [];
      var parentObj = d3.hierarchy(childNode);

      parentObj.data.parent = d.name;
      parentObj.depth = d.depth + 1;
      parentObj.height = d.height + 1;
      parentObj.parent = d;
      parentObj.name = childNode.name;
      nodes.forEach(node => {
          var obj = d3.hierarchy(node);
          obj.data.parent = parentObj.name;
          obj.depth = parentObj.depth + 1;
          obj.height = parentObj.height + 1;
          obj.parent = parentObj;
          obj.name = node.name;
          childArray.push(obj);
      });
      parentObj.children = childArray;
      childData.push(parentObj);
    }); */
    //d.children = childData;

    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    component.update(d);
  }

});
