import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class OffersRoute extends Route {
  @service store;
  @service session;

  model() {
    return this.store.findAll('offer');
  }
}
