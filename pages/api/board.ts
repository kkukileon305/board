import { verify } from 'jsonwebtoken';
import { NextApiHandler } from 'next';
import { prisma } from '../../lib/prismaClient';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const [boards, comments] = await Promise.all([prisma.board.findMany(), prisma.comment.findMany()]);

    const boardsWithComments = boards.map(board => ({ ...board, comments: comments.filter(comment => board.id === comment.board_id) }));

    return res.json(boardsWithComments);
  } else if (req.method === 'POST') {
    const { title, content, token, categoryName } = req.body;

    if (!title || !content || !token || !categoryName)
      return res.status(400).json({
        message: 'failed',
      });

    const email = verify(token, process.env.NEXT_PUBLIC_KEY as string) as string;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return res.status(400).json({
        message: 'failed',
      });

    try {
      const board = await prisma.board.create({
        data: {
          title,
          content,
          username: user.username,
          categoryName,
        },
      });

      return res.json({
        message: 'error...',
        board,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'board created',
        error,
      });
    }
  }
};

export default handler;
