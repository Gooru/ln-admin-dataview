import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['cards', 'app-domain-browser-card'],

  defaultCategory: Ember.computed('dataLevels', function() {
    return this.get('dataLevels.subjectClassification');
  }),

  defaultCourse: Ember.computed('dataLevels', function() {
    return this.get('dataLevels.courseCode');
  }),

  defaultSubject: Ember.computed('dataLevels', function() {
    return this.get('dataLevels.subjectCode');
  }),

  // -------------------------------------------------------------------------
  // Events
  didRender() {
    let type = this.get('type');
    if (this.get('defaultCategory') && type === 'category') {
      this.toggleActiveElement(type, this.get('defaultCategory'));
    } else if (type === 'subject' && this.get('defaultSubject')) {
      this.toggleActiveElement(type, this.get('defaultSubject'));
    } else if (this.get('defaultCourse') && type === 'course') {
      this.toggleActiveElement(type, this.get('defaultCourse'));
    }
  },
  /**
   * @function checkDefaultItem
   * Method to set first item in each component selected by default
   */
  checkDefaultItem() {
    let defaultLevels = this.get('dataLevels');
    const $categoryComponent = Ember.$('.category .item');
    const $subjectComponent = Ember.$('.subject .item');
    const $courseComponent = Ember.$('.course .item');
    if (!$categoryComponent.hasClass('active')) {
      Ember.$(`.category .item.${defaultLevels.categoryCode}`).addClass(
        'active'
      );
    }
    if (!$subjectComponent.hasClass('active')) {
      Ember.$(
        `.subject .item.${defaultLevels.subjectCode.replace(/\./, '-')}`
      ).addClass('active');
    }
    if (!$courseComponent.hasClass('active')) {
      if (defaultLevels.courseCode) {
        Ember.$(
          `.course .item.${defaultLevels.courseCode.replace(/\./, '-')}`
        ).addClass('active');
      }
    }
    let domainCodes = defaultLevels.domainCode || null;
    if (domainCodes) {
      domainCodes = domainCodes.split(',');
      domainCodes.map(domainCode => {
        Ember.$(`.domain .item.${domainCode.replace(/\./, '-')} input`).prop(
          'checked',
          true
        );
      });
    }
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when the user select a data item
     */
    onSelectDataItem(type, dataItem) {
      let component = this;
      let id = dataItem.id || dataItem.value;
      component.toggleActiveElement(type, id);
      component.sendAction('onSelectDataItem', type, dataItem);
    },

    /**
     * Action triggered when the user select a domain item
     */
    onSelectDomain(domainId) {
      let component = this;
      component.sendAction('onSelectDomain', domainId);
    }
  },

  // -------------------------------------------------------------------------
  // Methods
  /**
   * @function toggleActiveElement
   * Method to toggle active element
   */
  toggleActiveElement(type, id) {
    let component = this;
    id = id.replace(/\./g, '-');
    component.$(`.${type} .item`).removeClass('active');
    component.$(`.${type} .${id}`).addClass('active');
  }
});
