import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('learner/content-accordion-list', 'Integration | Component | learner/content accordion list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{learner/content-accordion-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#learner/content-accordion-list}}
      template block text
    {{/learner/content-accordion-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
