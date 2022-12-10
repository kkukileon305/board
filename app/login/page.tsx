'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { axiosInstance } from '../../lib/axios';
import useToken from '../../zustand/useToken';
import { User } from '@prisma/client';
import Modal from '../../components/Modal';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const setToken = useToken(store => store.setToken);
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>();

  watch(() => {
    setError(false);
  });

  const onSubmit = async (inputs: Inputs) => {
    setDisabled(true);
    try {
      const { data } = await axiosInstance.post<{ token: string; user: User }>('/auth/login', inputs);
      setToken(data.token);
      router.push('/');
    } catch (error) {
      console.log(error);
      setDisabled(false);
      setError(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] mx-auto w-full flex flex-col p-3 gap-4'>
        <h2 className='font-bold text-2xl my-4'>로그인</h2>
        <input className='bg-transparent border-b p-2' placeholder='이메일' type='email' {...register('email', { required: true })} />
        <input className='bg-transparent border-b p-2' placeholder='비밀번호' type='password' autoComplete='off' {...register('password', { required: true, minLength: 6 })} />
        <button className='w-full flex justify-center' disabled={disabled}>
          {disabled ? <ImSpinner2 className='animate-spin' size={30} /> : '로그인하기'}
        </button>
        {error && <p className='text-center text-red-500 font-bold'>이메일과 비밀번호를 확인해주세요</p>}
      </form>
    </>
  );
};
export default LoginPage;
