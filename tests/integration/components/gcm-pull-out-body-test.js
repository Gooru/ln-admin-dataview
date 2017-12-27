import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gcm-pull-out-body', 'Integration | Component | gcm pull out body', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gcm-pull-out-body}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gcm-pull-out-body}}
      template block text
    {{/gcm-pull-out-body}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});