import Order from '../../types/order.type';
import User from '../../types/user.type';
import OrderModel from '../../models/order.model';
import UserModel from '../../models/user.model';
const Orderstore = new OrderModel();
const Userstore = new UserModel();

let order: Order;
let user: User;

describe('Order Model', () => {
  describe('should have CRUD methods', () => {
    it('should have an index method', () => {
      expect(Orderstore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(Orderstore.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(Orderstore.create).toBeDefined();
    });
  });

  beforeAll(async () => {
    const result = await Userstore.create({
      user_name: 'ahmed',
      first_name: 'gamal',
      last_name: 'mostafa',
      password: '12345678',
    });
    user = result;
  });
  ////////////////////////////////////////////////////////////////
  it('create method should add a order', async () => {
    const result = await Orderstore.create({
      user_id: `${user.id}`,
      status: 'active',
    });
    order = result;
    expect(result).toEqual({
      id: order.id,
      user_id: `${user.id}`,
      status: 'active',
    });
  });
  ////////////////////////////////////////////////////////////////
  it('index method should return a list of orders', async () => {
    const result = await Orderstore.index();
    expect(result[0]).toEqual({
      id: order.id,
      user_id: `${user.id}`,
      status: 'active',
    });
  });
  ////////////////////////////////////////////////////////////////
  it('show method should return the correct order', async () => {
    const result = await Orderstore.show(`${user.id}`);
    expect(result).toEqual({
      id: order.id,
      user_id: `${user.id}`,
      status: 'active',
    });
  });
});
