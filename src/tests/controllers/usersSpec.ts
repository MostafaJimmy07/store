import app from '../../server';
import supertest from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);

describe('users endpoints', () => {
  let token: string;
  const getToken = async () => {
    const response = await request.post('api/users');
    token = response.body.token;
    return 'Bearer ' + token;
  };
  describe('POST /users/create', () => {
    it('/users endpoint should exist and return status 200 [POST]', async () => {
      const response = await request.post('api/users/create');
      expect(response.status).toBe(200);
    });
  });
  ///////////////////////////////////////////////////////////////////////////////////////
  describe('GET /users/index', () => {
    it('/users this endpoint should return all users with response status 200', async () => {
      const response = await request
        .get('api/users/index')
        .set('Authorization', await getToken());
      expect(response.status).toBe(200);
    });
  });
  ///////////////////////////////////////////////////////////////////////////////////////
  describe('GET /users/show/1', () => {
    it('/users/:id this endpoint should return specific user with response status 200', async () => {
      const response = await request
        .get('api/users/show/1')
        .set('Authorization', await getToken());
      expect(response.status).toBe(200);
    });
  });
  //////////////////////////////////////////////////////////////////////////////////
});
