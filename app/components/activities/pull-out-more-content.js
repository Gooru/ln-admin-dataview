import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes


  classNames: ['activities-pull-out-more-content'],


  // -------------------------------------------------------------------------
  // Properties

  // /**
  //  * Grouping header indivituals  data to show more info
  //  */
  HeaderData: Ember.computed('groupData.[]', function() {
    return this.get('groupData');
  }),

  // /**
  //  * Grouping header  by key value to show
  //  */
  selectedHeadersData: Ember.computed('HeaderData', function() {
    let iterateKeyValue = this.get('HeaderData');
    let setResponse = [];
    let color = '';
    const extracted = ['title', 'description', 'format'];
    const curated = ['Published By', 'Published Status', 'Aggregator', 'License', 'language', 'edicational use', 'accessbility', 'grade', 'age-range', 'Editorial Range', 'signature', 'keywords', 'media Fearures', 'access hazard', 'advertisement_level', 'framebreaker'];
    const tagged = ['audience', 'depthofknowledge', '21st Century Skills', 'subject', 'course', 'domain', 'standard'];
    const computed = ['creator Name', 'created On', 'modeified On', 'modified_by', 'isBroken', 'address', 'relevance', 'engagment', 'efficacy'];
    if (iterateKeyValue.descriptive) {
      for (var key in iterateKeyValue) {
        if (iterateKeyValue[key]) {
          let valueObject = [];
          for (var itemkey in iterateKeyValue[key]) {
            let samples = new Object();
            samples = iterateKeyValue[key];
            if (extracted.indexOf(itemkey) !== -1) {
              color = '#1aa9eb';
            } else if (curated.indexOf(itemkey) !== -1) {
              color = '#3b802c';
            } else if (computed.indexOf(itemkey) !== -1) {
              color = '#303a42';
            } else if (tagged.indexOf(itemkey) !== -1) {
              color = '#ed842a';
            }

            let value = {
              key: itemkey,
              value: samples[itemkey],
              color: color
            };
            valueObject.push(value);
          }
          let response = {
            key: key,
            value: valueObject
          };
          setResponse.push(response);
        }
      }
    }
    return setResponse;
  }),


  // -------------------------------------------------------------------------
  // actions

  actions: {
    onheaderClick: function(header) {
      const datas = this.get(`groupData.${header}`);
      this.set('HeaderData', datas);
    }
  }

});
