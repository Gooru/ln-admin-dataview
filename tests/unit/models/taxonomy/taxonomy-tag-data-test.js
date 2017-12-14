import { moduleForModel, test } from 'ember-qunit';

moduleForModel('taxonomy/taxonomy-tag-data', 'Unit | Model | taxonomy/taxonomy tag data', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
