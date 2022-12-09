import { Comment } from '@prisma/client';
import Link from 'next/link';
import { urlToTitle } from '../lib/categories';

export type Board = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  username: string;
  categoryName: string;
  published: boolean;
  comments: Comment[];
};

const Item = ({ board }: { board: Board }) => {
  return (
    <li>
      <Link className='block w-full p-3 my-2 border rounded-xl hover:text-white hover:bg-gray-400' href={`/board/${board.id}`}>
        <div className='flex items-center gap-4 mb-2'>
          <h2 className='font-bold text-xl flex items-center'>
            {board.title}
            <span className='font-light text-sm ml-2'>{!!board.comments.length && `(${board.comments.length})`}</span>
          </h2>
          <p className='px-2 rounded-full border'>{urlToTitle(board.categoryName)}</p>
        </div>
        <p>{board.username}</p>
      </Link>
    </li>
  );
};
export default Item;
