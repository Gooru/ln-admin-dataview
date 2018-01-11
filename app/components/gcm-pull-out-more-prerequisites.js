import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gcm-pull-out-more-prerequisites'],

  /**
   * content data count list
   * @type {Array}
   */
  prerequisites: null,

  /**
   * Grouped the content data count object by default size.
   * @return {Array}
   */
  prerequisitesData: Ember.computed('prerequisites', function() {
    let groupData = null;
    groupData = Ember.A();
    groupData.push([{
      name: 'Google',
      content: 'here the conten availble the  record of iot projects details  here allowance the market details'
    },
    {
      name: 'Google',
      content: 'here the conten availble the  record of iot projects details  here allowance the market details'
    },
    {
      name: 'Disney',
      content: 'here the conten availble the  record of iot projects details  here allowance the market details'
    },
    {
      name: 'Yahooo server',
      content: 'here the conten availble the  record of iot projects details  here allowance the market details'
    }
    ]);
    return groupData[0];
  })

});
