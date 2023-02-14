import express from 'express';
import authRouter from './routes/auth';
import userRouter from './routes/user';
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
app.use(passport.initialize());
app.use(passport.session());
app.use('/chat-app/v1/auth', authRouter);
app.use('/chat-app/v1', userRouter);

export default app;
