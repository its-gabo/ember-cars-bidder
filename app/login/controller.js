import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class RegisterController extends Controller {
  @service store;
  @service router;
  @service session;
  @tracked nickname;
  @tracked password;

  @action
  onNicknameChange({ target: { value } }) {
    this.nickname = value;
  }

  @action
  onPasswordChange({ target: { value } }) {
    this.password = value;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();

    if (!isEmpty(this.nickname) && !isEmpty(this.password)) {
      this.session.loginUser(this.nickname, this.password);
    }
  }
}
