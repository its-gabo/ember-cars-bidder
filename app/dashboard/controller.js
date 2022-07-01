import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class DashboardController extends Controller {
  @service store;

  get numberOfActiveOffers() {
    let activeOffers = [];

    this.model.forEach((element) => {
      if (element.get('isActive') == true) {
        activeOffers.push(element);
      }
    });

    return activeOffers.length;
  }

  get unactiveBuyNowOffers() {
    let unactiveOffers = [];

    this.model.forEach((element) => {
      if (
        element.get('isActive') == false &&
        element.get('type') == 'buy_now'
      ) {
        unactiveOffers.push(element);
      }
    });

    return unactiveOffers;
  }

  get highestCarPrice() {
    let highestPrice = 0;

    if (this.unactiveBuyNowOffers.length == 1) {
      return this.unactiveOffers[0].get('price');
    }

    this.unactiveBuyNowOffers.forEach((element) => {
      if (element.get('price') > highestPrice) {
        highestPrice = element.get('price');
      }
    });

    return highestPrice;
  }

  get mostExpensiveCarSold() {
    return this.model.find(
      (element) => element.get('price') == this.highestCarPrice
    );
  }

  get doUnactiveOffersExist() {
    return this.unactiveBuyNowOffers.length > 0 ? true : false;
  }

  get carBrand() {
    return this.mostExpensiveCarSold.get('brand');
  }

  get carModel() {
    return this.mostExpensiveCarSold.get('model');
  }

  get carPrice() {
    return this.mostExpensiveCarSold.get('price');
  }
}
