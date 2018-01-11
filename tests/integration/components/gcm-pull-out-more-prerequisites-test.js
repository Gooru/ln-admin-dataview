import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gcm-pull-out-more-prerequisites', 'Integration | Component | gcm pull out more prerequisites', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gcm-pull-out-more-prerequisites}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gcm-pull-out-more-prerequisites}}
      template block text
    {{/gcm-pull-out-more-prerequisites}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
