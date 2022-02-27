import { Request, Response } from 'express';
import ProductModel from '../models/product.model';
const productModel = new ProductModel();
////////////////////////////////CREATE////////////////////////////////////////////
export const create = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const newProduct = await productModel.create(product);
    res.json({
      status: 'success',
      result: { ...newProduct },
      message: 'Product Created Successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
};
//////////////////////INDEX(SHOW ALL PRODUCTS)////////////////////////////////////////
export const index = async (req: Request, res: Response) => {
  try {
    const products = await productModel.index();
    if (!products) {
      res.json({ message: 'Products Not Found' });
    } else {
      res.json({
        status: 'success',
        result: { ...products },
        message: 'Products retrieved successfully',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      error: (error ?? null) as string,
    });
  }
};
///////////////////////////////SHOW PRODUCT BY ID////////////////////////////////////////////////////////
export const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await productModel.showById(id);
    if (!product) {
      res.json({ message: 'Product Not Found' });
    } else {
      res.json({
        status: 'success',
        result: { ...product },
        message: 'Product retrieved successfully',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      error: (error ?? null) as string,
    });
  }
};
