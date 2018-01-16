import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('learner/user-profile', 'Integration | Component | learner/user profile', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{learner/user-profile}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#learner/user-profile}}
      template block text
    {{/learner/user-profile}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
