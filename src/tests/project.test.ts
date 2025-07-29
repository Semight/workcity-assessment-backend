// src/tests/project.test.ts
jest.setTimeout(30000); // 30s timeout for slow Mongo responses
import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../models/User';
import Client from '../models/Client';
import Project from '../models/Project';

let token: string;
let clientId: string;
let projectId: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  await User.deleteMany({});
  await Client.deleteMany({});
  await Project.deleteMany({});

  const userRes = await request(app).post('/api/auth/signup').send({
    name: 'Test Admin',
    email: 'projectadmin@example.com',
    password: 'admin123',
    role: 'admin',
  });

  token = userRes.body.token;

  const clientRes = await request(app)
    .post('/api/clients')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Client X',
      email: 'clientx@email.com',
      phone: '09099999999',
      company: 'X Corp',
    });

  clientId = clientRes.body._id;

  const projectRes = await request(app)
    .post('/api/projects')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Test Project',
      description: 'Testing update endpoint',
      status: 'pending',
      deadline: '2025-10-01',
      client: clientId,
    });

  projectId = projectRes.body._id;
});

afterAll(async () => {
  await Project.deleteMany({});
  await Client.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Project API', () => {
  it('should update a project', async () => {
    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'completed',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('completed');
  });
});
