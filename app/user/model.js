import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('number') userId;
  @attr('string') name;
  @attr('string') surname;
  @attr('string') nickname;
  @attr('string') email;
  @attr('string') password;
  @attr('number') phoneNumber;
  @hasMany('bid') bids;
}
