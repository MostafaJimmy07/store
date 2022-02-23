import Order from '../types/order.type';
import db from '../database/database';
import OrderProduct from '../types/OrderProduct.type';
class OrderModel {
  ///////////////////////////////CREATE ORDER/////////////////////////////////////////////////////
  create = async (order: Order): Promise<Order> => {
    let status = order.status;

    if (typeof status === 'undefined') {
      status = 'active';
    }

    try {
      const connect = await db.connect();
      const checkQuery = `SELECT * FROM orders WHERE user_id = ($1) AND status = 'active'`;
      const checkActiveQueryRes = await connect.query(checkQuery, [
        order.user_id,
      ]);

      if (checkActiveQueryRes.rows[0]) {
        connect.release();
        throw new Error('an active order for this user already exists');
      } else {
        const sql =
          'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
        const result = await connect.query(sql, [order.user_id, status]);
        connect.release();
        const newOrder: Order = result.rows[0] as Order;
        return newOrder;
      }
    } catch (err) {
      throw new Error(`Could not create new order ${order}. ${err}`);
    }
  };
  /////////////////////////////////SHOW ORDERS///////////////////////////////////////////////////////
  index = async (): Promise<Order[]> => {
    try {
      const connect = await db.connect();
      const sql = 'SELECT * FROM orders';
      const result = await connect.query(sql);
      connect.release();
      const orders: Order[] = result.rows as Order[];
      return orders;
    } catch (err) {
      throw new Error(`Could not find orders. ${err}`);
    }
  };
  ///////////////////////////////SHOW ORDER BY ORDER ID////////////////////////////////////////////////////
  show = async (id: string): Promise<Order> => {
    try {
      const connect = await db.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connect.query(sql, [id]);
      connect.release();
      const order: Order = result.rows[0] as Order;

      return order;
    } catch (err) {
      throw new Error(`Could not find order ${id}. ${err}`);
    }
  };
  ////////////////////////Get all order by user id//////////////////////////////////////////////
  async AllOrderByUserId(userId: string): Promise<Order[]> {
    try {
      const connect = await db.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const result = await connect.query(sql, [userId]);
      connect.release();
      const orders = result.rows;

      return orders;
    } catch (err) {
      throw new Error(`Could not get active order. Error: ${err}`);
    }
  }

  ///////////////////////GET Active order by user id//////////////////////////////////////////////
  async getActiveOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM orders WHERE status='active' AND user_id=$1";
      const result = await conn.query(sql, [userId]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get completed orders. Error: ${err}`);
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  async getCompleteOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM orders WHERE status='complete' AND user_id=$1";
      const result = await conn.query(sql, [userId]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get completed orders. Error: ${err}`);
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
  async addProductToOrder(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<OrderProduct | undefined> {
    try {
      const connect = await db.connect();
      const orderQuery =
        "SELECT id FROM orders WHERE user_id = ($1) AND status = 'active'";
      const orderResult = await connect.query(orderQuery, [userId]);
      const orderId: string = orderResult.rows[0].id as string;
      if (orderId) {
        const addProductQuery =
          'INSERT INTO order_products (product_id, quantity, order_id) VALUES ($1, $2, $3) RETURNING * ';
        const result = await connect.query(addProductQuery, [
          productId,
          quantity,
          orderId,
        ]);
        connect.release();
        const newOrder: OrderProduct = result.rows[0] as OrderProduct;

        return newOrder;
      } else {
        connect.release();
        console.error(`There are no active orders for user ${userId}`);
      }
    } catch (err) {
      throw new Error(`Cannot add product ${productId} to order: ${err}`);
    }
  }

  /////////////////////////////////////////////////
}
export default OrderModel;
