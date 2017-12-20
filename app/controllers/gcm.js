import Ember from 'ember';
import Utils from 'admin-dataview/utils/taxonomy';
import {CONTENT_TYPES, TAXONOMY_LEVELS} from 'admin-dataview/config/config';

export default Ember.Controller.extend({

  //------------------------------------------------------------------------
  //Dependencies

  /**
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
  * Search service to fetch content details
  */
  searchService: Ember.inject.service('api-sdk/search'),

  //-------------------------------------------------------------------------
  //Properties


  showPullOut: false,

  taxonomyTreeViewData: null,

  subjects: null,

  /**
  * Content count of the selected node
  */
  contentCount: null,

  /**
  * Slected node data
  */
  nodeData: null,

  /**
  * is competency level node or not
  */
  isCompetencyNode: false,

  /**
  * Show loading spinner
  */
  isLoading: true,


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
    this.parseTaxonomyData(subjects, this.get('defaultTaxonomyTreeViewData'), true);
    let childNodes = this.get('taxonomyTreeViewData').get('children');
    subjects.forEach(subject => {
      let targetNode = childNodes.findBy('id', subject.get('id'));
      this.parseTaxonomyData(subject.get('courses'), targetNode, true);
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
      let taxonomyTreeViewData = this.get('taxonomyTreeViewData');
      let id = d.data.id;
      if (d.depth === 1) {
        let subjectNodes = taxonomyTreeViewData.get('children');
        let subject = subjectNodes.findBy('id', id);
        let courseNodes = subject.get('children');
        let course = courseNodes.get(0);
        let domainNodes = course.get('childData');
        if (!domainNodes) {
          this.renderCourseDomainsData(d).then(function() {
            component.updateData(d, courseNodes);
          });
        } else {
          component.updateData(d, courseNodes);
        }
      } else if (d.depth === 2) {
        let subjectNodes = taxonomyTreeViewData.get('children');
        let subject = subjectNodes.findBy('id', Utils.getSubjectId(id));
        let courseNodes = subject.get('children');
        let course = courseNodes.findBy('id', Utils.getCourseId(id));
        let domainNodes = course.get('childData');
        let domainNode = domainNodes.get(0);
        if (!domainNode.get('childData')) {
          this.renderDomainCodesData(d).then(function() {
            component.updateData(d, domainNodes);
          });
        } else {
          component.updateData(d, domainNodes);
        }
      } else if (d.depth === 3) {
        let subjectNodes = taxonomyTreeViewData.get('children');
        let subject = subjectNodes.findBy('id', Utils.getSubjectId(id));
        let courseNodes = subject.get('children');
        let course = courseNodes.findBy('id', Utils.getCourseId(id));
        let domainNodes = course.get('childData');
        let domainNode = domainNodes.findBy('id', id);
        let standardNodes = domainNode.get('childData');
        component.updateData(d, standardNodes);
      } else if (d.depth === 4) {
        let subjectNodes = taxonomyTreeViewData.get('children');
        let subject = subjectNodes.findBy('id', Utils.getSubjectId(id));
        let courseNodes = subject.get('children');
        let course = courseNodes.findBy('id', Utils.getCourseId(id));
        let domainNodes = course.get('childData');
        let domainNode = domainNodes.findBy('id', Utils.getDomainId(id));
        let standardNodes = domainNode.get('childData');
        let standardNode = standardNodes.findBy('id', id);
        let microStandardNodes = standardNode.get('childData');
        component.updateData(d, microStandardNodes);
      }
    },

    /**
    * Action triggered when clicking more info in each node
    */
    onClickNodeMoreInfo: function(node) {
      let controller = this;
      let nodeInfo = Utils.getNodeInfo(node);
      let nodeDescription = nodeInfo.title ? nodeInfo.title : null;
      let selectedNodeData = {
        type: nodeInfo.type,
        parent: nodeInfo.parent,
        name: node.data.name,
        code: node.data.id,
        description: nodeDescription
      };
      controller.set('isCompetencyNode', nodeInfo.type === TAXONOMY_LEVELS.STANDARD);
      controller.set('nodeData', selectedNodeData);
      controller.set('isLoading', true);
      controller.set('showPullOut', true);
      controller.getSearchContentCount(selectedNodeData).then(function(contentCount) {
        controller.set('contentCount', contentCount);
        controller.set('isLoading', false);
      });
    }
  },

  //-------------------------------------------------------------------------
  //Methods

  init: function() {
    this._super(...arguments);
    this.set('taxonomyTreeViewData', this.get('defaultTaxonomyTreeViewData'));
  },

  parseTaxonomyData: function(data, targetData, pushDataToChild) {
    let controller = this;
    let childData = Ember.A();
    data.forEach(item => {
      childData.pushObject(controller.createNode(item));
    });
    if (pushDataToChild) {
      targetData.set('children', childData);
    } else {
      targetData.set('childData', childData);
    }

    if (childData.length > 0) {
      targetData.set('hasChild', true);
    } else {
      targetData.set('hasChild', false);
    }
  },

  renderCourseDomainsData: function(d) {
    let id = d.data.id;
    let controller = this;
    let subjects = controller.get('subjects');
    let subject = subjects.findBy('id', id);
    let courses = subject.get('courses');
    let promises = Ember.A();
    courses.forEach(course => {
      promises.pushObject(controller.get('taxonomyService').getCourseDomains(subject, course.get('id')));
    });

    return Ember.RSVP.all(promises).then(function() {
      let subjectNodes = controller.get('taxonomyTreeViewData').get('children');
      let subjectNode = subjectNodes.findBy('id', id);
      let childNodes = subjectNode.get('children');
      courses.forEach(course => {
        let targetNode = childNodes.findBy('id', course.get('id'));
        controller.parseTaxonomyData(course.get('children'), targetNode, false);
      });
    });
  },

  renderDomainCodesData: function(d) {
    let controller = this;
    let id = d.data.id;
    let subjects = controller.get('subjects');
    let subjectId = Utils.getSubjectId(id);
    let courseId = Utils.getCourseId(id);
    let subject = subjects.findBy('id', subjectId);
    let course = subject.get('courses').findBy('id', courseId);
    let domains = course.get('children');
    let promises = Ember.A();
    domains.forEach(domain => {
      promises.pushObject(controller.get('taxonomyService').getDomainCodes(subject, courseId, domain.get('id')));
    });
    return Ember.RSVP.all(promises).then(function() {
      let courseNodes = controller.get('taxonomyTreeViewData').get('children');
      let courseNode = courseNodes.findBy('id', subjectId);
      let domainNodes = courseNode.get('children');
      let domainNode = domainNodes.findBy('id', courseId);
      let childNodes = domainNode.get('childData');
      domains.forEach(domain => {
        let domainId = domain.get('id');
        let targetNode = childNodes.findBy('id', domainId);

        controller.renderStandardCodes(domain.get('children'), targetNode);
      });
    });
  },

  renderStandardCodes: function(data, targetNode) {
    let controller = this;
    data = data.objectAt(0);
    let standards = data.get('children');
    let children = Ember.A();
    if (standards && standards.length > 0) {
      standards.forEach(standard => {
        let standardNode = controller.createNode(standard, true);
        let standardChildNodes = standard.get('children');
        if (standardChildNodes && standardChildNodes.length > 0) {
          let microStandardNodes = standardChildNodes[0];
          microStandardNodes = microStandardNodes.get('children');
          if (microStandardNodes && microStandardNodes.length > 0) {
            let standardChildNode = Ember.A();
            microStandardNodes.forEach(microStandard => {
              standardChildNode.pushObject(controller.createNode(microStandard, false));
            });
            standardNode.set('childData', standardChildNode);
            if (standardChildNode.length > 0) {
              standardNode.set('hasChild', true);
            } else {
              standardNode.set('hasChild', false);
            }
          }
        }
        children.pushObject(standardNode);
      });
      targetNode.set('childData', children);
      if (children.length > 0) {
        targetNode.set('hasChild', true);
      } else {
        targetNode.set('hasChild', false);
      }
    }
  },

  createNode: function(data, isShowDisplayCode = false) {
    let node = Ember.Object.create({
      'id': data.id,
      'code': data.code,
      'name': isShowDisplayCode ? data.code : data.title,
      'title': data.title,
      'children': null
    });
    return node;
  },

  /**
  * Get Content count of search results
  * return hashed json of each content type conunt
  */
  getSearchContentCount: function(selectedNode) {
    const contentCountData = [];
    const resourceCountPromise = Ember.RSVP.resolve(this.get('searchService').searchResources(selectedNode));
    const questionCountPromise = Ember.RSVP.resolve(this.get('searchService').searchQuestions(selectedNode));
    const courseCountPromise = Ember.RSVP.resolve(this.get('searchService').searchCourses(selectedNode));
    const collectionCountPromise = Ember.RSVP.resolve(this.get('searchService').searchCollections(selectedNode));
    const assessmentCountPromise = Ember.RSVP.resolve(this.get('searchService').searchAssessments(selectedNode));
    const rubricCountPromise = Ember.RSVP.resolve(this.get('searchService').searchRubrics(selectedNode));

    return Ember.RSVP.hash({
      resourceCount: resourceCountPromise,
      questionCount: questionCountPromise,
      courceCount: courseCountPromise,
      collectionCount: collectionCountPromise,
      assessmentCount: assessmentCountPromise,
      rubricCount: rubricCountPromise
    }).then(function(hash) {
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.COURSE, hash.courceCount));
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.ASSESSMENT, hash.assessmentCount));
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.COLLECTION, hash.collectionCount));
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.RESOURCE, hash.resourceCount));
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.QUESTION, hash.questionCount));
      contentCountData.push(Utils.getStructuredContentData(CONTENT_TYPES.RUBRIC, hash.rubricCount));
      return contentCountData;
    });
  }

});
