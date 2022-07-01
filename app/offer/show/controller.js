import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class OfferShowController extends Controller {
  @service session;

  async isUserAnAuthor() {
    const user = await this.session.currentUser();
    return this.model.owner.get('id') === user.id ? true : false;
  }

  get isOfferAnAuction() {
    return this.model.type === 'auction' ? true : false;
  }
}
