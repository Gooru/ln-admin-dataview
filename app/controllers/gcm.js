import Ember from 'ember';
import Utils from 'admin-dataview/utils/taxonomy';

export default Ember.Controller.extend({

  //------------------------------------------------------------------------
  //Dependencies

  /**
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  //-------------------------------------------------------------------------
  //Properties


  showPullOut: false,

  taxonomyTreeViewData: null,

  subjects: null,

  defaultTaxonomyTreeViewData: Ember.computed(function() {
    let data = Ember.Object.create({
      'name': 'Gooru',
      'type': 'root',
      'id': 'GDT',
      'children': Ember.A()
    });
    return data;
  }),

  onChange: Ember.observer('subjects', function() {
    let subjects = this.get('subjects');
    this.parseTaxonomyData(subjects, this.get('defaultTaxonomyTreeViewData'));
    let childNodes = this.get('taxonomyTreeViewData').get('children');
    subjects.forEach(subject => {
      let targetNode = childNodes.findBy('id', subject.get('id'));
      this.parseTaxonomyData(subject.get('courses'), targetNode);
    });
  }),

  actions: {
    /**
     * Action triggered when the event open the pull out.
     */
    onPullOutOpen: function() {
      this.set('showPullOut', true);
    },

    /**
     * Action triggered when the event close the pull out .
     */
    onPullOutClose: function() {
      this.set('showPullOut', false);
    },

    onClickTaxonomyNode: function(d, component) {
      if (d.depth === 1) {
        this.renderCourseDomainsData(d, component);
      } else if (d.depth === 2) {
        this.renderDomainCodesData(d, component);
      }
    }
  },

  //-------------------------------------------------------------------------
  //Methods

  init: function() {
    this._super(...arguments);
    this.set('taxonomyTreeViewData', this.get('defaultTaxonomyTreeViewData'));
  },

  parseTaxonomyData: function(data, targetData) {
    let controller = this;
    let children = targetData.get('children');
    data.forEach(item => {
      if (item.id === 'empty-category') {
        controller.renderStandardCodes(data, item.get('children'), targetData);
      } else {
        children.pushObject(this.createNode(item));
      }
    });
  },

  renderCourseDomainsData: function(d, component) {
    let controller = this;
    let subjects = controller.get('subjects');
    let subject = subjects.findBy('id', d.data.id);
    let courses = subject.get('courses');
    let promises = Ember.A();
    courses.forEach(course => {
      promises.pushObject(controller.get('taxonomyService').getCourseDomains(subject, course.get('id')));
    });

    Ember.RSVP.all(promises).then(function() {
      let courseNodes = controller.get('taxonomyTreeViewData').get('children');
      let courseNode = courseNodes.findBy('id', d.data.id);
      let childNodes = courseNode.get('children');
      courses.forEach(course => {
        let targetNode = childNodes.findBy('id', course.get('id'));
        controller.parseTaxonomyData(course.get('children'), targetNode);
      });
      component.updateData(d);
    });
  },

  renderDomainCodesData: function(d, component) {
    let controller = this;
    let subjects = controller.get('subjects');
    let subjectId = Utils.getSubjectId(d.data.id);
    let courseId = Utils.getCourseId(d.data.id);
    let subject = subjects.findBy('id', subjectId);
    let course = subject.get('courses').findBy('id', courseId);
    let domains = course.get('children');
    let promises = Ember.A();
    domains.forEach(domain => {
      promises.pushObject(controller.get('taxonomyService').getDomainCodes(subject, courseId, domain.get('id')));
    });

    Ember.RSVP.all(promises).then(function() {
      let courseNodes = controller.get('taxonomyTreeViewData').get('children');
      let courseNode = courseNodes.findBy('id', subjectId);
      let domainNodes = courseNode.get('children');
      let domainNode = domainNodes.findBy('id', courseId);
      let childNodes = domainNode.get('children');
      domains.forEach(domain => {
        let domainId = domain.get('id');
        let targetNode = childNodes.findBy('id', domainId);
        controller.parseTaxonomyData(domain.get('children'), targetNode);
      });
      component.updateData(d);
    });
  },

  renderStandardCodes: function(data, item, targetData) {
    let controller = this;
    let standards = item;
    let children = targetData.get('children');
    if (standards && standards.length > 0) {
      standards.forEach(standard =>  {
        let standardNode = controller.createNode(standard);
        let standardChildNodes = standard.get('children');
        if (standardChildNodes && standardChildNodes.length > 0) {
          let standardChildNode = standardNode.get('children');
          standardChildNodes.forEach(microStandard =>  {
            standardChildNode.push(controller.createNode(microStandard));
          });
        }
        children.pushObject(standardNode);
      });
    }
  },

  createNode: function(data) {
    let node = Ember.Object.create({
      'id': data.id,
      'code': data.code,
      'name': data.code,
      'children': Ember.A()
    });
    return node;
  }

});
