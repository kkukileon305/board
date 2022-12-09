import { Board } from '@prisma/client';
import Link from 'next/link';
import { urlToTitle } from '../lib/categories';

const Item = ({ board }: { board: Board }) => {
  return (
    <li>
      <Link className='block w-full p-3 my-2 border rounded-xl hover:text-white hover:bg-gray-400' href={`/board/${board.id}`}>
        <div className='flex items-center gap-4 mb-2'>
          <h2 className='font-bold text-xl'>{board.title}</h2>
          <p className='px-2 rounded-full border'>{urlToTitle(board.categoryName)}</p>
        </div>
        <p>{board.username}</p>
      </Link>
    </li>
  );
};
export default Item;
