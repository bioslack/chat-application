import { Router } from 'express';
import passport from 'passport';
import { prisma } from '../../prisma';

const authRouter = Router();

authRouter.post('/signup', async (req, res, next) => {
  try {
    const { nickname, password } = req.body;

    if (!nickname) return res.status(400).send({ message: 'Bad Request' });
    if (!password) return res.status(400).send({ message: 'Bad Request' });

    const user = await prisma.user.create({
      data: { name: '', nickname: '', password: '' },
    });
    passport.authenticate('signup', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (!user) return res.status(400).send({ message: info.message });

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
      });
      return res.status(200).send({ message: 'Success' });
    })(req, res, next);
  } catch (error) {
    if (Object.keys(error as Object).includes('code')) {
      if ((error as { code: string }).code === 'P2002') {
        return res.status(400).send({ message: 'Duplicate user' });
      }
    }
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});

authRouter.post('/signin', (req, res, next) => {
  passport.authenticate('signin', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send({ message: 'Success' });
    });
  })(req, res, next);
});

export default authRouter;
