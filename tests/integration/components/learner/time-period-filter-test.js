import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('learner/time-period-filter', 'Integration | Component | learner/time period filter', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{learner/time-period-filter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#learner/time-period-filter}}
      template block text
    {{/learner/time-period-filter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
