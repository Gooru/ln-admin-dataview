import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('learners/accordion-summary-items', 'Integration | Component | learners/accordion summary items', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{learners/accordion-summary-items}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#learners/accordion-summary-items}}
      template block text
    {{/learners/accordion-summary-items}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
