import { Board } from '@prisma/client';
import Link from 'next/link';
import { BsPlusCircle } from 'react-icons/bs';
import Debug from '../components/Debug';
import Item from '../components/Item';

const getBoards = async (): Promise<Board[]> => {
  const res = await fetch('http://localhost:3000/api/board');

  return res.json();
};

const HomePage = async () => {
  const boards = await getBoards();

  return (
    <>
      <h2 className='font-bold'>good</h2>
      <ul>
        {boards.map(board => (
          <Item board={board} key={board.id} />
        ))}
      </ul>
      <Debug />
      <Link className='fixed bottom-20 right-20' href={'/post'}>
        <BsPlusCircle size={30} />
      </Link>
    </>
  );
};
export default HomePage;
