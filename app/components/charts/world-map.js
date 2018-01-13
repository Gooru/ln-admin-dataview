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

  /**
   * Bubbles scale factor
   * @property {Number} bubbleScalefactor
   */
  bubbleScalefactor: 0.008,

  /**
   * Bubbles text scale factor
   * @property {Number} bubbleTextScalefactor
   */
  bubbleTextScalefactor: 0.003,

  /**
   * It will have the location based data count to populate bubbles in map
   * @type {Array}
   */
  locationDataCount: null,

  // -------------------------------------------------------------------------
  // Methods

  renderMap: function() {
    let component = this;
    let width = component.get('width');
    let height = component.get('height');

    let projection = d3.geoEquirectangular()
      .scale(height / Math.PI)
      .translate([width / 2, height / 2]);
    let path = d3.geoPath()
      .projection(projection);

    let svg = d3.select(component.element).insert('svg')
      .attr('width', width)
      .attr('height', height);

    let states = svg.append('svg:g')
      .attr('id', 'states');

    let circles = svg.append('svg:g')
      .attr('id', 'circles');


    let labels = svg.append('svg:g')
      .attr('id', 'labels');

    component.get('countriesService').getCountries().then((collection) => {
      states.selectAll('path')
        .data(collection.features)
        .enter().append('svg:path')
        .attr('d', path);
    });

    component.get('countriesService').getCountriesRegion().then((region) => {
      let locationDataCount = component.get('locationDataCount');
      locationDataCount.forEach(data => {
        let countryRegion = region.findBy('country_code', data.get('country_code'));
        data.set('longitude', countryRegion.get('longitude'));
        data.set('latitude', countryRegion.get('latitude'));
      });
      circles.selectAll('circle')
        .data(locationDataCount)
        .enter()
        .append('svg:circle')
        .attr('cx', function(d) {
          let longitude = d.get('longitude');
          let latitude = d.get('latitude');
          return projection([longitude, latitude])[0];
        })
        .attr('cy', function(d) {
          let longitude = d.get('longitude');
          let latitude = d.get('latitude');
          return projection([longitude, latitude])[1];
        })
        .attr('r', function(d) {
          let count = d.get('count');
          return (count) * component.get('bubbleScalefactor');
        });

      labels.selectAll('labels')
        .data(locationDataCount)
        .enter()
        .append('svg:text')
        .attr('x', function(d) {
          let longitude = d.get('longitude');
          let latitude = d.get('latitude');
          return projection([longitude, latitude])[0];
        })
        .attr('y', function(d) {
          let longitude = d.get('longitude');
          let latitude = d.get('latitude');

          return projection([longitude, latitude])[1];
        })
        .attr('dy', function(d) {
          let count = d.get('count');
          let size = Math.round((count) * component.get('bubbleTextScalefactor'));
          return (size / 2);
        })
        .attr('text-anchor', 'middle')
        .attr('style', function(d) {
          let count = d.get('count');
          let size = Math.round((count) * component.get('bubbleTextScalefactor'));
          return `font-size:${  size  }px`;
        }).text(function(d) {
          let count = d.get('count');
          return component.dataCountFormat(count);
        });
    });
  },

  dataCountFormat: function(count) {
    return Math.abs(Number(count)) >= 1.0e+9 ?
      `${Math.round(Math.abs(Number(count)) / 1.0e+9)  }B` :
      Math.round(Math.abs(Number(count)) >= 1.0e+6) ?
        `${Math.round(Math.abs(Number(count)) / 1.0e+6)  }M`:
        Math.round(Math.abs(Number(count)) >= 1.0e+3) ?
          `${Math.round(Math.abs(Number(count)) / 1.0e+3)  }K`:
          '';
  }


});
