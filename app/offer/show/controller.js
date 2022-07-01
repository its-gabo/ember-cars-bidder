import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class OfferShowController extends Controller {
  @service store;
  @service session;
  @service router;
  @tracked bid;

  async isUserAnAuthor() {
    const user = await this.session.currentUser();
    return (await this.model.owner.get('id')) === (await user.id)
      ? true
      : false;
  }

  async isBidHighest(bidPrice) {
    const bids = await this.store.query('bid', {
      filter: { offer: this.model },
    });

    if ((await bids.length) == 0) {
      return true;
    }

    const highestBid = await bids.sortBy('value').reverse();

    if ((await highestBid) > bidPrice) {
      return false;
    }

    return true;
  }

  get isOfferAnAuction() {
    return this.model.type === 'auction' ? true : false;
  }

  @action
  onBidChange({ target: { value } }) {
    this.bid = value;
  }

  @action
  async onBuyNow() {
    if (await this.isUserAnAuthor()) {
      return;
    }

    this.model.set('isActive', false);
    this.router.transitionTo('offers');
  }

  @action
  async onSubmit() {
    if (isEmpty(this.bid)) {
      return;
    }

    if (await this.isUserAnAuthor()) {
      return;
    }

    if (await this.isBidHighest(this.bid)) {
      this.store.createRecord('bid', {
        value: this.bid,
        offer: this.model,
        user: await this.session.currentUser(),
      });
    }
  }
}
