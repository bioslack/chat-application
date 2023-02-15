import app from '../../src/server';
import request from 'supertest';

describe('Testing /auth routes', () => {
  const user = { nickname: 'alberteinstein', password: '12345678' };

  it('Should register a new unique user', async () => {
    const response = await request(app)
      .post('/chat-app/v1/auth/signup')
      .send(user);

    expect(response.status).toBe(200);
  });

  it('Should fails to register duplicate user', async () => {
    await request(app).post('/chat-app/v1/auth/signup').send(user);
    const response = await request(app)
      .post('/chat-app/v1/auth/signup')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User exists already');
  });

  it('Should fails to sign in with no nickname', async () => {
    const response = await request(app)
      .post('/chat-app/v1/auth/signin')
      .send({ nickname: '', password: '12345678' });
    expect(response.status).toBe(400);
  });

  it('Should fails to sign in with no password', async () => {
    await request(app).post('/chat-app/v1/auth/signup').send(user);
    const response = await request(app)
      .post('/chat-app/v1/auth/signin')
      .send({ nickname: 'luispereira', password: '' });
    expect(response.status).toBe(400);
  });

  it('Should fails as someone tries to sign in with an unregistered nickname', async () => {
    const response = await request(app)
      .post('/chat-app/v1/auth/signin')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('Should succeeds as someone tries to sign with a existent user nickname', async () => {
    await request(app).post('/chat-app/v1/auth/signup').send(user);
    const response = await request(app)
      .post('/chat-app/v1/auth/signin')
      .send({ nickname: 'luispereira', password: '12345678' });
    expect(response.status).toBe(200);
  });
});
