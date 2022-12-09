'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import Modal from '../../components/Modal';
import { axiosInstance } from '../../lib/axios';
import { categories, urlToTitle } from '../../lib/categories';
import useToken from '../../zustand/useToken';

type Inputs = {
  title: string;
  content: string;
};

const PostPage = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [curCategory, setCurCategory] = useState('free');
  const token = useToken(store => store.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (inputs: Inputs) => {
    try {
      setDisabled(true);
      await axiosInstance.post('/board', { ...inputs, token, categoryName: curCategory });
      router.push('/');
      router.refresh();
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  };

  const changeCategory = (title: string) => {
    setCurCategory(title);
    setModal(false);
  };

  return (
    <>
      {modal && (
        <Modal setModal={setModal}>
          <h2 className='font-bold text-xl mb-4 text-center'>카테고리를 선택해주세요</h2>
          <div className='flex flex-wrap justify-center gap-4'>
            {categories.map(category => (
              <button className='p-2 hover:bg-gray-400 border rounded-xl' onClick={() => changeCategory(category.url)} key={category.url}>
                {category.title}
              </button>
            ))}
          </div>
        </Modal>
      )}
      <button onClick={() => setModal(true)} className='border px-4 py-1 mb-4'>
        {urlToTitle(curCategory)}
      </button>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <input className='border bg-transparent p-2' placeholder='제목' type='text' {...register('title', { required: true })} />
        <textarea className='border bg-transparent p-2 resize-none h-[calc(100vh-256px)]' placeholder='내용' {...register('content', { required: true })}></textarea>
        <div className='flex items-center justify-between py-2'>
          <p>{(errors.content || errors.title) && '내용을 모두 입력해주세요'}</p>
          <button disabled={disabled} className='px-4 w-[80px] text-white py-1 font-bold rounded-full bg-red-400'>
            {disabled ? <ImSpinner2 className='animate-spin mx-auto' size={24} /> : '업로드'}
          </button>
        </div>
      </form>
    </>
  );
};
export default PostPage;
