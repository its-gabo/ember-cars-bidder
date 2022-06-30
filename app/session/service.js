import Service from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
  @service store;
  @storageFor('logged-user') loggedUser;

  currentUser() {
    return this.store.query('user', {
      filter: { id: this.loggedUser.get('id') },
    }).firstObject;
  }

  get isUserLoggedIn() {
    return !!this.loggedUser.get('id');
  }

  async loginUser(nickname, password) {
    const users = await this.store.query('user', {
      filter: { nickname: nickname, password: password },
    });

    if (!users.length) {
      return;
    }

    const user = await users.firstObject;

    this.loggedUser.set('id', user.id);
    window.location.href = '/offers';
  }
}
