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

  classNames: ['competency-matrix-domain-chart'],

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
   * Different color range based on status
   * @type {Object}
   */
  colorsBasedOnStatus: Ember.Object.create({
    '0': '#e7e8e9',
    '1': '#1aa9eb',
    '2': '#006eb5',
    '3': '#006eb5',
    '4': '#006eb5',
    '5': '#006eb5'
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

  /**
   * It  will have chart value width scroll width handling
   * @type {String}
   */
  istaxonomyDomains: Ember.computed('taxonomyDomains', function() {
    let component = this;
    let length = component.get('taxonomyDomains').length;
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

  /**
   * Trigger whenever skyline toggle state got changed.
   */
  onChangeSkylineToggle: Ember.observer('isSkylineEnabled', function() {
    let component = this;
    let isSkylineEnabled = component.get('isSkylineEnabled');
    let skylineElements = component.$('.skyline');
    if (isSkylineEnabled) {
      skylineElements.each(function(index, element) {
        component.$(element).attr('class', 'skyline');
      });
    } else {
      skylineElements.each(function(index, element) {
        component.$(element).attr('class', 'skyline disable-skyline');
      });
    }
  }),

  /**
   * Trigger whenever reset chart view mode toggle state got changed.
   */
  onChangeResetToggle: Ember.observer('isExpandChartEnabled', function() {
    let component = this;
    let isExpandChartEnabled = component.get('isExpandChartEnabled');
    if (isExpandChartEnabled) {
      component.expandChartColumnHeight();
    } else {
      component.reduceChartColumnHeight();
    }
  }),

  /**
   * It maintains the number of cells in each column
   * @type {Number}
   */
  numberOfCellsInEachColumn: 0,

  /**
   * It decide  the max number of cells in each column
   * @type {Number}
   */
  maxNumberOfCellsInEachColumn: 25,

  /**
   * This should be the height of cells when maximum number of cell size
   * got exceeds for each column.
   * @type {Number}
   */
  reducedHeightOfCells: 5,

  /**
   * Default height of the chart
   * @type {Number}
   */
  defaultHeightOfChart: 500,

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let component = this;
    if (component.get('subjectId')) {
      component.loadDataBySubject(component.get('subjectId'));
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  drawChart(data) {
    let component = this;
    let cellSizeInRow = component.get('taxonomyDomains');
    let numberOfCellsInEachColumn = cellSizeInRow.length;
    component.set('numberOfCellsInEachColumn', numberOfCellsInEachColumn);
    const colorsBasedOnStatus = component.get('colorsBasedOnStatus');
    const cellWidth = component.get('cellWidth');
    const cellHeight = component.get('cellHeight');
    const width = Math.round(numberOfCellsInEachColumn * cellWidth);
    component.set('width', width);
    const height = component.get('defaultHeightOfChart');
    component.$('#competency-matrix-domain-chart').empty();
    component.$('#competency-matrix-domain-chart').height(height);
    const svg = d3
      .select('#competency-matrix-domain-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');
    const cards = svg.selectAll('.competency').data(data);
    cards
      .enter()
      .append('rect')
      .attr('x', d => (d.xAxisSeq - 1) * cellWidth)
      .attr('y', d => (d.yAxisSeq - 1) * cellHeight)
      .attr('class', d => {
        return `competency competency-${d.xAxisSeq} competency-${d.xAxisSeq}-${
          d.yAxisSeq
        }`;
      })
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .on('click', function(d) {
        let competencyNode = component.$(
          `.competency-${d.xAxisSeq}-${d.yAxisSeq}`
        );
        let className = competencyNode.attr('class');
        if (className.indexOf('competency-more-cells') < 0) {
          component.blockChartContainer(d);
          component.sendAction('onCompetencyPullOut', d);
        }
      })
      .merge(cards)
      .style('fill', '#EAEAEA')
      .transition()
      .duration(1000)
      .style('fill', d => {
        return colorsBasedOnStatus.get(d.status.toString());
      });
    cards
      .enter()
      .append('circle')
      .attr('cx', d => (d.xAxisSeq - 1) * cellWidth + cellWidth / 2)
      .attr(
        'cy',
        d => (d.yAxisSeq - 1) * cellHeight + (d.mastered ? cellHeight / 2 : 2)
      )
      .attr('class', d => (d.skyline ? 'competency-skyline' : ''))
      .attr('r', d => (d.skyline ? 2 : 0))
      .attr('fill', '#fff');

    let skylineElements = component.$('.competency-skyline');
    let indexSize = component.$(skylineElements).length;
    component.$('circle').remove();
    skylineElements.each(function(index) {
      let x1 = parseInt(component.$(skylineElements[index]).attr('cx'));
      let y1 = component.$(skylineElements[index]).attr('cy');
      if (index < indexSize - 1) {
        let x2 = parseInt(component.$(skylineElements[index + 1]).attr('cx'));
        let y2 = component.$(skylineElements[index + 1]).attr('cy');
        svg
          .append('line')
          .attr('x1', x1)
          .attr('y1', y1)
          .attr('x2', x2)
          .attr('y2', y2)
          .attr('class', 'skyline disable-skyline');
      }
      svg
        .append('circle')
        .attr('cx', x1)
        .attr('cy', y1)
        .attr('r', 3)
        .attr('fill', '#fff')
        .attr('class', 'skyline disable-skyline');
    });
    cards.exit().remove();
    component.reduceChartColumnHeight();
  },

  loadDataBySubject(subjectId) {
    let component = this;
    let userId = component.get('userId');
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      competencyMatrixs: component
        .get('competencyService')
        .getCompetencyMatrixDomain(userId, subjectId),
      competencyMatrixCoordinates: component
        .get('competencyService')
        .getCompetencyMatrixCoordinates(subjectId)
    }).then(({ competencyMatrixs, competencyMatrixCoordinates }) => {
      component.set('isLoading', false);
      let resultSet = component.parseCompetencyData(
        competencyMatrixs,
        competencyMatrixCoordinates
      );
      component.drawChart(resultSet);
    });
  },

  parseCompetencyData(competencyMatrixs, competencyMatrixCoordinates) {
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
      let competencyMatrixByCompetency = competencyMatrix
        ? competencyMatrix.get('competencies')
        : [];
      if (competencyMatrix && competencyMatrixByCompetency.length > 0) {
        taxonomyDomain.pushObject(domainData);
        let mergeDomainData = Ember.A();
        competencyMatrixByCompetency.forEach(competency => {
          let competencyCode = competency.get('competencyCode');
          let competencyName = competency.get('competencyName');
          let competencySeq = competency.get('competencySeq');
          let status = competency.get('status');
          let data = Ember.Object.create({
            domainName: domainName,
            domainCode: domainCode,
            domainSeq: domainSeq,
            competencyCode: competencyCode,
            competencyName: competencyName,
            competencySeq: competencySeq,
            status: status
          });
          if (status === 2 || status === 3 || status === 4 || status === 5) {
            mergeDomainData.forEach(data => {
              data.set('status', status);
              data.set('isMastery', true);
            });
            data.set('isMastery', true);
          }
          mergeDomainData.pushObject(data);
        });
        let masteredCompetencies = mergeDomainData.filterBy('isMastery', true);
        if (masteredCompetencies && masteredCompetencies.length === 0) {
          mergeDomainData.objectAt(0).set('skyline', true);
        } else {
          let numberOfMasteredCompetency = masteredCompetencies.length - 1;
          mergeDomainData
            .objectAt(numberOfMasteredCompetency)
            .set('skyline', true);
          mergeDomainData
            .objectAt(numberOfMasteredCompetency)
            .set('mastered', true);
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
    let height = cellHeight * Math.max(...numberOfCellsInEachColumn);
    component.set('height', height);
    component.set('taxonomyDomains', taxonomyDomain);
    return resultSet;
  },

  blockChartContainer(selectedCompetency) {
    let component = this;
    const cellWidth = component.get('cellWidth');
    const cellHeight = component.get('cellHeight');
    const width = component.get('width');
    let xAxisSeq = (selectedCompetency.xAxisSeq - 1) * cellWidth;
    let yAxisSeq = (selectedCompetency.yAxisSeq - 1) * cellHeight;
    const colorsBasedOnStatus = component.get('colorsBasedOnStatus');
    let color = colorsBasedOnStatus.get(selectedCompetency.status.toString());
    component.$('.block-container').remove();
    let container = `<div class="block-container" style="width:${width}px">`;
    container += `<div class="selected-competency"  style="width:${cellWidth}px; height:${cellHeight}px; background-color:${color};top:${yAxisSeq}px; left:${xAxisSeq}px"></div>`;
    container += '</div>';
    component.$('#competency-matrix-domain-chart').prepend(container);
  },

  reduceChartColumnHeight() {
    let component = this;
    let numberOfCellsInEachColumn = component.get('numberOfCellsInEachColumn');
    let maxNumberOfCellsInEachColumn = component.get(
      'maxNumberOfCellsInEachColumn'
    );
    for (let index = 1; index <= numberOfCellsInEachColumn; index++) {
      let numberOfCellsInColumn = component.$(`.competency-${index}`).length;
      if (numberOfCellsInColumn > maxNumberOfCellsInEachColumn) {
        let startIndex = maxNumberOfCellsInEachColumn + 1;
        let startElement = component.$(
          `.competency-${index}:eq(${startIndex})`
        );
        let newYAxis = +startElement.attr('y');
        for (
          let cellIndex = startIndex;
          cellIndex < numberOfCellsInColumn;
          cellIndex++
        ) {
          let element = component.$(`.competency-${index}:eq(${cellIndex})`);
          let reducedHeightOfCells = component.get('reducedHeightOfCells');
          let yAxis = element.attr('y');
          let nodeClassName = element.attr('class');
          element.attr('height', reducedHeightOfCells);
          element.attr('copy-yaxis', yAxis);
          element.attr('copy-class-name', nodeClassName);
          element.attr('class', `${nodeClassName} competency-more-cells`);
          if (cellIndex !== startIndex) {
            newYAxis = newYAxis + reducedHeightOfCells;
            element.attr('y', newYAxis);
          }
        }
      }
    }
    let height = component.get('defaultHeightOfChart');
    component.$('#competency-matrix-domain-chart').height(height);
    component.$('#competency-matrix-domain-chart svg').attr('height', height);
  },

  expandChartColumnHeight() {
    let component = this;
    let elements = component.$('.competency-more-cells');
    for (let index = 0; index < elements.length; index++) {
      let element = $(elements[index]);
      let cellHeight = component.get('cellHeight');
      let yAxis = element.attr('copy-yaxis');
      let className = element.attr('copy-class-name');
      element.attr('height', cellHeight);
      element.attr('class', className);
      element.attr('y', yAxis);
    }
    let height = component.get('height');
    component.$('#competency-matrix-domain-chart').height(height);
    component.$('#competency-matrix-domain-chart svg').attr('height', height);
  }
});
