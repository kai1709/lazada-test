import ProductModel from '../models/Product'

export const getProducts = async (req, res) => {
  const { categoryId, pageNumber = 0, pageSize = 8 } = req.query;

  const products = await ProductModel.find({ categoryId })
    .sort({ _id: -1 })
    .skip((parseInt(pageNumber.toString()) - 1) * parseInt(pageSize.toString()))
    .limit(parseInt(pageSize.toString()))
  return res.status(200).send({
    success: true,
    data: products
  })
}

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await ProductModel.find({ itemId: productId })
  if (!product) return res.status(500).send({
    success: false,
    message: 'Product not found'
  })
  return res.status(200).status({
    success: true,
    data: product
  })
}
