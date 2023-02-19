import { Router } from 'express';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../../prisma/';

const userRouter = Router();

userRouter.post('/user', async (req, res) => {
  if (!req.isAuthenticated())
    return res.status(403).send({ message: 'Forbidden' });

  if (!req.user) return res.status(403).send({ message: 'Forbidden' });

  const { nickname, password, name } = req.body;

  if (!nickname && !password && !name)
    return res.status(400).send({ message: 'Bad Request' });

  let updatedUser: Partial<User> = {};

  if (password) {
    const hashed = await bcrypt.hash(password, 12);
    updatedUser.password = hashed;
  }

  if (nickname) updatedUser.nickname = nickname;
  if (name) updatedUser.name = name;

  try {
    const currentUser = req.user as User;

    const user = await prisma.user.update({
      where: { nickname: currentUser.nickname },
      data: updatedUser,
    });

    res.status(200).send({
      message: 'Success',
      user,
    });
  } catch (error) {
    if (Object.keys(error as Object).includes('code')) {
      if ((error as { code: string }).code === 'P2002') {
        return res.status(400).send({
          message: 'Duplicate user',
        });
      }
    }
    return res.status(500).send({
      message: 'Internal Server Error',
    });
  }
});

userRouter.get('/users', async (req, res) => {
  if (!req.isAuthenticated())
    return res.status(403).send({ message: 'Forbidden' });

  if (!req.user) return res.status(403).send({ message: 'Forbidden' });

  const currentUser = req.user as User;

  const users = await prisma.user.findMany({
    where: {
      NOT: {
        nickname: currentUser.nickname,
      },
    },
  });

  return res.status(200).send({
    users: users.map((u) => ({
      nickname: u.nickname,
      name: u.name,
      lastLogin: u.lastLogin,
    })),
  });
});

userRouter.get('/users/:search', async (req, res) => {
  const { search } = req.params;
  if (!req.isAuthenticated())
    return res.status(403).send({ message: 'Forbidden' });

  if (!req.user) return res.status(403).send({ message: 'Forbidden' });

  const currentUser = req.user as User;

  const users = await prisma.user.findMany({
    where: {
      NOT: {
        nickname: currentUser.nickname,
      },
      AND: {
        OR: [
          { name: { contains: `${search}`, mode: 'insensitive' } },
          { nickname: { contains: `${search}`, mode: 'insensitive' } },
        ],
      },
    },
  });

  return res.status(200).send({
    users: users.map((u) => ({
      nickname: u.nickname,
      name: u.name,
      lastLogin: u.lastLogin,
    })),
  });
});

export default userRouter;
