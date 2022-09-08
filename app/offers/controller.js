import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class RegisterController extends Controller {
  @service store;
  @service session;

  get doOffersExist() {
    return this.model.length > 0 ? true : false;
  }
}
