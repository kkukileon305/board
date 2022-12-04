import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';
import { categories } from '../../lib/categories';
import Login from './Login';
import SearchBox from './SearchBox';
import Menu from './Menu';

const Header = () => {
  return (
    <header className='border-b h-[60px] flex items-center justify-between'>
      <div className='max-w-[1060px] w-full p-3 mx-auto flex items-center justify-between'>
        <Link className='font-bold text-xl' href={'/'}>
          Home
        </Link>

        <ul className='hidden md:flex items-center gap-4'>
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

        <Login />
        <Menu />
      </div>
    </header>
  );
};
export default Header;
