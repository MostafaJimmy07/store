import app from '../../server';
import supertest from 'supertest';
import dotenv from 'dotenv';
const request = supertest(app);
dotenv.config();

describe('Products endpoints', () => {
  // eslint-disable-next-line no-var
  var token: string;
  // eslint-disable-next-line prefer-const
  let getToken = async () => {
    const response = await request.post('/users');
    token = response.body.token;
    return 'Bearer ' + token;
  };

  /////////////////////////////////////////////////////////////////////////////////////////////
  describe('POST /product/create', () => {
    it('/products endpoint should responds with status 404 with token', async () => {
      const response = await request
        .post('/products/create')
        .set('Authorization', await getToken());
      expect(response.status).toBe(404);
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////////
  describe('GET /products/indx', () => {
    it('/products/index this endpoint should return all products with response status 404', async () => {
      const response = await request.get('/products/index');
      expect(response.status).toBe(404);
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////////
  describe('GET /products/show/1', () => {
    it('/products/show/:id this endpoint should return specific product with response status 404', async () => {
      const response = await request.get('/products/show/1');
      expect(response.status).toBe(404);
    });
  });
});
