import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
  @service store;
  @service router;
  @storageFor('logged-user') loggedUser;

  @tracked currentUser;

  async setCurrentUser() {
    const userId = this.loggedUser.get('id');
    this.currentUser = (await this.store.findRecord('user', userId)) || null;
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
