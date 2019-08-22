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
  bubbleScalefactor: 0.006,

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

  /**
   * Key name of count should show
   * @return {String}
   */
  keyName: 'total',

  // -------------------------------------------------------------------------
  // Methods

  renderMap: function() {
    let component = this;
    let width = component.get('width');
    let height = component.get('height');
    let keyName = component.get('keyName');
    let projection = d3
      .geoEquirectangular()
      .scale(height / Math.PI)
      .translate([width / 2, height / 2]);
    let path = d3.geoPath().projection(projection);

    let svg = d3
      .select(component.element)
      .insert('svg')
      .attr('width', width)
      .attr('height', height);

    let states = svg.append('svg:g').attr('id', 'states');

    let circles = svg.append('svg:g').attr('id', 'circles');

    let labels = svg.append('svg:g').attr('id', 'labels');

    component
      .get('countriesService')
      .getCountries()
      .then(collection => {
        states
          .selectAll('path')
          .data(collection.features)
          .enter()
          .append('svg:path')
          .attr('d', path);
      });

    component
      .get('countriesService')
      .getCountriesRegion()
      .then(region => {
        let locationDataCount = component.get('locationDataCount');
        locationDataCount.forEach(data => {
          let countryRegion = region.findBy('code', data.get('code'));
          data.set('longitude', countryRegion.get('longitude'));
          data.set('latitude', countryRegion.get('latitude'));
          data.set('percentage', countryRegion.get('totalPercentage'));
        });
        circles
          .selectAll('circle')
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
            const count = d.get(keyName);
            const numberOfDigits = count.toString().length;
            return component.circleRadius(numberOfDigits);
          });

        labels
          .selectAll('labels')
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

            return projection([longitude, latitude])[1] + 5;
          })
          .attr('dy', function(d) {
            let count = d.get(keyName);
            let size = Math.round(
              count * component.get('bubbleTextScalefactor')
            );
            //TODO should update the logic of calculatiing dy position
            return keyName === 'active' ? size / 2 : 0;
          })
          .attr('text-anchor', 'middle')
          .attr('style', function(d) {
            let count = d.get(keyName);
            //TODO should update the logic of calculatiing font size
            let size =
              keyName === 'active'
                ? Math.round(count * component.get('bubbleTextScalefactor'))
                : 16;
            return `font-size:${size}px`;
          })
          .text(function(d) {
            let count = d.get(keyName);
            //TODO change text calculation logic
            const numberOfDigits = count.toString().length;
            return numberOfDigits > 4 ? component.dataCountFormat(count) : '';
          });
      });
  },

  dataCountFormat(value) {
    return Number(value) >= 1.0e9
      ? `${this.trimDigits(Number(value) / 1.0e9)}B`
      : Math.round(Number(value)) >= 1.0e6
        ? `${this.trimDigits(Number(value) / 1.0e6)}M`
        : Math.round(Number(value)) >= 1.0e3
          ? `${this.trimDigits(Number(value) / 1.0e3)}K`
          : value;
  },

  trimDigits(value) {
    const newVal = value.toString().substring(0, 4);
    if (newVal.indexOf('.') === 3) {
      return newVal.substring(0, 3);
    }
    return newVal;
  },

  circleRadius(numberOfDigits) {
    if (numberOfDigits <= 2) {
      return 12;
    } else if (numberOfDigits === 3) {
      return 16;
    } else if (numberOfDigits === 4) {
      return 24;
    } else if (numberOfDigits === 5) {
      return 36;
    } else if (numberOfDigits >= 6) {
      return 48;
    }
  }
});
