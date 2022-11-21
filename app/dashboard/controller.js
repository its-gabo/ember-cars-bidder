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

  get boughtCars() {
    let boughtCars = [];

    this.model.forEach((element) => {
      if (element.get('haveBeenBought') == true) {
        boughtCars.push(element);
      }
    });

    return boughtCars;
  }

  get highestCarPrice() {
    let highestPrice = 0;

    if (this.boughtCars.length == 1) {
      return this.boughtCars[0].get('price');
    }

    this.boughtCars.forEach((element) => {
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

  get carImg() {
    return this.mostExpensiveCarSold.get('photoUrl');
  }

  get newestOffer() {
    let offerWithNewestDate = null;
    let distance = Infinity;

    const currentDateTime = new Date().getTime();

    this.model.forEach((offer) => {
      if (!offer.isActive) {
        return;
      }

      let dateSubtraction =
        currentDateTime - new Date(offer.createdAt).getTime();

      if (dateSubtraction < distance) {
        offerWithNewestDate = offer;
      }
    });

    return offerWithNewestDate;
  }
}
