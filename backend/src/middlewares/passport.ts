import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '@prisma/client';
import { prisma } from '../../prisma';
import bcrypt from 'bcrypt';

passport.use(
  'signup',
  new LocalStrategy(
    { usernameField: 'nickname', passwordField: 'password' },
    async function (nickname, password, done) {
      try {
        const user = await prisma.user.findFirst({ where: { nickname } });

        if (user) {
          return done(null, false, { message: 'User exists already' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
          data: { nickname, password: hashedPassword, name: '' },
        });

        done(null, newUser);
      } catch {
        done(new Error('Database error'), false);
      }
    }
  )
);

passport.use(
  'signin',
  new LocalStrategy(
    {
      usernameField: 'nickname',
      passwordField: 'password',
    },
    async function (nickname, password, done) {
      const user = await prisma.user.findFirst({ where: { nickname } });
      if (!user) {
        return done(null, false, { message: 'Incorrect sign in data' });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) return done(null, false, { message: 'Incorrect sign in data' });
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: id as number },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
