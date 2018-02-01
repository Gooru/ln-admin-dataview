import Ember from 'ember';
import d3 from 'd3';
import Utils from 'admin-dataview/utils/utils';


/**
 * Donut  chart
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['learning-activities-chart'],

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    const $component = this.$();

    // Get the component dimensions from the css
    this.setProperties({
      height: parseInt($component.height()),
      width: parseInt($component.width())
    });
    this.drawchart();

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
   * Data of donut chart
   * @return {Array}
   */
  data: Ember.A(),


  /**
   * Inner Radius of donut chart
   * @return {Number}
   */
  innerRadius: 65,

  /**
   *  radius of donut chart
   * @return {Number}
   */
  radius: 85,

  /**
   * Total count
   * @return {Number}
   */
  totalCount: Ember.computed('data.[]', function() {
    let count = 0;
    let dataSet = this.get('data');
    dataSet.forEach(data => {
      count+= data.value;
    });
    return count;
  }),


  // -------------------------------------------------------------------------
  // Methods

  drawchart: function() {
    let component = this;
    let width = component.get('width');
    let height = component.get('height');
    let data = component.get('data');
    let radius = component.get('radius');
    let innerRadius = component.get('innerRadius');
    let svg = d3.select(component.element)
      .append('svg')
      .attr('class', 'pie')
      .attr('width', width)
      .attr('height', height);

    let g = svg.append('g')
      .attr('transform', `translate(${  width / 2  },${  height / 2  })`);

    let arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    let pie = d3.pie()
      .value(function(d) {
        return d.value;
      })
      .sort(null);
    pie.padAngle(0.05);

    let arcs = g.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d) => {
        return d.data.colorCode;
      });

    arcs.append('svg:foreignObject')
      .attr('transform', (d) => {
        let _d = arc.centroid(d);
        _d[0] *= 1.2;
        _d[1] *= 1.2;
        return `translate(${  _d  })`;
      })
      .attr('width', 75)
      .attr('height', 50)
      .attr('x', (d) => {
        let _d = arc.centroid(d);
        let xAxis = _d[0] * 1.2;
        if (xAxis < 0) {
          return -50;
        } else {
          return 0;
        }
      }).attr('y', (d) => {
        let _d = arc.centroid(d);
        let yAxis = _d[1] * 1.2;
        if (yAxis < 0) {
          return -20;
        } else {
          return 0;
        }
      })
      .append('xhtml:div')
      .attr('class', 'title')
      .text((d) => {
        return `${Utils.dataCountFormatByKilo(d.data.value)  } ${  d.data.name}`;
      });
    let totalCount =  component.get('totalCount');
    let label = component.get('i18n').t('activities.learning-activities-available').string;
    let text = g.append('svg:foreignObject')
      .attr('width', (width / 2)).attr('height', radius)
      .attr('x', -(width / 4))
      .attr('y', -(radius / 4));
    text.append('xhtml:div')
      .attr('class', 'header-count').text(totalCount.toLocaleString('en-US'));
    text.append('xhtml:div')
      .attr('class', 'header-title').text(label);
  }

});
