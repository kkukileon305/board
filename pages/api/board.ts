import { NextApiHandler } from 'next';
import { prisma } from '../../lib/prismaClient';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const boards = await prisma.board.findMany();

    return res.json(boards);
  }
};

export default handler;
