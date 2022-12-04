'use client';

import { useTheme } from 'next-themes';
import { BsMoon, BsSun } from 'react-icons/bs';

const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();

  return (
    <button //
      onClick={() => setTheme(theme === 'dark' ? 'white' : 'dark')}
      className='bg-gray-400 p-1 rounded-full w-[70px]'
    >
      <span className='aspect-square block w-fit p-1 translate-x-[0px] dark:translate-x-[34px] transition bg-white rounded-full overflow-hidden'>{theme === 'dark' ? <BsMoon size={20} color='gray' /> : <BsSun size={20} color='gray' />}</span>
    </button>
  );
};
export default ThemeSwitch;
