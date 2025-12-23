import request from 'supertest';
import app from '../app';

describe('GET /api', () => {
  it('responds 404 for root API', async () => {
    const res = await request(app).get('/api');
    expect(res.status).toBe(404);
  });
});