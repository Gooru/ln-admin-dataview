import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['students-mastery'],

  /**
   * students masters data count list
   * @type {Array}
   */
  mastersData: null,

  /**
   * Grouped the student master data count object.
   * @return {Array}
   */
  studentMastersData: Ember.computed('mastersData', function() {
    let groupData = null;
    groupData = Ember.A();
    groupData.push([{
      name: 'Google',
      src: '//dev-user-gooru-org.s3-us-west-1.amazonaws.com/7f1cab3e-642d-460e-bb73-c6efa4a1720d.gif'
    },
    {
      name: 'Google',
      src: '//dev-user-gooru-org.s3-us-west-1.amazonaws.com/7f1cab3e-642d-460e-bb73-c6efa4a1720d.gif'
    },
    {
      name: 'Disney',
      src: '//dev-user-gooru-org.s3-us-west-1.amazonaws.com/7f1cab3e-642d-460e-bb73-c6efa4a1720d.gif'
    },
    {
      name: 'Yahooo server',
      src: '//dev-user-gooru-org.s3-us-west-1.amazonaws.com/5d955c11-1101-4e10-8bbc-a4d53aa281ac.jpg'
    }
    ]);
    return groupData[0];
  })

});
