'use client';

import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from 'react';

interface ModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const Modal = ({ children, setModal }: ModalProps) => {
  const closeModal: MouseEventHandler = ({ target }) => {
    if (target instanceof Element && !target.closest('div.container')) {
      setModal(false);
    }
  };

  return (
    <div onClick={closeModal} className='fixed px-3 w-full h-full flex justify-center items-center top-0 left-0 bg-black/50 z-20'>
      <div className='max-w-[400px] w-full bg-white dark:bg-gray-700 border rounded-xl p-4 container'>{children}</div>
    </div>
  );
};
export default Modal;
