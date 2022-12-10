'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImSpinner2 } from 'react-icons/im';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import Modal from '../../components/Modal';
import { axiosInstance } from '../../lib/axios';

type Inputs = {
  email: string;
  password: string;
  username: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit = async (inputs: Inputs) => {
    setDisabled(true);
    try {
      const {
        data: { user },
      } = await axiosInstance.post<{ user: User }>('/auth/register', inputs);
      setModal(true);
      setName(user.username);
    } catch (error) {
      console.log(error);
      setDisabled(false);
    }
  };

  return (
    <>
      {modal && (
        <Modal setModal={setModal} onClose={() => router.push('/login')}>
          <h2>가입 완료!</h2>
          <p>{name}님의 이메일을 확인하여 인증해주세요.</p>
        </Modal>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] mx-auto w-full flex flex-col p-3 gap-4'>
        <h2 className='font-bold text-2xl my-4'>회원가입</h2>
        <input className='bg-transparent border-b p-2' placeholder='이메일' autoComplete='off' type='email' {...register('email', { required: true })} />
        <input className='bg-transparent border-b p-2' placeholder='비밀번호' type='password' autoComplete='off' {...register('password', { required: true, minLength: 6 })} />
        <input className='bg-transparent border-b p-2' placeholder='닉네임' autoComplete='off' type='text' {...register('username', { required: true })} />
        <button disabled={disabled}>{disabled ? <ImSpinner2 className='animate-spin' size={30} /> : '가입하기'}</button>
      </form>
    </>
  );
};
export default RegisterPage;
