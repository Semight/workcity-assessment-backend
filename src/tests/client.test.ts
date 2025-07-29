// src/tests/client.test.ts
jest.setTimeout(30000); // 30s timeout for slow Mongo responses
import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../models/User';
import Client from '../models/Client';

let token: string = '';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  // Create a test user and login
  await User.deleteMany({});
  const userRes = await request(app).post('/api/auth/signup').send({
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'testpass',
    role: 'admin',
  });

  token = userRes.body.token;
});

afterAll(async () => {
  await Client.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Client API', () => {
  it('should create a new client', async () => {
    const res = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Bruce Wayne',
        email: 'bruce@wayneenterprises.com',
        phone: '08098765432',
        company: 'Wayne Enterprises',
        address: 'Gotham City',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Bruce Wayne');
  });
});
