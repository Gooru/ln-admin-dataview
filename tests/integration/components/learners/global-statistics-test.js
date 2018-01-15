import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('learners/global-statistics', 'Integration | Component | learners/global statistics', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{learners/global-statistics}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#learners/global-statistics}}
      template block text
    {{/learners/global-statistics}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
