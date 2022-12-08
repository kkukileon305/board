import { NextApiHandler } from 'next';
import { prisma } from '../../../lib/prismaClient';
import supabase from '../../../lib/supabaseClient';

const register: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return res.status(400).json({
        message: 'invalide form',
      });

    const [findByEmail, findByUsername] = await Promise.all([
      prisma.user.findUnique({
        where: {
          email,
        },
      }),
      prisma.user.findUnique({
        where: {
          username,
        },
      }),
    ]);

    if (findByEmail || findByUsername)
      return res.status(400).json({
        message: '이미가입된 이메일 또는 닉네임',
      });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!data.user || error)
      return res.status(400).json({
        message: 'invalide form or already register',
      });

    try {
      const user = await prisma.user.create({
        data: {
          email,
          username,
        },
      });

      return res.json({
        message: 'user created',
        user,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'invalide form or already register2',
      });
    }
  }
};

export default register;
