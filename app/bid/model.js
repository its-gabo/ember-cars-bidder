import Model, { attr, belongsTo } from '@ember-data/model';

export default class BidModel extends Model {
  @attr('number') bidId;
  @attr('number') value;
  @belongsTo('offer') offer;
  @belongsTo('user') user;
}
