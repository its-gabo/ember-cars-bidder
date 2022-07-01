import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HeaderComponent extends Component {
  @service session;

  get shouldDisplayButtons() {
    return this.session.isUserLoggedIn;
  }

  @action
  onLogout() {
    this.session.logoutUser();
  }
}
