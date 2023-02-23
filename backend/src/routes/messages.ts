import { Router } from 'express';
import { User } from '@prisma/client';
import { prisma } from '../../prisma';

const messageRouter = Router();

messageRouter.get('/messages/:receiverId', async (req, res) => {
  const { receiverId } = req.params as { receiverId: string };
  if (!req.isAuthenticated())
    return res.status(403).send({ message: 'Forbidden' });

  if (!req.user) return res.status(400).send({ message: 'Bad Request' });

  const user = req.user as User;

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { AND: [{ senderId: user.id }, { receiverId: parseInt(receiverId) }] },
        { AND: [{ senderId: parseInt(receiverId) }, { receiverId: user.id }] },
      ],
    },
  });

  return res.status(200).send({ message: 'Success', messages });
});

export default messageRouter;
