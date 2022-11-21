import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OfferShowController extends Controller {
  @service session;
  @service store;
  @service router;

  get isOfferAnAuction() {
    return this.model.offer.type === 'auction';
  }

  get isUserAnAuthor() {
    if (this.session.currentUser === null) {
      return false;
    }

    return (
      this.session.currentUser.get('id') === this.model.offer.owner.get('id')
    );
  }

  get highestBid() {
    if (this.model.bids.length === 0) {
      return 0;
    }

    if (this.model.bids.length === 1) {
      return this.model.bids._objects[0].value;
    }

    let highestBid = this.model.bids._objects[0].value;

    highestBid = this.model.bids._objects.filter((bid) => {
      return bid.value > highestBid;
    });

    return highestBid[0].value;
  }

  @action
  onBuyNow() {
    if (this.session.currentUser === null) {
      this.router.transitionTo('login');
      return;
    }

    this.model.offer.haveBeenBought = true;
    this.model.offer.isActive = false;
    this.model.offer.save();
    this.router.transitionTo('offers');
  }

  @action
  onBidValueChange({ target: { value } }) {
    this.bidValue = value;
  }

  @action
  async onAddBid() {
    if (this.session.currentUser === null) {
      this.router.transitionTo('login');
      return;
    }

    if (this.bidValue > this.highestBid) {
      await this.store
        .createRecord('bid', {
          user: this.session.currentUser,
          value: this.bidValue,
          offer: this.model.offer,
        })
        .save();

      window.location.href = `/offer/${this.model.offer.id}`;
    }
  }
}
