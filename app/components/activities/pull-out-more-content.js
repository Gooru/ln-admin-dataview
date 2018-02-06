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
  HeaderData: Ember.computed('groupData', function() {
    return this.get('groupData.extracted');
  }),


  // /**
  //  * alice name for the objects recieved
  //  */
  groupsAlice: Ember.computed('groupData', function() {
    return this.get('groupData');
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
          let samples = Ember.A(iterateKeyValue[key]);
          let value = {
            key: itemkey,
            value: samples.get(itemkey)
          }
          valueObject.push(value);
        }
        let response = {
          key: key,
          value: valueObject
        }
        setResponse.push(response);
      }
    }
    console.log('response');
    return setResponse;
  }),




  // -------------------------------------------------------------------------
  // actions

  actions: {
    onheaderClick: function(header) {
      console.log(this.get('HeaderData'));
      let datas = this.get('groupsAlice.'+header);
      console.log('groupdatas::', datas, this.get('selectedHeadersData'));
      this.set('HeaderData', datas);
      console.log('______________________________________________');


      // this.sendAction('onClickHeader', header);
    }


  }

});
