/**
 * Comptency matrix domain chart
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
   * User id of competency matrix to plot
   * @type {String}
   */
  userId: null,


  /**
   * Width of the cell
   * @type {Number}
   */
  cellWidth: 45,

  /**
   * height of the cell
   * @type {Number}
   */
  cellHeight: 45,

  /**
   * It will have selected taxonomy subject courses
   * @type {Object}
   */
  taxonomyCourses: Ember.A(),

  /**
   * It will have selected taxonomy subject domains
   * @type {Object}
   */
  taxonomyDomains: Ember.A(),


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
   * Trigger whenever pull out state got changed.
   */
  onChangeShowPullOut: Ember.observer('showPullOut', function() {
    let component = this;
    let showPullOut = component.get('showPullOut');
    if (!showPullOut) {
      component.$('.block-container').remove();
    }
  }),

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    let component = this;
    if (component.get('subjectId')) {
      component.loadDataBySubject(component.get('subjectId'));
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
    let width = component.get('taxonomyDomains').length * cellWidth;
    component.set('width', width);
    component.$('#course-domain-matrix-chart').empty();
    const svg = d3.select('#course-domain-matrix-chart').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');
    const cards = svg.selectAll('.course-domain-cell')
      .data(data);
    cards.enter().append('rect')
      .attr('x', (d) => (d.domainSeq - 1) * cellWidth)
      .attr('y', (d) => (d.courseSeq - 1) * cellHeight)
      .attr('class', 'course-domain-cell')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .on('click', function(d) {
        component.blockChartContainer(d);
        component.sendAction('onCompetencyPullOut', d);
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
      competencyMatrixs: component.get('competencyService').getCompetencyMatrix(userId, subjectId),
      matrixCoordinates: component.get('competencyService').getCompetencyMatrixCoordinates(subjectId)
    }).then(({
      competencyMatrixs,
      matrixCoordinates
    }) => {
      component.set('isLoading', false);
      let resultSet = component.parseCourseDomainData(competencyMatrixs, matrixCoordinates);
      component.drawChart(resultSet);
    });

  },

  parseCourseDomainData: function(competencyMatrixs, matrixCoordinates) {
    let component = this;
    let courses = matrixCoordinates.get('courses').toArray().reverse();
    component.set('taxonomyCourses', courses);
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
        let courseDomainsData = coursesData.get('domains');
        let courseDomainData = courseDomainsData.findBy('domainCode', domainCode);
        if (courseDomainData) {
          let domainSeq =  domain.get('domainSeq');
          let data = Ember.Object.create({
            'courseSeq': courseSeq,
            'courseCode': courseCode,
            'domainCode': domainCode,
            'domainSeq': domainSeq
          });
          resultSet.pushObject(data);
        }
      });
    });
    return resultSet;
  },

  blockChartContainer: function(selectedCompetency) {
    let component = this;
    const cellWidth = component.get('cellWidth');
    const cellHeight = component.get('cellHeight');
    const width = component.get('width');
    let xAxisSeq = (selectedCompetency.xAxisSeq - 1) * cellWidth;
    let yAxisSeq = (selectedCompetency.yAxisSeq - 1) * cellHeight;
    const colorsBasedOnStatus = component.get('colorsBasedOnStatus');
    let color = colorsBasedOnStatus.get(selectedCompetency.status.toString());
    component.$('.block-container').remove();
    let container = `<div class="block-container" style="width:${  width  }px">`;
    container += `<div class="selected-competency"  style="width:${  cellWidth  }px; height:${  cellHeight  }px; background-color:${  color  };top:${  yAxisSeq  }px; left:${  xAxisSeq  }px"></div>`;
    container += '</div>';
    component.$('#course-domain-matrix-chart').prepend(container);
  }

});
