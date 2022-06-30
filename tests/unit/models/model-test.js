import { module, test } from 'qunit';
import { setupTest } from 'ember-cars-bidder/tests/helpers';

module('Unit | Models', function (hooks) {
  setupTest(hooks);

  test('user model exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('user', {});
    assert.ok(model);
  });

  test('bid model exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('bid', {});
    assert.ok(model);
  });

  test('offer model exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('offer', {});
    assert.ok(model);
  });
});
