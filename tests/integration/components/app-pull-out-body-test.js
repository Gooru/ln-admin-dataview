import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-pull-out-body', 'Integration | Component | app pull out body', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{app-pull-out-body}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#app-pull-out-body}}
      template block text
    {{/app-pull-out-body}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
