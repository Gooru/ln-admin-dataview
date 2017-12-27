import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-pie-chart', 'Integration | Component | app pie chart', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{app-pie-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#app-pie-chart}}
      template block text
    {{/app-pie-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
