import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class OfferModel extends Model {
  @attr('string') brand;
  @attr('string') model;
  @attr('number') yearOfProduction;
  @attr('string') engine;
  @attr('string') condition;
  @attr('string') description;
  @attr('date', { defaultValue: () => new Date() }) createdAt;
  @attr('date') endsAt;
  @attr('string') type;
  @attr('number') price;
  @attr('boolean', { defaultValue: true }) isActive;
  @attr('boolean', { defaultValue: false }) haveBeenBought;
  @attr('string') photoUrl;
  @hasMany('bid') bids;
  @belongsTo('user') owner;
}
