import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.post('/signup', async (req, res, next) => {
  passport.authenticate('signup', (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (!user) {
      return res.status(400).send({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
    });

    delete user.password;
    delete user.createdAt;

    return res.status(200).send({ message: 'Success', user });
  })(req, res, next);
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
      delete user.password;
      delete user.createdAt;
      return res.status(200).send({ message: 'Success', user });
    });
  })(req, res, next);
});

export default authRouter;
