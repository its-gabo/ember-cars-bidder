import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class RegisterController extends Controller {
  @service store;
  @service router;

  @action
  onNameChange({ target: { value } }) {
    this.model.name = value;
  }

  @action
  onSurnameChange({ target: { value } }) {
    this.model.surname = value;
  }

  @action
  onNicknameChange({ target: { value } }) {
    this.model.nickname = value;
  }

  @action
  onEmailChange({ target: { value } }) {
    this.model.email = value;
  }

  @action
  onPasswordChange({ target: { value } }) {
    this.model.password = value;
  }

  @action
  onPhoneNumberChange({ target: { value } }) {
    this.model.phoneNumber = value;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();

    const { name, surname, nickname, email, phoneNumber } = this.model;

    if (
      isEmpty(name) ||
      isEmpty(surname) ||
      isEmpty(nickname) ||
      isEmpty(email) ||
      isEmpty(phoneNumber)
    ) {
      return;
    }

    await this.model.save();

    this.router.transitionTo('login');
  }
}
