import supertest from 'supertest';
import app from '../server';
const request = supertest(app);

describe('test basics endpoint server', () => {
  it('Get the / endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
