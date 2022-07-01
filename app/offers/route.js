import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class OffersRoute extends Route {
  @service store;
  @service session;

  get doOffersExist() {
    return !!this.model.length;
  }

  beforeModel() {
    const { isUserLoggedIn } = this.session;

    return isUserLoggedIn;
  }

  model() {
    return this.store.findAll('offer');
  }
}
