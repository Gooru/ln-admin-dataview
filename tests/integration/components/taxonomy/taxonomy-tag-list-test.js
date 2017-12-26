import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('taxonomy/taxonomy-tag-list', 'Integration | Component | taxonomy/taxonomy tag list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{taxonomy/taxonomy-tag-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#taxonomy/taxonomy-tag-list}}
      template block text
    {{/taxonomy/taxonomy-tag-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
