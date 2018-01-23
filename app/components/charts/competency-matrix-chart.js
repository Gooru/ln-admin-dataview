/**
 * Comptency matrix chart
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

  competencyService: Ember.inject.service('api-sdk/competency'),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['competency-matrix-chart'],

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
    this.loadDataBySubject('k12.sc');
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
   * User id of competency matrix to plot
   * @type {String}
   */
  userId: null,

  colorsBasedOnStatus: Ember.Object.create({
    '0': '#CCD0D5',
    '1': '#67C1F8',
    '2': '#67C1F8',
    '3': '#67C1F8',
    '4': '#67C1F8',
    '5': '#1C9EEE'
  }),

  defaultNumberOfYaixsRow: 2,


  // -------------------------------------------------------------------------
  // Methods

  drawChart: function(data) {
    let component = this;
    const colorsBasedOnStatus = component.get('colorsBasedOnStatus');
    const width = 900,
      height = 430,
      gridSize = 20;
    const svg = d3.select('#chart').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');

    const cards = svg.selectAll('.competency')
      .data(data, (d) => `${d.yAxisSeq  }:${  d.xAxisSeq}`);

    cards.append('title');

    cards.enter().append('rect')
      .attr('x', (d) => (d.yAxisSeq - 1) * gridSize)
      .attr('y', (d) => (d.xAxisSeq - 1) * gridSize)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('class', 'competency bordered')
      .attr('width', gridSize)
      .attr('height', gridSize)
      .style('fill', '#ccc')
      .merge(cards)
      .transition()
      .duration(1000)
      .style('fill', (d) => {
        return colorsBasedOnStatus.get(d.status.toString());
      });

    cards.exit().remove();

  },

  loadDataBySubject: function(subjectId) {
    let component = this;
    let defaultNumberOfYaixsRow = component.get('defaultNumberOfYaixsRow');
    let currentYaxis = 0;
    return Ember.RSVP.hash({
      competencyMatrixs: component.get('competencyService').getCompetencyMatrix('user-id', subjectId),
      competencyMatrixCoordinates: component.get('competencyService').getCompetencyMatrixCoordinates(subjectId)
    }).then(({
      competencyMatrixs,
      competencyMatrixCoordinates
    }) => {
      let courses = competencyMatrixCoordinates.get('courses');
      let resultSet = Ember.A();
      courses.forEach(courseData => {
        let courseCode = courseData.get('courseCode');
        let courseName = courseData.get('courseName');
        let courseSeq = courseData.get('courseSeq');

        let competencyMatrix = competencyMatrixs.findBy('courseCode', courseCode);
        let competencyMatrixByDomain = competencyMatrix ? competencyMatrix.get('domains') : [];
        if (competencyMatrix && competencyMatrixByDomain.length > 0) {
          let mergeDomainData = Ember.A();
          let competencies = competencyMatrixByDomain.get('competencies');
          competencies.forEach(competency => {
            mergeDomainData.pushObject(competency);
          });

        } else {
          for (let defaultNumberOfYaixsRowIndex = 0; defaultNumberOfYaixsRowIndex < defaultNumberOfYaixsRow; defaultNumberOfYaixsRowIndex++) {
            currentYaxis = currentYaxis + defaultNumberOfYaixsRowIndex;
            for (let index = 0; index < 10; index++) {
              let dummyData = Ember.Object.create({
                'courseCode': courseCode,
                'courseName': courseName,
                'courseSeq': courseSeq,
                'yAxisSeq': currentYaxis,
                'xAxisSeq': index,
                'status': 0
              });
              resultSet.pushObject(dummyData);
            }
          }
        }

      });

      component.drawChart(resultSet);

    });
  }

});
