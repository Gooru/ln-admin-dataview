import Ember from 'ember';

export function splitText(params) {
  let text = params[0];
  let delimiter = params[1];
  let stringChunks = text.split(delimiter);
  return stringChunks[0];
}

export default Ember.Helper.helper(splitText);
