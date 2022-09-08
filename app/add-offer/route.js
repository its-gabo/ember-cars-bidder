import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AddOfferRoute extends Route {
  @service session;
  @service router;

  beforeModel() {
    const { isUserLoggedIn } = this.session;

    if (!isUserLoggedIn) {
      this.router.transitionTo('dashboard');
      return;
    }
  }
}
