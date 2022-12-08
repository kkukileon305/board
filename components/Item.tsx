import { Board } from '@prisma/client';

const Item = ({ board }: { board: Board }) => {
  return (
    <li className='py-2 my-2'>
      <div className='flex items-center gap-4'>
        <h2 className='font-bold text-xl'>{board.title}</h2>
        <p className='px-2 rounded-full border'>{board.categoryName}</p>
      </div>
      <p>{board.username}</p>
    </li>
  );
};
export default Item;
