import { moduleForModel, test } from 'ember-qunit';

moduleForModel('lookup/lookup', 'Unit | Serializer | lookup/lookup', {
  // Specify the other units that are required for this test.
  needs: ['serializer:lookup/lookup']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
