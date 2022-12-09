import { verify } from 'jsonwebtoken';
import { NextApiHandler } from 'next';
import { prisma } from '../../lib/prismaClient';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { id, categoryName } = req.query;

    const skip = req.query.skip || '1';

    if (typeof id === 'string' && id) {
      const [board, comments] = await Promise.all([
        prisma.board.findUnique({
          where: {
            id: Number(id),
          },
        }),
        prisma.comment.findMany(),
      ]);

      if (!board)
        return res.status(400).json({
          message: 'failed',
        });

      const boardWithComments = { ...board, comments: comments.filter(comment => comment.board_id === board.id) };

      return res.json(boardWithComments);
    } else if (typeof categoryName === 'string' && categoryName) {
      const [boards, comments] = await Promise.all([
        prisma.board.findMany({
          orderBy: {
            id: 'desc',
          },
          where: {
            categoryName,
          },
          skip: (Number(skip) - 1) * 8,
          take: 8,
        }),
        prisma.comment.findMany(),
      ]);

      const boardsWithComments = boards.map(board => ({ ...board, comments: comments.filter(comment => board.id === comment.board_id) }));

      return res.json(boardsWithComments);
    } else {
      const [boards, comments] = await Promise.all([
        prisma.board.findMany({
          orderBy: {
            id: 'desc',
          },
          skip: (Number(skip) - 1) * 8,
          take: 8,
        }),
        prisma.comment.findMany(),
      ]);

      const boardsWithComments = boards.map(board => ({ ...board, comments: comments.filter(comment => board.id === comment.board_id) }));

      return res.json(boardsWithComments);
    }
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
