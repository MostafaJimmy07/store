import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Orders controller', () => {
  let token: string;
  const getToken = async () => {
    const response = await request.post('api/orders');
    token = response.body.token;
    return 'Bearer ' + token;
  };
  /////////////////////////////////////////////////////////////////////////////////////////////
  describe('POST /order/create', () => {
    it('/orders endpoint should responds with status 200 with token', async () => {
      const response = await request
        .post('api/orders/create')
        .set('Authorization', await getToken());
      expect(response.status).toBe(200);
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////////
  describe('GET /orders/indx', () => {
    it('/orders/index this endpoint should return all orders with response status 200', async () => {
      const response = await request.get('api/orders/index');
      expect(response.status).toBe(200);
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////////
  describe('GET /orders/show/1', () => {
    it('/orders/show/:id this endpoint should return specific order with response status 200', async () => {
      const response = await request.get('api/orders/show/1');
      expect(response.status).toBe(200);
    });
  });
  //////////////////////////////////////////////////////////////////////////////////////////
  it('gets /orders/users/:id/active returns an active orders ', async () => {
    const response = await request
      .get('api/orders/users/1/active')
      .set('Authorization', await getToken());

    expect(response.status).toBe(200);
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////
  it('gets /orders/users/:id/completed returns a list of completed orders ', async () => {
    const response = await request
      .get('api/orders/users/1/completed')
      .set('Authorization', await getToken());

    expect(response.status).toBe(200);
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////
});
