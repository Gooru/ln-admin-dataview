import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('activities/usage-statistics', 'Integration | Component | activities/usage statistics', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{activities/usage-statistics}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#activities/usage-statistics}}
      template block text
    {{/activities/usage-statistics}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
