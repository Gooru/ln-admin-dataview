import Ember from 'ember';
import { DEFAULT_IMAGES } from 'admin-dataview/config/config';

export default Ember.Component.extend({
  classNames: ['cards', 'signature-collection-card'],

  session: Ember.inject.service('session'),

  profileUrl: Ember.computed('collection', function() {
    let component = this;
    let collection = component.get('collection');
    const userBasePath = component.get('session.cdnUrls.user');
    const ownerThumbnailUrl = collection.profileImage
      ? userBasePath + collection.profileImage
      : DEFAULT_IMAGES.USER_PROFILE;
    return ownerThumbnailUrl;
  })
});
