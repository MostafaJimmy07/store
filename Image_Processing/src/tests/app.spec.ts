/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from 'express';
import supertest from 'supertest';
import app from '../index';
const request = supertest(app);

describe('Test endpoint response', () => {
  describe('gets the / endpoint', () => {
    it('Should return a status 404', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(404);
    });
  });

  describe('Test /api endpoint', () => {
    it('It should return a status 200', async () => {
      const response = await request.get('/api');
      expect(response.status).toBe(200);
    });
  });

  describe('Test /api/images endpoint', () => {
    it('It should return a status 400', async () => {
      const response = await request.get('/api/images/resize');
      expect(response.status).toBe(400);
    });
  });
});
