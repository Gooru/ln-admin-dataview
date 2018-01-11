import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cards/app-browser-card', 'Integration | Component | cards/app browser card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cards/app-browser-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cards/app-browser-card}}
      template block text
    {{/cards/app-browser-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
