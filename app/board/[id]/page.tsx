import { Board } from '@prisma/client';
import { urlToTitle } from '../../../lib/categories';

const getBoard = async (id: number): Promise<Board> => {
  const res = await fetch(`http://localhost:3000/api/board?id=${id}`);

  return res.json();
};

const BoardDetail = async ({ params: { id } }: { params: { id: string } }) => {
  const board = await getBoard(Number(id));

  return (
    <>
      <div className='mb-4'>
        <div className='flex items-center gap-4 mb-2'>
          <h2 className='font-bold text-xl'>{board.title}</h2>
          <p className='px-2 rounded-full border'>{urlToTitle(board.categoryName)}</p>
        </div>
        <p>{board.username}</p>
      </div>
      <p className='whitespace-pre-line min-h-[calc(100vh-240px)] border-y py-4 bop'>{board.content}</p>
      <div className='flex justify-end py-4'>
        <button className='font-bold bg-red-400 text-white rounded-full px-4 py-1'>삭제</button>
      </div>
    </>
  );
};
export default BoardDetail;
