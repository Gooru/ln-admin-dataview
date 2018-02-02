import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('activities/pull-out-more-content', 'Integration | Component | activities/pull out more content', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{activities/pull-out-more-content}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#activities/pull-out-more-content}}
      template block text
    {{/activities/pull-out-more-content}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
