import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OfferShowRoute extends Route {
  @service store;

  async model({ id }) {
    return await this.store.findRecord('offer', id);
  }
}
