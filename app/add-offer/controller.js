import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class AddOfferController extends Controller {
  @service store;
  @service session;
  @service router;

  car = {
    type: 'buy_now',
  };

  @action
  onBrandChange({ target: { value } }) {
    this.car.brand = value;
  }

  @action
  onModelChange({ target: { value } }) {
    this.car.model = value;
  }

  @action
  onYearOfProductionChange({ target: { value } }) {
    this.car.yearOfProduction = value;
  }

  @action
  onEngineChange({ target: { value } }) {
    this.car.engine = value;
  }

  @action
  onConditionChange({ target: { value } }) {
    this.car.condition = value;
  }

  @action
  onPriceChange({ target: { value } }) {
    this.car.price = value;
  }

  @action
  onOfferTypeChange({ target: { value } }) {
    this.car.offerType = value;
  }

  @action
  onDescriptionChange({ target: { value } }) {
    this.car.description = value;
  }

  @action
  onPhotoUrlChange({ target: { value } }) {
    this.car.photoUrl = value;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();

    if (
      isEmpty(this.car.brand) ||
      isEmpty(this.car.model) ||
      isEmpty(this.car.yearOfProduction) ||
      isEmpty(this.car.engine) ||
      isEmpty(this.car.condition) ||
      isEmpty(this.car.price) ||
      isEmpty(this.car.description) ||
      isEmpty(this.car.photoUrl)
    ) {
      return;
    }

    document.querySelector('#offersForm').reset();

    await this.store
      .createRecord('offer', {
        ...this.car,
        owner: await this.session.currentUser(),
      })
      .save();
    await this.router.transitionTo('offers');
  }
}
