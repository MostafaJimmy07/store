import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Orders controller', () => {
  // eslint-disable-next-line no-var
  var token: string;
  // eslint-disable-next-line prefer-const
  let getToken = async () => {
    const response = await request.post('/users');
    token = response.body.token;
    return 'Bearer ' + token;
  };
  /////////////////////////////////////////////////////////////////////////////////////////////
  describe('POST /order/create', () => {
    it('/orders endpoint should responds with status 404 with token', async () => {
      const response = await request
        .post('/orders/create')
        .set('Authorization', await getToken());
      expect(response.status).toBe(404);
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////////
  describe('GET /orders/indx', () => {
    it('/orders/index this endpoint should return all orders with response status 404', async () => {
      const response = await request.get('/products/index');
      expect(response.status).toBe(404);
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////////
  describe('GET /orders/show/1', () => {
    it('/orders/show/:id this endpoint should return specific product with response status 404', async () => {
      const response = await request.get('/products/show/1');
      expect(response.status).toBe(404);
    });
  });
  //////////////////////////////////////////////////////////////////////////////////////////
  it('gets /orders/users/:id/active returns an active order ', async () => {
    const response = await request
      .get('/orders/users/1/active')
      .set('Authorization', await getToken());

    expect(response.status).toBe(404);
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////
  it('gets /orders/users/:id/completed returns a list of completed orders ', async () => {
    const response = await request
      .get('/orders/users/1/completed')
      .set('Authorization', await getToken());

    expect(response.status).toBe(404);
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////
});
