import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('activities/activities-filter', 'Integration | Component | activities/activities filter', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{activities/activities-filter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#activities/activities-filter}}
      template block text
    {{/activities/activities-filter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
