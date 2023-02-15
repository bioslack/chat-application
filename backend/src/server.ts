import express from 'express';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import messagesRouter from './routes/messages';
import passport from './middlewares/passport';
import expressSession from 'express-session';

const app = express();

app.use(express.json());
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET || 'testing',
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.initialize());
server.use(passport.session());
server.use('/chat-app/v1/auth', authRouter);
server.use('/chat-app/v1', messagesRouter);
server.use('/chat-app/v1', userRouter);

export default app;
