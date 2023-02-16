import express, { Request, Response, NextFunction } from 'express';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import messagesRouter from './routes/messages';
import passport from './middlewares/passport';
import expressSession from 'express-session';
import cors, { CorsOptions } from 'cors';
import http from 'http';

const server = express();
const app = http.createServer(server);

const allowed = [
  'http://localhost',
  'https://localhost',
  'http://localhost:3000',
];

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (allowed.includes(origin || 'unknown origing')) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowed.indexOf(origin || 'unknown origin') !== -1 || !origin)
      return callback(null, true);
    return callback(new Error('Restricted by CORS policy'));
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

server.use(express.json());
server.use(credentials);
server.use(cors(corsOptions));
server.use(
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
