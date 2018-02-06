import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('activities/activities-filter-accordion', 'Integration | Component | activities/activities filter accordion', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{activities/activities-filter-accordion}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#activities/activities-filter-accordion}}
      template block text
    {{/activities/activities-filter-accordion}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
