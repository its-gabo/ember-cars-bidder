import Model, { attr, hasMany } from '@ember-data/model';

export default class OfferModel extends Model {
  @attr('number') carId;
  @attr('string') brand;
  @attr('string') model;
  @attr('number') yearOfProduction;
  @attr('string') engine;
  @attr('string') condition;
  @attr('string') description;
  @attr('date', () => {
    new Date();
  })
  createdAt;
  @attr('date') endsAt;
  @attr('string') type;
  @hasMany('bid') bids;
}
