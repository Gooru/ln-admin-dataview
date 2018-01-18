import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('learner/course-summary-accordion-items', 'Integration | Component | learner/course summary accordion items', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{learner/course-summary-accordion-items}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#learner/course-summary-accordion-items}}
      template block text
    {{/learner/course-summary-accordion-items}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
