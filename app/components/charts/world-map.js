/**
 * World map  with bubble data
 *
 * @module
 * @augments ember/Component
 */
import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * @requires service:countries
   */
  countriesService: Ember.inject.service('api-sdk/countries'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['world-map-chart'],

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    const $component = this.$();

    // Get the component dimensions from the css
    this.setProperties({
      height: parseInt($component.height()),
      width: parseInt($component.width())
    });
    // Render the Map
    this.renderMap();
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

  // -------------------------------------------------------------------------
  // Methods

  renderMap: function() {
    let component = this;
    var w,width = 1200;
    var h,height = 500;


    var projection = d3.geoEquirectangular()
      .scale(height / Math.PI)
      .translate([width / 2, height / 2]);
    var path = d3.geoPath()
      .projection(projection);

    var svg = d3.select(component.element).insert('svg')
      .attr('width', w)
      .attr('height', h);

    var states = svg.append('svg:g')
      .attr('id', 'states');

    component.get('countriesService').getCountries().then((collection) => {
      states.selectAll('path')
        .data(collection.features)
        .enter().append('svg:path')
        .attr('d', path);
    });
  }

});
