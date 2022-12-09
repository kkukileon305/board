'use client';

import { Board } from '@prisma/client';
import Link from 'next/link';
import { BsPlusCircle, BsThreeDots } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import Item from '../components/Item';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const getBoards = async (pageParam = 1): Promise<Board[]> => {
  const res = await fetch(`http://localhost:3000/api/board?skip=${pageParam}`);
  return res.json();
};

const HomePage = () => {
  const { boardsInfinite, hasNextPage, setSpinnerElement } = useInfiniteScroll({
    fetcher: getBoards,
    key: 'mainlist',
  });

  if (!boardsInfinite) {
    return (
      <div className='flex justify-center py-4 my-2'>
        <ImSpinner2 className='animate-spin' size={30} />
      </div>
    );
  }

  return (
    <>
      <h2 className='font-bold text-2xl mb-4'>전체글보기</h2>
      <ul>{boardsInfinite.pages.flatMap(boards => boards.map(board => <Item board={board} key={board.id} />))}</ul>
      {hasNextPage ? (
        <div ref={setSpinnerElement} className='flex justify-center py-4 my-2'>
          <ImSpinner2 className='animate-spin' size={30} />
        </div>
      ) : (
        <div className='flex justify-center py-4 my-2'>
          <BsThreeDots size={30} />
        </div>
      )}
      <Link className='fixed bottom-4 right-4' href={'/post'}>
        <BsPlusCircle size={30} />
      </Link>
    </>
  );
};
export default HomePage;
