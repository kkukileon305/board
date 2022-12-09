import { verify } from 'jsonwebtoken';
import { NextApiHandler } from 'next';
import { prisma } from '../../lib/prismaClient';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { token, board_id, content } = req.body;

    if (!token)
      return res.status(400).json({
        message: 'failed',
      });

    const email = verify(token, process.env.NEXT_PUBLIC_KEY as string) as string;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!board_id || !content || !token || !user)
      return res.status(400).json({
        message: 'failed',
      });

    try {
      const comment = await prisma.comment.create({
        data: {
          content,
          board_id: Number(board_id),
          username: user.username,
        },
      });

      return res.json({
        message: 'comment created',
        comment,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'failed',
        error,
      });
    }
  } else if (req.method === 'PATCH') {
    const { token, id } = req.body;

    if (!token || !id)
      return res.status(400).json({
        message: 'failed',
      });

    const email = verify(token, process.env.NEXT_PUBLIC_KEY as string) as string;
    const [user, comment] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.comment.findFirst({
        where: {
          AND: {
            published: true,
            id,
          },
        },
      }),
    ]);

    if (!user || !comment)
      return res.status(400).json({
        message: 'failed',
      });

    if (user.username !== comment.username)
      return res.status(400).json({
        message: 'failed',
      });

    await prisma.comment.update({
      data: {
        published: false,
      },
      where: {
        id,
      },
    });

    return res.json({
      message: 'comment deleted',
    });
  }
};

export default handler;
