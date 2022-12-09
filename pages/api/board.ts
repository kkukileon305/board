import { verify } from 'jsonwebtoken';
import { NextApiHandler } from 'next';
import { prisma } from '../../lib/prismaClient';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { id, categoryName } = req.query;

    const skip = req.query.skip || '1';

    if (typeof id === 'string' && id) {
      const [board, comments] = await Promise.all([
        prisma.board.findFirst({
          where: {
            AND: {
              id: Number(id),
              published: true,
            },
          },
        }),
        prisma.comment.findMany({
          where: {
            published: true,
          },
        }),
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
            AND: {
              categoryName,
              published: true,
            },
          },
          skip: (Number(skip) - 1) * 16,
          take: 16,
        }),
        prisma.comment.findMany({
          where: {
            published: true,
          },
        }),
      ]);

      const boardsWithComments = boards.map(board => ({ ...board, comments: comments.filter(comment => board.id === comment.board_id) }));

      return res.json(boardsWithComments);
    } else {
      const [boards, comments] = await Promise.all([
        prisma.board.findMany({
          orderBy: {
            id: 'desc',
          },
          skip: (Number(skip) - 1) * 16,
          take: 16,
          where: {
            published: true,
          },
        }),
        prisma.comment.findMany({
          where: {
            published: true,
          },
        }),
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
  } else if (req.method === 'PATCH') {
    const { token, id } = req.body;

    if (!token || !id)
      return res.status(400).json({
        message: 'failed',
      });

    const email = verify(token, process.env.NEXT_PUBLIC_KEY as string) as string;
    const [user, board] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.board.findFirst({
        where: {
          AND: {
            id,
            published: true,
          },
        },
      }),
    ]);

    if (!user || !board)
      return res.status(400).json({
        message: 'failed',
      });

    if (board.username !== user.username)
      return res.status(400).json({
        message: 'user 불일치',
      });

    await prisma.board.update({
      where: {
        id,
      },
      data: {
        published: false,
      },
    });

    return res.json({
      message: 'board deleted',
    });
  }
};

export default handler;
