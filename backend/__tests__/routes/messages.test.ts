import supertest, { SuperAgentTest } from 'supertest';
import app from '../../src/server';

describe('test /messages routes', () => {
  let cookie: string;
  let agent: SuperAgentTest;

  const credentials = {
    nickname: 'luispereira',
    password: '12345678',
  };

  beforeEach(async () => {
    agent = supertest.agent(app);

    const signinRes = await agent
      .post('/chat-app/v1/auth/signin')
      .send(credentials);
    cookie = signinRes.headers['set-cookie'][0];
  });

  it('Should get messages', async () => {
    const response = await agent
      .get('/chat-app/v1/messages/1')
      .set('Cookie', cookie);

    expect(response.status).toBe(200);
  });
});
