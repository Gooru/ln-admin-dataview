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
  // Events

  didInsertElement: function() {
    let component = this;
    let subjectCategory = component.get('defaultSubjectCategory');
    component.get('taxonomyService').getSubjects(subjectCategory).then(subjects => {
      let subject = subjects.objectAt(0);
      component.set('subjects', subjects);
      this.loadDataBySubject(subject.get('id'));
      component.handleSubjectNavigationArrow();
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} width
   */
  width: 700,

  /**
   * @property {Number} height
   */
  height: 600,

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
   * Number default rows for each courses
   * @type {Number}
   */
  defaultNumberOfYaixsRow: 2,

  /**
   * Number of cells in each row
   * @type {Number}
   */
  numberOfCellsInEachRow: 30,

  /**
   * Width of the cell
   * @type {Number}
   */
  cellWidth: 25,

  /**
   * It will have selected taxonomy subject courses
   * @type {Object}
   */
  taxonomyCourses: Ember.A(),

  /**
   * It will have  taxonomy subjects
   * @type {Object}
   */
  taxonomySubjects: Ember.A(),

  /**
   * It  will have default subject category
   * @type {String}
   */
  defaultSubjectCategory: 'k_12',

  // -------------------------------------------------------------------------
  // Events


  actions: {

    /**
     *
     * Triggered when an tab right side arrow clicked
     */
    onRightArrowClick: function() {
      let component = this;
      component.$('.subject-left-navigation-arrow').fadeIn('slow');
      let width = component.$('.subject-list').outerWidth();
      component.$('.subject-list ul').animate({
        left: `-=${  width  }px`
      }, 'slow', function() {
        let scrolledWidth = width + Math.abs(component.$('.subject-list ul').position().left);
        let totalWidth = component.$('.subject-list ul').outerWidth();
        if (scrolledWidth >= totalWidth) {
          component.$('.subject-right-navigation-arrow').fadeOut('slow');
        }
      });
    },

    /**
     *
     * Triggered when an tab left side arrow clicked
     */
    onLeftArrowClick: function() {
      let component = this;
      let left = component.$('.subject-list ul').position().left;
      $('.subject-list ul').animate({
        left: `-=${  left  }px`
      }, 'slow', function() {
        let left = component.$('.subject-list ul').position().left;
        if (left === 0) {
          component.$('.subject-right-navigation-arrow').fadeIn('slow');
          component.$('.subject-left-navigation-arrow').fadeOut('slow');
        }
      });
    },

    /**
     * Event will trigger when subject get selected
     * @param  {Object} subject
     */
    onChooseSubject: function(subject) {
      let component = this;
      component.loadDataBySubject(subject.get('id'));
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  drawChart: function(data) {
    let component = this;
    const colorsBasedOnStatus = component.get('colorsBasedOnStatus');
    const cellWidth = component.get('cellWidth');
    const width = component.get('width');
    const height = component.get('height');
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
      .merge(cards)
      .style('fill', '#EAEAEA')
      .transition()
      .duration(1000)
      .style('fill', (d) => {
        return colorsBasedOnStatus.get(d.status.toString());
      });
    cards.exit().remove();
  },


  handleSubjectNavigationArrow: function() {
    let component = this;
    let subjectListElement = component.$('.subject-list');
    let listWidth = component.$('.subject-list ul').outerWidth();
    if ((subjectListElement.outerWidth()) < listWidth) {
      component.$('.subject-right-navigation-arrow').show();
    } else {
      component.$('.subject-right-navigation-arrow').hide();
    }
  },


  loadDataBySubject: function(subjectId) {
    let component = this;
    return Ember.RSVP.hash({
      competencyMatrixs: component.get('competencyService').getCompetencyMatrix('user-id', subjectId),
      competencyMatrixCoordinates: component.get('competencyService').getCompetencyMatrixCoordinates(subjectId)
    }).then(({
      competencyMatrixs,
      competencyMatrixCoordinates
    }) => {
      let resultSet = component.parseCompetencyData(competencyMatrixs, competencyMatrixCoordinates);
      component.drawChart(resultSet);
    });
  },

  parseCompetencyData: function(competencyMatrixs, competencyMatrixCoordinates) {
    let component = this;
    const numberOfCellsInEachRow = component.get('numberOfCellsInEachRow');
    let defaultNumberOfYaixsRow = component.get('defaultNumberOfYaixsRow');
    let courses = competencyMatrixCoordinates.get('courses').toArray().reverse();
    component.set('taxonomyCourses', courses);
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
            mergeDomainData.pushObject(data);
          });
        });

        let splitData = Ember.A();
        for (let startIndex = 0, endIndex = mergeDomainData.length; startIndex < endIndex; startIndex += numberOfCellsInEachRow) {
          splitData.pushObject(mergeDomainData.slice(startIndex, startIndex + numberOfCellsInEachRow));
        }
        let numberOfRows = splitData.length < defaultNumberOfYaixsRow ? defaultNumberOfYaixsRow : splitData.length;
        for (let rowIndex = numberOfRows; rowIndex >= (numberOfRows - 1); rowIndex--) {
          let dataSet = splitData.objectAt((rowIndex - 1));
          for (let index = numberOfCellsInEachRow; index >= 1; index--) {
            if (dataSet) {
              let currentIndex = (index - 1);
              let data = dataSet[currentIndex];
              if (data) {
                data.set('xAxisSeq', index);
                data.set('yAxisSeq', currentYaxis);
                resultSet.pushObject(data);
              } else {
                let dummyData = Ember.Object.create({
                  'courseCode': courseCode,
                  'courseName': courseName,
                  'courseSeq': courseSeq,
                  'yAxisSeq': currentYaxis,
                  'xAxisSeq': index,
                  'status': -1
                });
                resultSet.pushObject(dummyData);
              }
            } else {
              let dummyData = Ember.Object.create({
                'courseCode': courseCode,
                'courseName': courseName,
                'courseSeq': courseSeq,
                'yAxisSeq': currentYaxis,
                'xAxisSeq': index,
                'status': -1
              });
              resultSet.pushObject(dummyData);
            }
          }
          currentYaxis = currentYaxis + 1;
        }

      } else {
        for (let defaultNumberOfYaixsRowIndex = 1; defaultNumberOfYaixsRowIndex <= defaultNumberOfYaixsRow; defaultNumberOfYaixsRowIndex++) {
          for (let index = 1; index <= numberOfCellsInEachRow; index++) {
            let dummyData = Ember.Object.create({
              'courseCode': courseCode,
              'courseName': courseName,
              'courseSeq': courseSeq,
              'yAxisSeq': currentYaxis,
              'xAxisSeq': index,
              'status': -1
            });
            resultSet.pushObject(dummyData);
          }
          currentYaxis = currentYaxis + 1;
        }
      }
    });
    return resultSet;
  }

});
