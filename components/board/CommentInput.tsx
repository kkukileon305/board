'use client';

import { Board } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsUpload } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { axiosInstance } from '../../lib/axios';
import useToken from '../../zustand/useToken';
import Modal from '../Modal';

interface CommentInputProps {
  board: Board;
}

type Inputs = {
  content: string;
};

const CommentInput = ({ board }: CommentInputProps) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [modal, setModal] = useState(false);
  const token = useToken(store => store.token);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Inputs>();

  const onSubmit = async (inputs: Inputs) => {
    try {
      setDisabled(true);
      await axiosInstance.post('/comment', { ...inputs, board_id: board.id, token });
      router.refresh();
      setDisabled(false);
      setValue('content', '');
    } catch (error) {
      setDisabled(false);
      setModal(true);
      setValue('content', '');
      console.log(error);
    }
  };

  return (
    <>
      {modal && (
        <Modal setModal={setModal}>
          <h2 className='font-bold text-xl text-center'>계정을 확인해주세요</h2>
        </Modal>
      )}
      <div className='w-full fixed left-0 bottom-0 bg-white border-t dark:bg-gray-600'>
        <form onSubmit={handleSubmit(onSubmit)} className='p-3 w-full max-w-[1060px] gap-[20px] mx-auto flex'>
          <input autoComplete='off' className='bg-transparent border p-2 block w-[calc(100%-60px)]' placeholder='댓글' type='text' {...register('content', { required: true })} />
          <button disabled={disabled} className='flex justify-center items-center w-[40px] aspect-square bg-red-400 font-bold text-white'>
            {disabled ? <ImSpinner2 className='animate-spin mx-auto' size={24} /> : <BsUpload size={24} />}
          </button>
        </form>
      </div>
    </>
  );
};
export default CommentInput;
