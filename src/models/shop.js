import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  price: Number,
});

const ShopSchema = new Schema({
  product: [ProductSchema],
});

const Shop = mongoose.model('Shop', ShopSchema);
export default Shop;
