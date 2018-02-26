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

  /**
   * competency service dependency injection
   * @type {Object}
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['competency-matrix-chart'],


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} width
   */
  width: 700,

  /**
   * @property {Number} height
   */
  height: 900,

  /**
   * User id of competency matrix to plot
   * @type {String}
   */
  userId: null,

  /**
   * Different color range based on status
   * @type {Object}
   */
  colorsBasedOnStatus: Ember.Object.create({
    '0': '#CCD0D5',
    '1': '#67C1F8',
    '2': '#67C1F8',
    '3': '#67C1F8',
    '4': '#67C1F8',
    '5': '#1C9EEE',
    '-1': '#EAEAEA'
  }),


  /**
   * Width of the cell
   * @type {Number}
   */
  cellWidth: 15,

  /**
   * It will have selected taxonomy subject courses
   * @type {Object}
   */
  taxonomyCourses: Ember.A(),

  /**
   * It will have  taxonomy subjects
   * @type {Object}
   */
  taxonomySubjects: null,

  /**
   * It  will have default subject category
   * @type {String}
   */
  selectedSubjectCategory: 'k_12',


  isLoading: false,

  /**
   * subjectId  change will call the function
   */
  onChange: Ember.observer('subjectId', function() {
    let component = this;
    component.loadDataBySubject(component.get('subjectId'));
    return null;
  }),


  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    let component = this;
    component.loadDataBySubject(component.get('subjectId'));
  },

  // -------------------------------------------------------------------------
  // actions

  // -------------------------------------------------------------------------
  // Methods

  drawChart: function(data) {
    let component = this;
    const colorsBasedOnStatus = component.get('colorsBasedOnStatus');
    const cellWidth = component.get('cellWidth');
    const width = component.get('width');
    const numberOfCourses = component.get('taxonomyCourses').length;
    const height = cellWidth * (numberOfCourses * 2);
    component.$('#competency-matrix-chart').empty();
    const svg = d3.select('#competency-matrix-chart').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');
    const cards = svg.selectAll('.competency')
      .data(data);
    cards.enter().append('rect')
      .attr('x', (d) => (d.xAxisSeq - 1) * cellWidth)
      .attr('y', (d) => (d.yAxisSeq - 1) * cellWidth)
      .attr('class', 'competency')
      .attr('width', cellWidth)
      .attr('height', cellWidth)
      .on('click', function(d) {
        component.sendAction('onCompetencyPullOut', d);
      })
      .merge(cards)
      .style('fill', '#EAEAEA')
      .transition()
      .duration(1000)
      .style('fill', (d) => {
        return colorsBasedOnStatus.get(d.status.toString());
      })
      .style('cursor', 'pointer');
    cards.exit().remove();
  },


  loadDataBySubject: function(subjectId) {
    let component = this;
    let userId = component.get('userId');
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      competencyMatrixs: component.get('competencyService').getCompetencyMatrix(userId, subjectId),
      competencyMatrixCoordinates: component.get('competencyService').getCompetencyMatrixCoordinates(subjectId)
    }).then(({
      competencyMatrixs,
      competencyMatrixCoordinates
    }) => {
      component.set('isLoading', false);
      let resultSet = component.parseCompetencyData(competencyMatrixs, competencyMatrixCoordinates);
      component.drawChart(resultSet);
    });

  },

  parseCompetencyData: function(competencyMatrixs, competencyMatrixCoordinates) {
    let component = this;
    let courses = competencyMatrixCoordinates.get('courses').toArray().reverse();
    let taxonomyCourses = Ember.A();
    let domains = competencyMatrixCoordinates.get('domains');
    let currentYaxis = 1;
    let resultSet = Ember.A();
    courses.forEach(courseData => {
      let courseCode = courseData.get('courseCode');
      let courseName = courseData.get('courseName');
      let courseSeq = courseData.get('courseSeq');
      let competencyMatrix = competencyMatrixs.findBy('courseCode', courseCode);
      let competencyMatrixByDomain = competencyMatrix ? competencyMatrix.get('domains') : [];
      if (competencyMatrix && competencyMatrixByDomain.length > 0) {
        taxonomyCourses.pushObject(courseData);
        let mergeDomainData = Ember.A();
        competencyMatrixByDomain.forEach(domainMatrix => {
          let domainCode = domainMatrix.get('domainCode');
          let domain = domains.findBy('domainCode', domainCode);
          let domainName = domain.get('domainName');
          let domainSeq = domain.get('domainSeq');
          let competencies = domainMatrix.get('competencies');
          competencies.forEach(competency => {
            let competencyCode = competency.get('competencyCode');
            let competencyName = competency.get('competencyName');
            let competencySeq = competency.get('competencySeq');
            let status = competency.get('status');
            let data = Ember.Object.create({
              'courseCode': courseCode,
              'courseName': courseName,
              'courseSeq': courseSeq,
              'domainName': domainName,
              'domainCode': domainCode,
              'domainSeq': domainSeq,
              'competencyCode': competencyCode,
              'competencyName': competencyName,
              'competencySeq': competencySeq,
              'status': status
            });
            if (status === 5) {
              mergeDomainData.forEach(data => {
                data.set('status', 5);
              });
            }
            mergeDomainData.pushObject(data);

          });
        });
        let cellIndex = 1;
        mergeDomainData.forEach(data => {
          data.set('xAxisSeq', cellIndex);
          data.set('yAxisSeq', currentYaxis);
          resultSet.pushObject(data);
          cellIndex++;
        });
        currentYaxis = currentYaxis + 2;
      }

    });
    component.set('taxonomyCourses', taxonomyCourses);
    return resultSet;
  }

});
