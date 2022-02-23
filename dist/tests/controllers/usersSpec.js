"use strict";
/* import app from '../../server';
import User from '../../types/user.type';
import supertest from 'supertest';
import db from '../../database/database';
const request = supertest(app);
let user: User;
let users: User[];
let token: String;
let result: supertest.Response;

describe('User endpoints', () => {
  describe('POST /users/create', () => {
    it('responds with status 200 with token', async () => {
      result = await request.post('/users/create').send({
        user_name: 'gamal',
        first_name: 'mostafa',
        last_name: 'ahmed',
        password: '12345678',
      });
      token = result.body.token;
      expect(result.status).toBe(200);
    });
  });
  /////////////////////////////////////////////////////////////////////
  describe('GET /users/index', () => {
    it('responds with status 200', async () => {
      result = await request
        .get('/users/index')
        .send({ token: token })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      users = result.body;
      user = users[users.length - 1];

      expect(result.status).toBe(200);
    });

    it('should return users', () => {
      expect(result.body).toContain(
        jasmine.objectContaining({
          user_name: 'gamal',
          first_name: 'mostafa',
          last_name: 'ahmed',
        })
      );
    });
  });
  /////////////////////////////////////////////////////////////////////
  describe('GET /users/show/1', () => {
    it('responds with status 200', async () => {
      result = await request
        .get(`/users/show/1`)
        .send({ token: token })
        .set('Authorization', `Bearer ${token}`);

      expect(result.status).toBe(200);
    });

    it('should return user', () => {
      expect(result.body).toEqual(
        jasmine.objectContaining({
          user_name: 'gamal',
          first_name: 'mostafa',
          last_name: 'ahmed',
        })
      );
    });
  });
  /////////////////////////////////////////////////////////////////////
});
 */
