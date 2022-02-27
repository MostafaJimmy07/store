import OrderModel from '../models/order.model';
import { Request, Response } from 'express';
const orderModel = new OrderModel();
////////////////////////////////CREATE ORDER////////////////////////////////////////////
export const create = async (req: Request, res: Response) => {
  const order = req.body;

  if (order.user_id == '' || typeof order.user_id == 'undefined') {
    res.json('Invalid arguments. Requires id of user for making order.');
    return;
  }
  if (order.status == '' || typeof order.status == 'undefined') {
    res.json('Invalid arguments. Requires status of order for making order.');
    return;
  }

  try {
    const newOrder = await orderModel.create(order);
    res.json({
      status: 'success',
      result: { ...newOrder },
      message: 'Order Created Successfully',
    });
  } catch (err) {
    res.status(400);
    res.json({ error: `${err}` });
  }
};
//////////////////////INDEX(GET ALL ORDERS)////////////////////////////////////////

export const index = async (_req: Request, res: Response) => {
  try {
    const orders = await orderModel.index();
    res.json({
      status: 'success',
      result: { ...orders },
      message: 'Orderretrieved successfully',
    });
  } catch (err) {
    res.status(400);
    res.json({ error: `${err}` });
  }
};

///////////////////////////////GET ORDERS BY Order ID//////////////////////////////////////////////
export const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const order = await orderModel.show(id);
    res.json({
      status: 'success',
      result: { ...order },
      message: 'Orderretrieved successfully',
    });
  } catch (err) {
    res.status(400);
    res.json({ error: `${err}` });
  }
};
/////////////////////////////GET ALL Order BY UserID///////////////////////////////////////////////////
export const usersOrders = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const activeOrder = await orderModel.AllOrderByUserId(userId);
    res.json({
      status: 'success',
      result: { ...activeOrder },
      message: 'Orderretrieved successfully',
    });
  } catch (err) {
    res.status(400);
    res.json({ error: `${err}` });
  }
};
//////////////////////////////////GET Active Order BY UserID////////////////////////////////////////
export const userActiveOrder = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const activeOrder = await orderModel.getActiveOrdersByUserId(userId);
    res.json({
      status: 'success',
      result: { ...activeOrder },
      message: 'Orderretrieved successfully',
    });
  } catch (err) {
    res.status(400);
    res.json({ error: `${err}` });
  }
};
//////////////////////////////////GET Complete Order BY UserID///////////////////////////////////////
export const userCompleteOrder = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const completeOrder = await orderModel.getCompleteOrdersByUserId(userId);
    res.json({
      status: 'success',
      result: { ...completeOrder },
      message: 'Orderretrieved successfully',
    });
  } catch (err) {
    res.status(400);
    res.json({ error: `${err}` });
  }
};
///////////////////////////////////////ADD PRODUCT TO ORDER//////////////////////////////////////////
export const addProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { productId, quantity } = req.body;
    const orderDetails = await orderModel.addProductToOrder(
      userId,
      productId,
      quantity
    );
    res.json({
      status: 'success',
      result: { ...orderDetails },
      message: 'Orderretrieved successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
};
