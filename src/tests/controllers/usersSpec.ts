import UserModel from '../../models/user.model';
import User from '../../types/user.type';
import app from '../../server';
import supertest from 'supertest';
import db from '../../database/database';
const userModel = new UserModel();
const request = supertest(app);
let token = '';
describe('User API Endpoints', () => {
  const user = {
    user_name: 'tetUser',
    first_name: 'Test',
    last_name: 'User',
    password: '87654321',
  } as User;

  beforeAll(async () => {
    const createdUser = await userModel.create(user);
    user.id = createdUser.id;
  });

  ////////////////////////////////////////////////////////////////
  describe('Test Login & Authenticate methods', () => {
    it('should be able to login & authenticate to get token', async () => {
      const res = await request
        .post('/api/users/login')
        .set('Content-type', 'application/json')
        .send({
          user_name: 'tetUser',
          password: '87654321',
        });
      expect(res.status).toBe(200);
      const { id, user_name } = res.body.result;
      const { token: userToken } = res.body;
      //console.log('Result', res.body);
      expect(id).toBe(user.id);
      expect(user_name).toBe('tetUser');
      token = userToken;
      //console.log('Token :', token);
    });
    /////////////////////
    it('should failed to login & authenticate with wrong UserName & Password', async () => {
      const res = await request
        .post('/api/users/login')
        .set('Content-type', 'application/json')
        .send({
          user_name: 'test',
          password: '12345678',
        });
      expect(res.status).toBe(200);
    });
  });
  ///////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  describe('Test API methods', () => {
    it('should create new user', async () => {
      const res = await request
        .post('/api/users/create')
        .set('Content-type', 'application/json')
        .send({
          user_name: 'test2User',
          first_name: 'Test2',
          last_name: 'User2',
          password: '12345678',
        } as User);
      expect(res.status).toBe(200);
      const { user_name, first_name, last_name } = res.body.result;
      //console.log('Result', res.body);
      expect(user_name).toBe('test2User');
      expect(first_name).toBe('Test2');
      expect(last_name).toBe('User2');
    });
    ////////////////
    it('should get list of users', async () => {
      const res = await request
        .get('/api/users/index')
        .send({ token: token })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      //console.log('Length', res.body.result.length);
      expect(res.body.result.length).toBe(2);
    });
    ////////////////

    it('should get user info', async () => {
      const res = await request
        .get(`/api/users/show/${user.id}`)
        .send({ token: token })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      //console.log('Result', res.body);
      expect(res.status).toBe(200);
      const { user_name } = res.body.result;
      expect(user_name).toBe('tetUser');
    });
  });
  afterAll(async () => {
    const connection = await db.connect();
    await connection.query('DELETE FROM users;');
    await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');

    connection.release();
  });
});
