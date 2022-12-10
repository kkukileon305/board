import { verify } from 'jsonwebtoken';
import { NextApiHandler } from 'next';
import { prisma } from '../../lib/prismaClient';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { token } = req.body;

    if (!token)
      return res.status(400).json({
        message: 'failed',
      });

    const email = verify(token, process.env.NEXT_PUBLIC_KEY as string) as string;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return res.status(400).json({
        message: 'invalid token',
      });

    return res.json(user);
  }
};

export default handler;
