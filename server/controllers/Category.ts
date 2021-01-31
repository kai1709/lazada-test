import CategoryModel from '../models/Category'

export const getCategories = async (req, res) => {
  const categories = await CategoryModel.find({});
  res.status(200).send({
    success: true,
    data: categories
  })
}

export const getCategoryById = async (req, res) => {
  const { categoryId } = req.params
  const category = await CategoryModel.find({ id: categoryId });
  if (!category) return res.status(500).send({
    success: false,
    message: 'Category not found'
  })
  res.status(200).send({
    success: true,
    data: category
  })
}
