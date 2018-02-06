import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/activity/century-skills', 'Integration | Component | modals/activity/century skills', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modals/activity/century-skills}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#modals/activity/century-skills}}
      template block text
    {{/modals/activity/century-skills}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
