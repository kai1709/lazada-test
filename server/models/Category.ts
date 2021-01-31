import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
  pageTitle: { type: String },
  title: { type: String },
  subtitle: { type: String },
  bannerUrl: { type: String },
  id: { type: String, unique: true },
  serverTime: { type: String },
  defaultBottomUrl: { type: String },
  defaultBottomKey: { type: String },
})

const CategoryModel = mongoose.model('Category', CategorySchema)

export default CategoryModel
