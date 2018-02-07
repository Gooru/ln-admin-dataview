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
  HeaderData: Ember.computed('groupData.@each', function() {
    return this.get('groupData.extracted');
  }),


  // /**
  //  * Grouping header  by key value to show
  //  */
  selectedHeadersData: Ember.computed('HeaderData', function() {
    let iterateKeyValue = this.get('HeaderData');
    let setResponse = [];
    for (var key in iterateKeyValue) {
      if (iterateKeyValue[key]) {
        let valueObject = [];
        for (var itemkey in iterateKeyValue[key]) {
          let samples = new Object();
          samples = iterateKeyValue[key];
          let value = {
            key: itemkey,
            value: samples[itemkey]
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
