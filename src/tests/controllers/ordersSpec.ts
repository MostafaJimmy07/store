import UserModel from '../../models/user.model';
import User from '../../types/user.type';
import Order from '../../types/order.type';
import app from '../../server';
import supertest from 'supertest';
import db from '../../database/database';
const userModel = new UserModel();
const request = supertest(app);
let token = '';

describe('Order API EndPoint', () => {
  const user = {
    user_name: 'testUser',
    first_name: 'Test',
    last_name: 'User',
    password: '87654321',
  } as User;

  beforeAll(async () => {
    const createdUser = await userModel.create(user);
    user.id = createdUser.id;
  });

  describe('Test Authentication For Get Token To Create Order', () => {
    it('should be able to login & authenticate to get token', async () => {
      const res = await request
        .post('/api/users/login')
        .set('Content-Type', 'application/json')
        .send({
          user_name: 'testUser',
          password: '87654321',
        });
      expect(res.status).toBe(200);
      const { id, user_name } = res.body.result;
      const { token: userToken } = res.body;
      //console.log('USER', res.body);
      expect(id).toBe(1);
      expect(user_name).toBe('testUser');
      token = userToken;
      //console.log('Token :', token);
    });
  });
  ///////////////////////////////////////////////////
  describe('Test API methods', () => {
    it('should create Order', async () => {
      const res = await request
        .post('/api/orders/create')
        .send({
          user_id: `${user.id}`,
          status: 'complete',
        } as Order)
        .send({ token: token })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      // console.log('NEW ORDER', res.body);
      const { user_id, status } = res.body.result;
      expect(user_id).toBe(user_id);
      expect(status).toBe('complete');
    });
    /////////////////////////////////////////////////////
    it('should create new Order', async () => {
      const res = await request
        .post('/api/orders/create')
        .send({
          user_id: `${user.id}`,
          status: 'active',
        } as Order)
        .send({ token: token })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      // console.log('NEW ORDER', res.body);
      const { user_id, status } = res.body.result;
      expect(user_id).toBe(user_id);
      expect(status).toBe('active');
    });
    ////////////////////////////////////////////////////////////////////////
    it('should return All Orders by UserId', async () => {
      const res = await request
        .get('/api/orders/users/1/orders')
        .send({ token: token })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      //console.log('ALL ORDER', res.body);
    });
    ////////////////////////////////////////
    it('should return AllCompletedOrders by UserId', async () => {
      const res = await request
        .get(`/api/orders/users/${user.id}/completed`)
        .send({ token: token })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      // console.log('COMPLETED ORDER', res.body);
    });
    ////////////////////////////////////////
    it('should return AllActiveOrders by UserId', async () => {
      const res = await request
        .get(`/api/orders/users/${user.id}/active`)
        .send({ token: token })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      // console.log('ACTIVE ORDER', res.body);
    });
  });
  afterAll(async () => {
    const connection = await db.connect();
    await connection.query('DELETE FROM orders;');
    await connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
    await connection.query('DELETE FROM users;');
    await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');

    connection.release();
  });
});
