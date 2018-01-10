import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('signature-assessments', 'Integration | Component | signature assessments', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{signature-assessments}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#signature-assessments}}
      template block text
    {{/signature-assessments}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
