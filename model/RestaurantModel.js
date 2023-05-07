import { Schema, model, models } from 'mongoose';

const RestaurantSchema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  foods: Object
},{
  collection: 'Restaurants_Foods'
});

mongoose.model('Restaurants_Foods', RestaurantSchema)

export {Restaurant, RestaurantSchema};