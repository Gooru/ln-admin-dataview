
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

  classNames: ['competency-matrix-domain-chart'],

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    let component = this;
    let subjectCategory = component.get('selectedSubjectCategory');
    component.fetchSubjectsByCategory(subjectCategory);
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
   * Number default rows for each courses
   * @type {Number}
   */
  defaultNumberOfYaixsRow: 1,

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
    },

    /**
     * Event will trigger when subject category selected
     * @param  {Object} subject
     */
    onChooseCategory: function(category) {
      this.fetchSubjectsByCategory(category.value);
    }

  },

  // -------------------------------------------------------------------------
  // Methods

  drawChart: function(data) {
    let component = this;
    let cellSizeInRow = component.get('taxonomyDomains');
    // console.log(cellSizeInRow.length, data);
    let numberOfCellsInEachRow = cellSizeInRow.length;
    const colorsBasedOnStatus = component.get('colorsBasedOnStatus');
    const cellWidth = 40;
    const cellHeight = 20;
    const width = component.get('width');
    const height = (Math.round(data.length / numberOfCellsInEachRow) * cellWidth);
    // console.log('widht::::::', width, 'height::', height);
    component.$('#competency-matrix-domain-chart').empty();
    const svg = d3.select('#competency-matrix-domain-chart').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');
    const cards = svg.selectAll('.competency')
      .data(data);
    cards.enter().append('rect')
      .attr('x', (d) => (d.xAxisSeq - 1) * cellWidth)
      .attr('y', (d) => (d.yAxisSeq - 1) * cellHeight)
      .attr('class', 'competency')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
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
      //component.$('.subject-right-navigation-arrow').show();
    } else {
      component.$('.subject-right-navigation-arrow').hide();
    }
  },


  loadDataBySubject: function(subjectId) {
    let component = this;
    let userId = component.get('userId');
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      competencyMatrixs: component.get('competencyService').getCompetencyMatrixDomain(userId, subjectId),
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
    const numberOfCellsInEachRow = component.get('numberOfCellsInEachRow');
    const cellWidth = component.get('cellWidth');
    let defaultNumberOfYaixsRow = component.get('defaultNumberOfYaixsRow');
    let taxonomyDomain = Ember.A();
    let domains = competencyMatrixCoordinates.get('domains');
    let currentYaxis = 1;
    let resultSet = Ember.A();
    domains.forEach(domainData => {
      let domainCode = domainData.get('domainCode');
      let domainName = domainData.get('domainName');
      let domainSeq = domainData.get('domainSeq');
      let competencyMatrix = competencyMatrixs.findBy('domainCode', domainCode);
      let competencyMatrixByCompetency = competencyMatrix ? competencyMatrix.get('competencies') : [];
      if (competencyMatrix && competencyMatrixByCompetency.length > 0) {
        taxonomyDomain.pushObject(domainData);
        let mergeDomainData = Ember.A();
        competencyMatrixByCompetency.forEach(competency => {
          let competencyCode = competency.get('competencyCode');
          let competencyName = competency.get('competencyName');
          let competencySeq = competency.get('competencySeq');
          let status = competency.get('status');
          let competencyData = competencyCode.split('-');
          if (competencyData.length === 4) {
            let data = Ember.Object.create({
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
          }
        });
        // console.log('Merge domain::', mergeDomainData);
        let splitData = Ember.A();
        for (let startIndex = 0, endIndex = mergeDomainData.length; startIndex < endIndex; startIndex += numberOfCellsInEachRow) {
          splitData.pushObject(mergeDomainData.slice(startIndex, startIndex + numberOfCellsInEachRow));
        }
        // console.log(splitData);
        let numberOfRows = splitData.length > defaultNumberOfYaixsRow ? splitData.length : defaultNumberOfYaixsRow;

        // adjust course title cell height dynamically
        let heightOfCourseTitleContainer = numberOfRows * cellWidth;
        // console.log(heightOfCourseTitleContainer, numberOfRows);
        domainData.set('heightOfCourseTitleContainer', heightOfCourseTitleContainer);
        for (let rowIndex = (numberOfRows - 1); rowIndex >= 0; rowIndex--) {
          let dataSet = splitData.objectAt(rowIndex);
          for (let index = numberOfCellsInEachRow; index >= 1; index--) {
            if (dataSet) {
              // console.log('index',index);
              let currentIndex = (index - 1);
              let data = dataSet[currentIndex];
              // console.log('data:::', data)
              if (data) {
                // console.log('currentYaxis', currentYaxis);
                data.set('xAxisSeq', currentYaxis);
                data.set('yAxisSeq', index);
                resultSet.pushObject(data);
              } else {
                let dummyData = Ember.Object.create({
                  'domainCode': domainCode,
                  'domainName': domainName,
                  'domainSeq': domainSeq,
                  'yAxisSeq': index,
                  'xAxisSeq': currentYaxis,
                  'status': -1
                });
                resultSet.pushObject(dummyData);
              }

            } else {
              let dummyData = Ember.Object.create({
                'domainCode': domainCode,
                'domainName': domainName,
                'domainSeq': domainSeq,
                'yAxisSeq': index,
                'xAxisSeq': currentYaxis,
                'status': -1
              });
              resultSet.pushObject(dummyData);'';
            }
          }
          currentYaxis = currentYaxis + 1;
        }

      }
    });
    component.set('taxonomyDomains', taxonomyDomain);
    return resultSet;
  },

  fetchSubjectsByCategory: function(subjectCategory) {
    let component = this;
    component.set('isLoading', true);
    component.get('taxonomyService').getSubjects(subjectCategory).then(subjects => {
      let subject = subjects.objectAt(0);
      component.set('taxonomySubjects', subjects.slice(0, 4));
      component.loadDataBySubject(subject.get('id'));
      component.handleSubjectNavigationArrow();
    });
  }

});
