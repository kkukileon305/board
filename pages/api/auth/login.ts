import { sign } from 'jsonwebtoken';
import { NextApiHandler } from 'next';
import { prisma } from '../../../lib/prismaClient';
import supabase from '../../../lib/supabaseClient';

const register: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: 'invalide form',
      });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user)
      return res.status(400).json({
        message: 'login failed',
      });

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const token = sign(data.user.email as string, process.env.NEXT_PUBLIC_KEY as string);

    return res.json({
      user,
      token,
    });
  }
};

export default register;
