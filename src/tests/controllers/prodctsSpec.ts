import app from '../../server';
import supertest from 'supertest';
import dotenv from 'dotenv';
const request = supertest(app);
dotenv.config();

describe('Products endpoints', () => {
  let token: string;
  const getToken = async () => {
    const response = await request.post('api/products');
    token = response.body.token;
    return 'Bearer ' + token;
  };

  /////////////////////////////////////////////////////////////////////////////////////////////
  describe('POST /products/create', () => {
    it('/products endpoint should responds with status 200 with token', async () => {
      const response = await request
        .post('api/products/create')
        .set('Authorization', await getToken());
      expect(response.status).toBe(200);
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////////
  describe('GET /products/index', () => {
    it('/products/index this endpoint should return all products with response status 200', async () => {
      const response = await request.get('api/products/index');
      expect(response.status).toBe(200);
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////////
  describe('GET /products/show/1', () => {
    it('/products/show/:id this endpoint should return specific product with response status 200', async () => {
      const response = await request.get('api/products/show/1');
      expect(response.status).toBe(200);
    });
  });
});
