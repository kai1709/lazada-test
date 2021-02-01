import ProductModel from '../models/Product'
import express from 'express'
export const getProducts = async (req: express.Request, res: express.Response) => {
  const { categoryId, pageNumber = 0, pageSize = 8 } = req.query;

  const products = await ProductModel.find({ categoryId })
    .sort({ _id: -1 })
    .skip((parseInt(pageNumber.toString())) * parseInt(pageSize.toString()))
    .limit(parseInt(pageSize.toString()))
  const total = await ProductModel.countDocuments({})
  return res.status(200).send({
    success: true,
    data: products,
    total
  })
}

export const getProductById = async (req: express.Request, res: express.Response) => {
  const { productId } = req.params;
  const product = await ProductModel.findOne({ itemId: productId })
  if (!product) return res.status(500).send({
    success: false,
    message: 'Product not found'
  })
  return res.status(200).send({
    success: true,
    data: product
  })
}
