'use client';

import { BsSearch } from 'react-icons/bs';

const SearchBox = () => {
  return (
    <button className='flex bg-gray-200 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-400 items-center w-[140px] justify-between py-1 px-3 border rounded-full'>
      <p>Search...</p>
      <BsSearch size={20} />
    </button>
  );
};
export default SearchBox;
