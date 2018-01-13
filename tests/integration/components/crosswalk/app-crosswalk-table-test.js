import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('crosswalk/app-crosswalk-table', 'Integration | Component | crosswalk/app crosswalk table', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{crosswalk/app-crosswalk-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#crosswalk/app-crosswalk-table}}
      template block text
    {{/crosswalk/app-crosswalk-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
