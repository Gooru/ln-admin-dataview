import Ember from 'ember';
import { truncateString } from 'admin-dataview/utils/utils';

export default Ember.Component.extend({
  classNames: ['pull-out', 'course-pull-out-more-content'],

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

  isShowMore: true,

  // /**
  //  * Grouping header  by key value to show
  //  */
  selectedHeadersData() {
    let component = this;
    let iterateKeyValue = this.get('groupData');
    let setResponse = [];
    let color = '';
    const extracted = ['title', 'description'];
    const curated = [
      'Publisher',
      'Publish Status',
      'Aggregator',
      'Host',
      'License',
      'Keywords',
      'Visibility'
    ];
    const tagged = [
      'Audience',
      'Grade Level',
      'subject',
      'Course',
      'domain',
      'Standards',
      'Depth of Knowledge',
      '21st Century Skills'
    ];
    const computed = [
      'Created On',
      'Modified On',
      'Modified By',
      'relevance',
      'engagment',
      'efficacy'
    ];

    let headersEnabled = Ember.A();
    headersEnabled = this.get('groupHeader');
    if (iterateKeyValue.creation) {
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
            value: valueObject,
            length: valueObject.length
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
    onheaderClick(header) {
      let datas = Ember.A();
      datas = this.get('groupHeader');
      datas.forEach(data => {
        if (data.header === header.header) {
          data.set('isEnabled', !header.isEnabled);
        }
      });
      this.selectedHeadersData();
    },

    onShowMore(description) {
      let component = this;
      let isShowMore = component.get('isShowMore');
      let descriptionToShow = isShowMore
        ? description
        : truncateString(description);
      component.$('.description .text').html(descriptionToShow);
      component.toggleProperty('isShowMore');
    }
  }
});
