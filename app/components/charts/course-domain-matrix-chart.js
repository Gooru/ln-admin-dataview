/**
 * Competency matrix domain chart
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

  classNames: ['course-domain-matrix-chart'],

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} width
   */
  width: 780,

  /**
   * @property {Number} height
   */
  height: 900,

  /**
   * @property {Number} competency left panel height
   */
  competencypanelHeight: 400,

  /**
   * User id of competency matrix to plot
   * @type {String}
   */
  userId: null,

  /**
   * Width of the cell
   * @type {Number}
   */
  cellWidth: 32,

  /**
   * height of the cell
   * @type {Number}
   */
  cellHeight: 32,

  /**
   * It will have  taxonomy courses by selected subject
   * @type {Object}
   */
  taxonomyCourses: Ember.A(),

  /**
   * It will have  taxonomy  domains by selected subject
   * @type {Object}
   */
  taxonomyDomains: Ember.A(),

  /**
   * It will have  taxonomy competencies and micro-competencies by Selected domain
   * @type {Object}
   */
  taxonomyDomainCompetencies: Ember.A(),

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
   * It  will have chart value width scroll width handling
   * @type {String}
   */
  isTaxonomyCourses: Ember.computed('taxonomyCourses', function() {
    let component = this;
    let length = component.get('taxonomyCourses').length;
    return length > 0;
  }),

  /**
   * subjectId  change will call the function
   */
  onChange: Ember.observer('subjectId', function() {
    let component = this;
    if (component.get('subjectId')) {
      component.set('isDomainViewEnabled', false);
      component.loadDataBySubject(component.get('subjectId'));
    }
    return null;
  }),

  /**
   * Maintains the pull out state.
   * @type {Boolean}
   */
  showPullOut: false,

  /**
   * It maintains the data of selected domain.
   * @type {Object}
   */
  selectedDomainData: null,

  /**
   * It maintains the state of domain view
   * @type {Boolean}
   */
  isDomainViewEnabled: false,

  /**
   * default height of competency container
   * @type {Number}
   */
  defaultHeightOfCompetencyContainer: 56,

  isSocialScience: false,

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    let component = this;
    if (component.get('subjectId')) {
      component.loadDataBySubject(component.get('subjectId'));
    }
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    backToCourseView: function() {
      let component = this;
      component.set('isDomainViewEnabled', false);
      component.set('showPullOut', false);
      component.$('.block-container').remove();
    },

    showMicroCompetency: function(competency, index) {
      let component = this;
      let defaultHeightOfCompetencyContainer = component.get(
        'defaultHeightOfCompetencyContainer'
      );
      let domainCompetencyContainer = component.$(
        `.domain-competency-info-container-${index}`
      );
      let height =
        component
          .$(domainCompetencyContainer)
          .find('.micro-competency-container')
          .height() +
        (defaultHeightOfCompetencyContainer + 10);
      let isEnabled = component
        .$(domainCompetencyContainer)
        .hasClass('micro-competency-enabled');
      if (!isEnabled) {
        component.$(domainCompetencyContainer).animate(
          {
            height: `${height}px`
          },
          function() {
            component
              .$(domainCompetencyContainer)
              .addClass('micro-competency-enabled');
          }
        );
      } else {
        component.$(domainCompetencyContainer).animate(
          {
            height: `${defaultHeightOfCompetencyContainer}px`
          },
          function() {
            component
              .$(domainCompetencyContainer)
              .removeClass('micro-competency-enabled');
          }
        );
      }
    },

    domainCompetencyPullOut: function(competency, status) {
      this.sendAction('domainCompetencyPullOut', competency, status);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  drawChart: function(data) {
    let component = this;
    let cellWidth = component.get('cellWidth');
    let cellHeight = component.get('cellHeight');
    let height = component.get('taxonomyCourses').length * cellHeight;
    component.set('height', height);
    component.set('competencypanelHeight', height + 10);
    let width = component.get('taxonomyDomains').length * cellWidth;
    component.set('width', width);
    component.$('#course-domain-matrix-chart').empty();
    const svg = d3
      .select('#course-domain-matrix-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');
    const cards = svg.selectAll('.course-domain-cell').data(data);
    cards
      .enter()
      .append('rect')
      .attr('x', d => (d.domainSeq - 1) * cellWidth)
      .attr('y', d => (d.courseSeq - 1) * cellHeight)
      .attr('class', 'course-domain-cell')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .on('click', function(d) {
        component.set('selectedDomainData', d);
        component.blockChartContainer(d);
        component.getCompetenciesByDomain(d);
        component.sendAction('onChooseDomain', d);
      })
      .merge(cards)
      .style('fill', '#EAEAEA')
      .transition()
      .duration(1000)
      .style('fill', '#1aa9eb');
  },

  loadDataBySubject: function(subjectId) {
    let component = this;
    let userId = component.get('userId');
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      competencyMatrixs: component
        .get('competencyService')
        .getCompetencyMatrix(userId, subjectId),
      matrixCoordinates: component
        .get('competencyService')
        .getCompetencyMatrixCoordinates(subjectId)
    }).then(({ competencyMatrixs, matrixCoordinates }) => {
      component.set('isLoading', false);
      let resultSet = component.parseCourseDomainData(
        competencyMatrixs,
        matrixCoordinates
      );
      component.drawChart(resultSet);
    });
  },

  parseCourseDomainData: function(competencyMatrixs, matrixCoordinates) {
    let component = this;
    let courses = matrixCoordinates
      .get('courses')
      .toArray()
      .reverse();
    let resultSet = Ember.A();
    let domains = matrixCoordinates.get('domains');
    component.set('taxonomyDomains', domains);
    domains.forEach(domainData => {
      let domainCode = domainData.get('domainCode');
      let domain = domains.findBy('domainCode', domainCode);
      competencyMatrixs.forEach(coursesData => {
        let courseCode = coursesData.get('courseCode');
        let courseData = courses.findBy('courseCode', courseCode);
        let courseSeq = courseData.get('courseSeq');
        let courseName = courseData.get('courseName');
        let courseDomainsData = coursesData.get('domains');
        let courseDomainData = courseDomainsData.findBy(
          'domainCode',
          domainCode
        );
        if (courseDomainData) {
          let domainSeq = domain.get('domainSeq');
          let domainName = domain.get('domainName');
          let data = Ember.Object.create({
            courseSeq: courseSeq,
            courseCode: courseCode,
            courseName: courseName,
            domainCode: domainCode,
            domainSeq: domainSeq,
            domainName: domainName
          });
          resultSet.pushObject(data);
        }
      });
    });
    let filterCourses = Ember.A();

    courses.forEach(course => {
      let coursedomain = resultSet.findBy('courseCode', course.courseCode);
      if (coursedomain) {
        filterCourses.push(course);
      }
    });
    component.set('taxonomyCourses', filterCourses);
    return resultSet;
  },

  blockChartContainer: function(selectedDomain) {
    let component = this;
    const actualCellWidth = component.get('cellWidth');
    const actuaCellHeight = component.get('cellHeight');
    const cellWidth = actualCellWidth + 2;
    const cellHeight = actuaCellHeight + 2;
    const width = component.get('width') + 2;
    let xAxisSeq = (selectedDomain.domainSeq - 1) * actualCellWidth - 1;
    let yAxisSeq = (selectedDomain.courseSeq - 1) * actuaCellHeight - 1;
    component.$('.block-container').remove();
    let container = `<div class="block-container" style="width:${width}px">`;
    container += `<div class="selected-domain"  style="width:${cellWidth}px; height:${cellHeight}px;top:${yAxisSeq}px; left:${xAxisSeq}px"></div>`;
    container += '</div>';
    component.$('#course-domain-matrix-chart').prepend(container);
  },

  getCompetenciesByDomain: function(selectedDomain) {
    let component = this;
    let subject = component.get('selectedSubject');
    let socialScienceSubject = subject.get('subjectTitle');
    if (socialScienceSubject === 'Social Sciences') {
      component.set('isSocialScience', true);
    }
    let courseId = selectedDomain.courseCode;
    let domainId = `${selectedDomain.courseCode}-${selectedDomain.domainCode}`;
    component.set('isLoading', true);
    component
      .get('taxonomyService')
      .getCourseDomains(subject, courseId)
      .then(() => {
        component
          .get('taxonomyService')
          .getDomainCodes(subject, courseId, domainId)
          .then(competencyData => {
            let taxonomyDomainCompetencies = Ember.A();
            if (competencyData && competencyData.length > 0) {
              let competencies = competencyData.objectAt(0);
              let data = competencies.get('children');
              data.forEach(competency => {
                let competencyDataNode = Ember.Object.create({
                  title: competency.get('title'),
                  id: competency.get('id'),
                  code: competency.get('code'),
                  microCompetencies: Ember.A()
                });
                let competenciesChildren = competency.get('children');
                if (competenciesChildren && competenciesChildren.length > 0) {
                  let competenciesChildData = competenciesChildren[0];
                  if (competenciesChildData) {
                    let microCompetenciesDataNode = Ember.A();
                    let microCompetencies = competenciesChildData.get(
                      'children'
                    );
                    microCompetencies.forEach(microCompetency => {
                      let microCompetencyDataNode = Ember.Object.create({
                        title: microCompetency.get('title'),
                        id: microCompetency.get('id'),
                        code: microCompetency.get('code')
                      });
                      microCompetenciesDataNode.pushObject(
                        microCompetencyDataNode
                      );
                    });
                    competencyDataNode.set(
                      'microCompetencies',
                      microCompetenciesDataNode
                    );
                    taxonomyDomainCompetencies.pushObject(competencyDataNode);
                  }
                }
              });
            }
            component.set(
              'taxonomyDomainCompetencies',
              taxonomyDomainCompetencies
            );
            component.set('isLoading', false);
            component.set('isDomainViewEnabled', true);
          });
      });
  }
});
