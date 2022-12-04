'use client';

import { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import Modal from '../Modal';

const Menu = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && <Modal setModal={setModal}>Menu</Modal>}
      <button onClick={() => setModal(true)} className='block md:hidden'>
        <BiMenu size={28} />
      </button>
    </>
  );
};
export default Menu;
