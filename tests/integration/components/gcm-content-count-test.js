import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gcm-content-count', 'Integration | Component | gcm content count', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gcm-content-count}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gcm-content-count}}
      template block text
    {{/gcm-content-count}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
