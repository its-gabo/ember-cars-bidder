import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class RegisterController extends Controller {
  @service store;
  @service session;
  @tracked brand;
  @tracked carModel;
  @tracked yearOfProduction;
  @tracked engine;
  @tracked condition;
  @tracked price;
  @tracked offerType = 'buy_now';
  @tracked description;

  get doOffersExist() {
    return this.model.length > 0 ? true : false;
  }

  @action
  onBrandChange({ target: { value } }) {
    this.brand = value;
  }

  @action
  onModelChange({ target: { value } }) {
    this.carModel = value;
  }

  @action
  onYearOfProductionChange({ target: { value } }) {
    this.yearOfProduction = value;
  }

  @action
  onEngineChange({ target: { value } }) {
    this.engine = value;
  }

  @action
  onConditionChange({ target: { value } }) {
    this.condition = value;
  }

  @action
  onPriceChange({ target: { value } }) {
    this.price = value;
  }

  @action
  onOfferTypeChange({ target: { value } }) {
    this.offerType = value;
  }

  @action
  onDescriptionChange({ target: { value } }) {
    this.description = value;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();

    if (
      isEmpty(this.brand) ||
      isEmpty(this.carModel) ||
      isEmpty(this.yearOfProduction) ||
      isEmpty(this.engine) ||
      isEmpty(this.condition) ||
      isEmpty(this.price) ||
      isEmpty(this.description)
    ) {
      return;
    }

    document.querySelector('#offersForm').reset();

    await this.store
      .createRecord('offer', {
        brand: this.brand,
        model: this.carModel,
        yearOfProduction: this.yearOfProduction,
        engine: this.engine,
        condition: this.condition,
        price: this.price,
        type: this.offerType,
        description: this.description,
        owner: await this.session.currentUser(),
      })
      .save();
  }
}
