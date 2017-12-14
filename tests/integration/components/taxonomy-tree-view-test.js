import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('taxonomy-tree-view', 'Integration | Component | taxonomy tree view', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{taxonomy-tree-view}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#taxonomy-tree-view}}
      template block text
    {{/taxonomy-tree-view}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
