'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../lib/axios';
import { categories } from '../../lib/categories';
import useToken from '../../zustand/useToken';

type Inputs = {
  title: string;
  content: string;
};

const PostPage = () => {
  const router = useRouter();
  const [curCategory, setCurCategory] = useState('자유');
  const token = useToken(store => store.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (inputs: Inputs) => {
    try {
      await axiosInstance.post('/board', { ...inputs, token, categoryName: curCategory });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' {...register('title', { required: true })} />
      <input type='text' {...register('content', { required: true })} />
      <button>업로드</button>
    </form>
  );
};
export default PostPage;
