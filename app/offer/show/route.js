import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class OfferShowRoute extends Route {
  @service store;

  model({ id }) {
    return hash({
      offer: this.store.findRecord('offer', id),
      bids: this.store.query('bid', {
        filter: { offer: { id } },
      }),
    });
  }
}
