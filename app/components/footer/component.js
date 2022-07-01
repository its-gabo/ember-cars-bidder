import Component from '@glimmer/component';

export default class FooterComponent extends Component {
  get currentYear() {
    return new Date().getFullYear();
  }
}
