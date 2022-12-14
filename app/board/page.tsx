'use client';

import Link from 'next/link';
import { BsPlus, BsThreeDots } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import Item from '../../components/Item';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { urlToTitle } from '../../lib/categories';
import { BoardWithComment } from '../../components/Item';
import { useSearchParams } from 'next/navigation';
import ItemSkeleton from '../../components/ItemSkeleton';

const getBoards = async (pageParam = 1, categoryName: string): Promise<BoardWithComment[]> => {
  const res = await fetch(`/api/board?categoryName=${categoryName}&skip=${pageParam}`);

  return res.json();
};

const BoardPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const { boardsInfinite, hasNextPage, setSpinnerElement } = useInfiniteScroll({
    fetcher: (pageParam = 1) => getBoards(pageParam, category || 'free'),
    key: `${category}list`,
  });

  if (!boardsInfinite) {
    return (
      <>
        <div className='h-8 w-[60px] bg-gray-400 rounded mb-4' />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </>
    );
  }

  return (
    <>
      <h2 className='font-bold text-2xl mb-4'>{urlToTitle(category || 'free')}</h2>
      <ul>{boardsInfinite.pages.map(boards => boards.map(board => <Item board={board} key={board.id} />))}</ul>
      {hasNextPage ? (
        <div ref={setSpinnerElement} className='flex justify-center py-4 my-2'>
          <ImSpinner2 className='animate-spin' size={30} />
        </div>
      ) : (
        <div className='flex justify-center py-4 my-2'>
          <BsThreeDots size={30} />
        </div>
      )}
      <Link className='fixed bottom-4 right-4 text-white bg-red-400 rounded-full' href={'/post'}>
        <BsPlus size={40} />
      </Link>
    </>
  );
};
export default BoardPage;
