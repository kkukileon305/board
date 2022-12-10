'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import useToken from '../../zustand/useToken';

const Login = () => {
  const router = useRouter();
  const { token, setToken } = useToken(({ token, setToken }) => ({ token, setToken }));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  const logout = () => {
    setToken('');
    router.push('/login');
  };

  return (
    <>
      {loading && token ? (
        <>
          <Link href={'/mypage'} className='px-4 py-1 w-[96px] h-[34px] font-bold border rounded-full flex justify-center items-center'>
            <BsPersonFill size={20} />
          </Link>
          <button onClick={logout} className='px-4 py-1 w-[96px] h-[34px] font-bold text-white bg-red-400 rounded-full'>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <Link className='w-[96px] text-center px-4 py-1 font-bold text-gray-700 dark:text-white bg-transparent rounded-full border' href={'/login'}>
            로그인
          </Link>
          <Link className='w-[96px] text-center h-[34px] px-4 py-1 font-bold text-white bg-red-400 rounded-full' href={'/register'}>
            회원가입
          </Link>
        </>
      )}
    </>
  );
};
export default Login;
