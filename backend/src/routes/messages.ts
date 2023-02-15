import { Router } from 'express';
import { User } from '@prisma/client';
import { prisma } from '../../prisma';

const messageRouter = Router();

messageRouter.get('/messages', async (req, res) => {
  if (!req.isAuthenticated())
    return res.status(403).send({ message: 'Forbidden' });

  if (!req.user) return res.status(400).send({ message: 'Bad Request' });

  const user = req.user as User;
  const { receiverId } = req.body;

  const users = await prisma.message.findMany({
    where: {
      receiverId,
      AND: { senderId: user.id },
    },
  });

  return res.status(200).send({ message: 'Success', users });
});

export default messageRouter; 