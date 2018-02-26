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
  cellWidth: 35,

  /**
   * height of the cell
   * @type {Number}
   */
  cellHeight: 15,

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
    let numberOfCellsInEachRow = cellSizeInRow.length;
    const colorsBasedOnStatus = component.get('colorsBasedOnStatus');
    const cellWidth = component.get('cellWidth');
    const cellHeight = component.get('cellHeight');
    const width = (Math.round(numberOfCellsInEachRow * cellWidth));
    component.set('width', width);
    const height = component.get('height');
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
      .on('click', function(d) {
        component.sendAction('onCompetencyPullOut', d);
      })
      .merge(cards)
      .style('fill', '#EAEAEA')
      .transition()
      .duration(1000)
      .style('fill', (d) => {
        return colorsBasedOnStatus.get(d.status.toString());
      });
    cards.enter().append('circle')
      .attr('cx', (d) => (((d.xAxisSeq - 1) * cellWidth) + (cellWidth / 2)))
      .attr('cy', (d) => (((d.yAxisSeq - 1) * cellHeight + (d.mastered ? (cellHeight/ 2) : 2))))
      .attr('class', (d) => d.skyline ? 'competency-skyline' : '')
      .attr('r', (d) => d.skyline ? 2 : 0)
      .attr('fill', '#fff');

    let skylineElements = component.$('.competency-skyline');
    let indexSize = component.$(skylineElements).length;
    component.$('circle').remove();
    skylineElements.each(function(index) {
      let x1 = parseInt(component.$(skylineElements[index]).attr('cx'));
      let y1 = component.$(skylineElements[index]).attr('cy');
      if (index < (indexSize - 1)) {
        let x2 = parseInt(component.$(skylineElements[(index + 1)]).attr('cx'));
        let y2 = component.$(skylineElements[(index + 1)]).attr('cy');
        svg.append('line').attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2',y2).attr('class', 'skyline');
      }
      svg.append('circle').attr('cx', x1).attr('cy', y1).attr('r', 2).attr('fill', '#fff');
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
    const cellHeight = component.get('cellHeight');
    let taxonomyDomain = Ember.A();
    let domains = competencyMatrixCoordinates.get('domains');
    let currentXaxis = 1;
    let resultSet = Ember.A();
    let numberOfCellsInEachColumn = Ember.A();
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
        let masteredCompetencies = mergeDomainData.filterBy('status', 5);
        if (masteredCompetencies && masteredCompetencies.length === 0) {
          mergeDomainData.objectAt(0).set('skyline', true);
        } else {
          let numberOfMasteredCompetency = (masteredCompetencies.length - 1);
          mergeDomainData.objectAt(numberOfMasteredCompetency).set('skyline', true);
          mergeDomainData.objectAt(numberOfMasteredCompetency).set('mastered', true);
        }

        let cellIndex = 1;
        numberOfCellsInEachColumn.push(mergeDomainData.length);
        mergeDomainData.forEach(data => {
          data.set('xAxisSeq', currentXaxis);
          data.set('yAxisSeq', cellIndex);
          resultSet.pushObject(data);
          cellIndex++;
        });
        currentXaxis = currentXaxis + 1;
      }
    });
    let height = cellHeight * (Math.max(...numberOfCellsInEachColumn));
    component.set('height', height);
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
