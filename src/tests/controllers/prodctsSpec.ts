import UserModel from '../../models/user.model';
import ProductModel from '../../models/product.model';
import User from '../../types/user.type';
import Product from '../../types/product.type';
import app from '../../server';
import supertest from 'supertest';
import db from '../../database/database';
const userModel = new UserModel();
const productModel = new ProductModel();
const request = supertest(app);
let token = '';

describe('Product API EndPoint', () => {
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
  describe('Test Authentication For Get Token To Create Product', () => {
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
      //console.log('Result', res.body);
      expect(id).toBe(user.id);
      expect(user_name).toBe('testUser');
      token = userToken;
      //console.log('Token :', token);
    });
  });

  describe('Test API methods', () => {
    it('should create new Product', async () => {
      const res = await request
        .post('/api/products/create')
        .send({
          name: 'Appli13',
          price: 3000,
          category: 'Mobile',
        } as Product)
        .send({ token: token })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      // console.log('Result', res.body);
      const { name, price, category } = res.body.result;
      expect(name).toBe('Appli13');
      expect(price).toBe(3000);
      expect(category).toBe('Mobile');
    });
    /////////////////////////////////////
    it('should create another Product', async () => {
      const res = await request
        .post('/api/products/create')
        .send({
          name: 'Appli11',
          price: 4000,
          category: 'Mobile',
        } as Product)
        .send({ token: token })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      // console.log('Result', res.body);
      const { name, price, category } = res.body.result;
      expect(name).toBe('Appli11');
      expect(price).toBe(4000);
      expect(category).toBe('Mobile');
    });
    //////////////////////////
    it('should Get list of Products', async () => {
      const res = await request
        .get('/api/products/index')
        .send({ token: token })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      //console.log('Length', res.body.result.length);
    });
    /////////////////////////////////////
    it('should get Product info', async () => {
      const res = await request
        .get(`/api/products/show/1`)
        .send({ token: token })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      //console.log('Result', res.body);
      expect(res.status).toBe(200);
      const { name } = res.body.result;
      expect(name).toBe('Appli13');
    });
  });

  afterAll(async () => {
    const connection = await db.connect();
    await connection.query('DELETE FROM users;');
    await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    await connection.query('DELETE FROM products;');
    await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');

    connection.release();
  });
});
