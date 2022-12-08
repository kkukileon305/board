import { NextApiHandler } from 'next';
import { prisma } from '../../lib/prismaClient';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { username, board_id, content } = req.body;

    if (!board_id || !content || !username)
      return res.status(400).json({
        message: 'failed',
      });

    try {
      const comment = await prisma.comment.create({
        data: {
          content,
          board_id: Number(board_id),
          username,
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
  }
};

export default handler;
