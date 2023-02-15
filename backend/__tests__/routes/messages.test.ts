import supertest, { SuperAgentTest } from 'supertest';
import app from '../../src/server';
import { prisma } from '../../prisma/__mocks__/index';
import { readFile } from 'fs/promises';
import path from 'path';

describe('test /messages routes', () => {
  let cookie: string;
  let agent: SuperAgentTest;

  const credentials = {
    nickname: 'luispereira',
    password: '12345678',
  };

  beforeEach(async () => {
    agent = supertest.agent(app);

    const signinRes = await agent.post('/chat-app/v1/auth/signin').send({
      nickname: 'luispereira',
      password: '12345678',
    });
    cookie = signinRes.headers['set-cookie'][0];
  });

  it('Should get messages', async () => {
    const response = await agent
      .get('/chat-app/v1/messages')
      .set('Cookie', cookie);

    expect(response.status).toBe(200);
  });
});
