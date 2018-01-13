import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('charts/courses-independent-journey', 'Integration | Component | charts/courses independent journey', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{charts/courses-independent-journey}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#charts/courses-independent-journey}}
      template block text
    {{/charts/courses-independent-journey}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
