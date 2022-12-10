'use client';

import { Comment } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { axiosInstance } from '../../lib/axios';
import { getFormattedDate } from '../../lib/getFormattedDate';
import useToken from '../../zustand/useToken';
import Modal from '../Modal';

const CommentItem = ({ comment }: { comment: Comment }) => {
  const router = useRouter();
  const token = useToken(store => store.token);
  const [disabled, setDisabled] = useState(false);
  const [modal, setModal] = useState(false);

  const onClick = async () => {
    try {
      setDisabled(true);
      await axiosInstance.patch('/comment', { id: comment.id, token });
      router.refresh();
      setDisabled(false);
    } catch (error) {
      console.log(error);
      setDisabled(false);
      setModal(true);
    }
  };

  return (
    <>
      {modal && (
        <Modal setModal={setModal}>
          <h2 className='font-bold text-xl text-center'>계정을 확인해주세요</h2>
        </Modal>
      )}
      <li key={comment.id} className='mb-2 pb-2 border-b'>
        <div className='flex gap-4'>
          <p className='mb-2'>{comment.content}</p>
          <p className='text-gray-400 break-keep'>{comment.username}</p>
        </div>
        <div className='flex gap-4 text-gray-400'>
          <p>{getFormattedDate(new Date(comment.createdAt))}</p>
          <button onClick={onClick} className='w-[32px]' disabled={disabled}>
            {disabled ? <ImSpinner2 className='animate-spin' size={20} /> : '삭제'}
          </button>
        </div>
      </li>
    </>
  );
};
export default CommentItem;
