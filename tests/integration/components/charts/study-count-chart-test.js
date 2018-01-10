import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('charts/study-count-chart', 'Integration | Component | charts/study count chart', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{charts/study-count-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#charts/study-count-chart}}
      template block text
    {{/charts/study-count-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
