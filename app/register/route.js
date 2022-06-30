import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RegisterRoute extends Route {
  @service store;
  @service router;
  @service session;

  beforeModel() {
    const { isUserLoggedIn } = this.session;

    if (isUserLoggedIn) {
      this.router.transitionTo('dashboard');
      return;
    }
  }

  model() {
    return this.store.createRecord('user');
  }
}
