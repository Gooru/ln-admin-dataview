import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('charts/gcm-x-bar-chart', 'Integration | Component | charts/gcm x bar chart', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{charts/gcm-x-bar-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#charts/gcm-x-bar-chart}}
      template block text
    {{/charts/gcm-x-bar-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
