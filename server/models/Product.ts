import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  isCurrencyLeft: { type: String },
  itemTitle: { type: String },
  entityType: { type: String },
  itemDiscount: { type: String },
  itemId: { type: String, unique: true },
  itemImg: { type: String },
  itemRatingScore: { type: Number },
  itemReviews: { type: Number },
  itemDiscountPrice: { type: String },
  currency: { type: String },
  itemPrice: { type: String },
  itemUrl: { type: String },
  categoryId: { type: String }
})

const ProductModel = mongoose.model('Product', ProductSchema)

export default ProductModel
