'use client';

import { Board } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { axiosInstance } from '../../lib/axios';
import useToken from '../../zustand/useToken';

const BoardDelete = ({ board }: { board: Board }) => {
  const router = useRouter();
  const token = useToken(store => store.token);
  const [disabled, setDisabled] = useState(false);

  const onClick = async () => {
    try {
      setDisabled(true);
      await axiosInstance.patch('/board', { token, id: board.id });
      router.push('/');
      router.refresh();
    } catch (error) {
      setDisabled(false);
    }
  };

  return (
    <button disabled={disabled} onClick={onClick} className='font-bold w-[64px] flex justify-center bg-red-400 text-white rounded-full px-4 py-1'>
      {disabled ? <ImSpinner2 className='animate-spin' size={24} /> : '삭제'}
    </button>
  );
};
export default BoardDelete;
