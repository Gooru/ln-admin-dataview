import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes


  classNames: ['activities-pull-out-more-content'],


  // -------------------------------------------------------------------------
  // Properties

  groupData: null,

  /**
   * Grouping header indivituals  data to show more info
   */
  onChange: Ember.observer('groupData', function() {
    this.selectedHeadersData();
    return this.get('groupData');
  }),

  // /**
  //  * Grouping header  by key value to show
  //  */
  selectedHeadersData: function() {
    let component = this;
    let iterateKeyValue = this.get('groupData');
    let setResponse = [];
    let color = '';
    const extracted = ['title', 'description', 'format'];
    const curated = ['Published By', 'Published Status', 'Aggregator', 'License', 'language', 'edicational use', 'accessbility', 'grade', 'age-range', 'Editorial Range', 'signature', 'keywords', 'media Fearures', 'access hazard', 'advertisement_level', 'framebreaker'];
    const tagged = ['audience', 'depthofknowledge', '21st Century Skills', 'subject', 'course', 'domain', 'standard'];
    const computed = ['creator Name', 'created On', 'modeified On', 'modified_by', 'isBroken', 'address', 'relevance', 'engagment', 'efficacy'];

    let headersEnabled = Ember.A();
    headersEnabled = this.get('groupHeader');
    if (iterateKeyValue.descriptive) {
      for (var key in iterateKeyValue) {
        if (iterateKeyValue[key]) {
          let valueObject = [];
          for (var itemkey in iterateKeyValue[key]) {
            let samples = new Object();
            let selectType;
            samples = iterateKeyValue[key];
            if (extracted.indexOf(itemkey) !== -1) {
              headersEnabled.forEach(data => {
                if (data.header === 'extracted') {
                  selectType = data.isEnabled;
                }
              });
              color = '#1aa9eb';
            } else if (curated.indexOf(itemkey) !== -1) {
              headersEnabled.forEach(data => {
                if (data.header === 'curated') {
                  selectType = data.isEnabled;
                }
              });
              color = '#3b802c';
            } else if (computed.indexOf(itemkey) !== -1) {
              headersEnabled.forEach(data => {
                if (data.header === 'computed') {
                  selectType = data.isEnabled;
                }
              });
              color = '#303a42';
            } else if (tagged.indexOf(itemkey) !== -1) {
              headersEnabled.forEach(data => {
                if (data.header === 'tagged') {
                  selectType = data.isEnabled;
                }
              });
              color = '#ed842a';
            }
            let value = {
              key: itemkey,
              value: samples[itemkey],
              color: color
            };
            if (selectType) {
              valueObject.push(value);
            }
          }
          let response = {
            key: key,
            value: valueObject
          };
          setResponse.push(response);
        }
      }
    }
    component.set('selectedDatas', setResponse);
    return setResponse;
  },


  // -------------------------------------------------------------------------
  // actions

  actions: {

    onheaderClick: function(header) {
      let datas = Ember.A();
      datas = this.get('groupHeader');
      datas.forEach(data => {
        if (data.header === header.header) {
          data.set('isEnabled', !header.isEnabled);
        }
      });
      this.selectedHeadersData();
    }
  }

  // -------------------------------------------------------------------------
  // Events


});
