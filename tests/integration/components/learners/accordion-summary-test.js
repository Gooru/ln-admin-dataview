import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('learners/accordion-summary', 'Integration | Component | learners/accordion summary', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{learners/accordion-summary}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#learners/accordion-summary}}
      template block text
    {{/learners/accordion-summary}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
