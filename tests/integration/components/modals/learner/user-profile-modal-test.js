import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/learner/user-profile-modal', 'Integration | Component | modals/learner/user profile modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modals/learner/user-profile-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#modals/learner/user-profile-modal}}
      template block text
    {{/modals/learner/user-profile-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
