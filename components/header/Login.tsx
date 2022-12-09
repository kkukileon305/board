'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import useToken from '../../zustand/useToken';

const Login = () => {
  const { token, setToken } = useToken(({ token, setToken }) => ({ token, setToken }));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      {loading && token ? (
        <div className='flex justify-end w-full'>
          <button onClick={() => setToken('')} className=' px-4 py-1 font-bold text-white bg-red-400 rounded-full'>
            로그아웃
          </button>
        </div>
      ) : (
        <>
          <Link className='w-[96px] text-center px-4 py-1 font-bold text-gray-700 dark:text-white bg-transparent rounded-full border' href={'/login'}>
            로그인
          </Link>
          <Link className='w-[96px] text-center px-4 py-1 font-bold text-white bg-red-400 rounded-full' href={'/register'}>
            회원가입
          </Link>
        </>
      )}
    </>
  );
};
export default Login;
