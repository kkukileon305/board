'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Login = () => {
  const { data, status } = useSession();

  return (
    <div className='flex gap-2'>
      <>
        <Link className='px-4 py-2 font-bold text-gray-700 dark:text-white bg-transparent rounded-full border' href={'/login'}>
          로그인
        </Link>
        <Link className='px-4 py-2 font-bold text-white bg-red-400 rounded-full' href={'/register'}>
          회원가입
        </Link>
      </>
    </div>
  );
};
export default Login;
