import app from '../../src/server';
import request from 'supertest';

describe('Testing /user route', () => {
  let agent: request.SuperAgentTest;
  let cookie: string;

  const credentials = {
    nickname: 'luispereira',
    password: '12345678',
  };

  beforeEach(async () => {
    agent = request.agent(app);
    const signinRes = await agent
      .post('/chat-app/v1/auth/signin')
      .send(credentials);
    cookie = signinRes.headers['set-cookie'][0];
  });

  it('Should get users list', async () => {
    const response = await agent
      .get('/chat-app/v1/users')
      .set('Cookie', cookie);

    expect(response.status).toBe(200);
  });

  it('Should change user data', async () => {
    const response = await agent
      .post('/chat-app/v1/user')
      .set('Cookie', cookie)
      .send({ name: 'Luis Pereira' });

    expect(response.status).toBe(200);
    expect(response.body.user.name).toBe('Luis Pereira');
  });

  it('Should fail when trying to access restricted route with no authentication', async () => {
    const response = await request(app).get('/chat-app/v1/users');

    expect(response.status).toBe(403);
  });
});
