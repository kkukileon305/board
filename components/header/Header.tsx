import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';
import { categories } from '../../lib/categories';
import Login from './Login';
import SearchBox from './SearchBox';
import Menu from './Menu';

const Header = () => {
  return (
    <header className='border-b h-[60px] sticky z-20 top-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur flex items-center justify-between'>
      <div className='max-w-[1060px] w-full p-3 mx-auto flex items-center justify-between'>
        <Link className='font-bold text-xl' href={'/'}>
          Board Nine
        </Link>

        <ul className='hidden md:flex items-center gap-4 px-4'>
          {categories.map(cate => (
            <li key={cate.url}>
              <Link href={`/board?category=${cate.url}`}>{cate.title}</Link>
            </li>
          ))}
        </ul>

        <div className='hidden md:flex items-center gap-4'>
          <SearchBox />
          <ThemeSwitch />
        </div>

        <div className='hidden md:flex gap-2 w-[200px]'>
          <Login />
        </div>
        <Menu />
      </div>
    </header>
  );
};
export default Header;
