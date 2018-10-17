import Ember from 'ember';
import d3 from 'd3';
import { diffMonthBtwTwoDates } from 'admin-dataview/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['monthly-time-series-chart'],

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let component = this;
    component.$('svg.time-series').remove();
    component.drawChart();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {startDate}
   * Property to store time series start date
   */
  startDate: Ember.computed(function() {
    let date = new Date();
    let curMonth = date.getMonth();
    let curYear = date.getFullYear();
    let oneYearBeforeFromCurrentDate = date;
    oneYearBeforeFromCurrentDate = new Date(
      oneYearBeforeFromCurrentDate.setMonth(curMonth - 11)
    );
    oneYearBeforeFromCurrentDate = new Date(
      oneYearBeforeFromCurrentDate.setFullYear(curYear - 1)
    );
    return oneYearBeforeFromCurrentDate;
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function drawChart
   * Method to plot time series chart
   */
  drawChart() {
    let component = this;
    // Config SVG size
    let width = 700,
      height = 65;
    let domainEndDate = new Date();
    let domainEndYear = domainEndDate.getFullYear();
    let domainEndMonth = domainEndDate.getMonth();
    let domainStartDate = new Date(component.get('startDate'));
    let diffMonthBtwTwoDate = diffMonthBtwTwoDates(
      domainStartDate,
      domainEndDate
    );
    //if more than a year
    if (diffMonthBtwTwoDate > 12) {
      domainStartDate = new Date(domainStartDate.setMonth(domainEndMonth - 11));
      domainStartDate = new Date(
        domainStartDate.setFullYear(domainEndYear - 1)
      );
    }
    let domainStartMonth = domainStartDate.getMonth();
    let domainStartYear = domainStartDate.getFullYear();
    //add default addon months if required
    let addOnMonths =
      diffMonthBtwTwoDate <= 5 ? 5 - (diffMonthBtwTwoDate - 1) : 0;
    // Define d3 xScale
    let xScale = d3
      .scaleTime()
      .domain([
        new Date(domainStartYear, domainStartMonth - addOnMonths),
        new Date(domainEndYear, domainEndMonth)
      ])
      .range([0, width - 40]);

    // Define main d3 xAxis
    let xAxis = d3
      .axisBottom()
      .scale(xScale)
      .tickFormat(d3.timeFormat('%b \'%y'))
      .tickPadding(14);

    // Draw SVG element
    let svgContainer = d3.select(component.element).append('svg');

    // Draw axes
    svgContainer
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(20,20)')
      .call(xAxis);

    svgContainer
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'time-series');
    component.bindTicksClickable();
    component.bindNonClickableTicks();
  },

  /**
   * @function bindNonClickableTicks
   * Method to bind non clickable ticks
   */
  bindNonClickableTicks() {
    let component = this;
    let ticksContainer = d3.selectAll('.tick');
    let startDate = new Date(component.get('startDate'));
    let startMonth = startDate.getMonth();
    let startYear = startDate.getFullYear();
    ticksContainer.attr('y', function(date) {
      let tickCotainer = d3.select(this);
      let curTickMonth = date.getMonth();
      let curTickYear = date.getFullYear();
      if (curTickMonth < startMonth && curTickYear <= startYear) {
        tickCotainer.attr('class', 'tick gray-out');
      }
    });
  },

  /**
   * @function bindTicksClickable
   * Method to bind each tick clickable
   */

  bindTicksClickable() {
    let component = this;
    let ticksContainer = d3.selectAll('.tick');
    let curDate = new Date();
    let curMonth = curDate.getMonth();
    let curYear = curDate.getFullYear();
    ticksContainer
      .attr('y', function(date) {
        let tickCotainer = d3.select(this);
        let curTickMonth = date.getMonth();
        let curTickYear = date.getFullYear();
        //Default selection of current month and year
        if (curMonth === curTickMonth && curYear === curTickYear) {
          d3.select('circle.active-month').remove();
          tickCotainer
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 10)
            .attr('class', 'active-month');
        }
      })
      .on('click', function(date) {
        d3.select('circle.active-month').remove();
        d3.select(this)
          .append('circle')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', 10)
          .attr('class', 'active-month');
        component.sendAction('onSelectMonth', date);
      });
  }
});
