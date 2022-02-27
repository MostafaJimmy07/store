import Order from '../../types/order.type';
import OrderModel from '../../models/order.model';
import db from '../../database/database';
import UserModel from '../../models/user.model';
import User from '../../types/user.type';
const userModel = new UserModel();
const orderModel = new OrderModel();

describe(' Order Model', () => {
  /////////////////////////////////////////////////
  describe('Test Methods Exist', () => {
    it('should have a create method', () => {
      expect(orderModel.create).toBeDefined();
    });

    it('should have an index method', () => {
      expect(orderModel.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(orderModel.show).toBeDefined();
    });
    it('should have a getAllOrderBYUserId method', () => {
      expect(orderModel.AllOrderByUserId).toBeDefined();
    });
    it('should have a getActiveOrderBYUserId method', () => {
      expect(orderModel.getActiveOrdersByUserId).toBeDefined();
    });
    it('should have a getCompleteOrderBYUserId method', () => {
      expect(orderModel.getCompleteOrdersByUserId).toBeDefined();
    });
    it('should have a AddProductToOrder method', () => {
      expect(orderModel.addProductToOrder).toBeDefined();
    });
  });
  /////////////////////////////////////////////////////////////////////
  describe('Test Order Model Logic', () => {
    const user = {
      user_name: 'testUser',
      first_name: 'Test',
      last_name: 'User',
      passwrod: '87654321',
    } as unknown as User;

    beforeAll(async () => {
      const createdUser = await userModel.create(user);
      user.id = createdUser.id;
      const order = {
        user_id: `${user.id}`,
        status: 'complete',
      } as unknown as Order;
      const createdOrder = await orderModel.create(order);
      order.id = createdOrder.id;
    });

    //////////////////////////////////////////////////////////
    it('create method should add a NewOrder', async () => {
      const createdOrder = await orderModel.create({
        user_id: user.id,
        status: 'active',
      } as Order);
      expect(createdOrder).toEqual(
        jasmine.objectContaining({
          id: createdOrder.id,
          user_id: `${user.id}`,
          status: 'active',
        } as Order)
      );
    });
    //////////////////////////////////////////////////////////
    it('index method should return a list of orders', async () => {
      const orders = await orderModel.index();
      expect(orders.length).toBe(2);
    });
    //////////////////////////////////////////////////////////
    it('show method should return the correct order', async () => {
      const specificOrder = await orderModel.AllOrderByUserId(
        user.id as string
      );
      expect(specificOrder.length).toBe(2);
    });
    //////////////////////////////////////////////////////////
    afterAll(async () => {
      const connection = await db.connect();
      await connection.query('DELETE FROM orders;');
      await connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
      await connection.query('DELETE FROM users;');
      await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');

      connection.release();
    });
  });
});
