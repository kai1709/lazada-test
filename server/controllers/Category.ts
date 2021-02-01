import CategoryModel from '../models/Category'
import express from 'express'

export const getCategories = async (req: express.Request, res: express.Response) => {
  const categories = await CategoryModel.find({});

  res.status(200).send({
    success: true,
    data: categories
  })
}

export const getCategoryById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params
  const category = await CategoryModel.findOne({ id });

  if (!category) return res.status(500).send({
    success: false,
    message: 'Category not found'
  })

  res.status(200).send({
    success: true,
    data: category
  })
}
