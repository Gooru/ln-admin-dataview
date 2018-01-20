import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('learner/course-accordion-collection', 'Integration | Component | learner/course accordion collection', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{learner/course-accordion-collection}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#learner/course-accordion-collection}}
      template block text
    {{/learner/course-accordion-collection}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
