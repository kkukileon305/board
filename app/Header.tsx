import Link from 'next/link';
import ThemeSwitch from '../components/ThemeSwitch';
import { categories } from '../lib/categories';

const Header = () => {
  return (
    <header className='border-b'>
      <div className='max-w-[1060px] p-3 mx-auto flex items-center justify-between'>
        <Link className='font-bold text-xl' href={'/'}>
          Home
        </Link>

        <ul className='flex items-center gap-2'>
          {categories.map(cate => (
            <li key={cate.url}>
              <Link href={`/board?category=${cate.url}`}>{cate.title}</Link>
            </li>
          ))}
        </ul>
        <ThemeSwitch />
      </div>
    </header>
  );
};
export default Header;
