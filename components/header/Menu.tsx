'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { categories } from '../../lib/categories';
import Modal from '../Modal';
import Login from './Login';
import SearchBox from './SearchBox';
import ThemeSwitch from './ThemeSwitch';

const Menu = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && (
        <Modal setModal={setModal}>
          <Link onClick={() => setModal(false)} className='block font-bold text-xl mb-4' href={'/'}>
            Home
          </Link>

          <div className='flex justify-center gap-4 items-center my-4'>
            <SearchBox onClick={() => setModal(false)} />
            <ThemeSwitch />
          </div>

          <ul onClick={() => setModal(false)}>
            {categories.map(cate => (
              <li key={cate.url}>
                <Link className='block py-2' href={`/board?category=${cate.url}`}>
                  {cate.title}
                </Link>
              </li>
            ))}
          </ul>

          <div onClick={() => setModal(false)} className='flex justify-center gap-4'>
            <Login />
          </div>
        </Modal>
      )}
      <button onClick={() => setModal(true)} className='block md:hidden'>
        <BiMenu size={28} />
      </button>
    </>
  );
};
export default Menu;
