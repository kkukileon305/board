'use client';

import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from 'react';

interface ModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, setModal, onClose }: ModalProps) => {
  const closeModal: MouseEventHandler = ({ target }) => {
    if (target instanceof Element && !target.closest('div.container')) {
      setModal(false);
      onClose && onClose();
    }
  };

  return (
    <div onClick={closeModal} className='fixed px-3 w-screen h-screen flex justify-center items-center top-0 left-0 bg-black/50 z-20'>
      <div className='max-w-[400px] w-full bg-white dark:bg-gray-700 border rounded-xl p-4 container'>{children}</div>
    </div>
  );
};
export default Modal;
