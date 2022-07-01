import Service from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
  @service store;
  @service router;
  @storageFor('logged-user') loggedUser;

  async currentUser() {
    return await this.store.findRecord('user', this.loggedUser.get('id'));
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

  logoutUser() {
    this.loggedUser.set('id', null);
    this.router.transitionTo('home');
  }
}
