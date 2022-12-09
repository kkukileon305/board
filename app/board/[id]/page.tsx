import { Comment } from '@prisma/client';
import CommentInput from '../../../components/board/CommentInput';
import CommentItem from '../../../components/board/Comment';
import { urlToTitle } from '../../../lib/categories';
import { getFormattedDate } from '../../../lib/getFormattedDate';
import BoardDelete from '../../../components/board/BoardDelete';

type Board = {
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

const getBoard = async (id: number): Promise<Board> => {
  const res = await fetch(`https://board-nine.vercel.app/api/board?id=${id}`);

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
        <div className='flex justify-between'>
          <p>{board.username}</p>
          <p>{getFormattedDate(new Date(board.createdAt))}</p>
        </div>
      </div>
      <p className='whitespace-pre-line min-h-[calc(100vh-210px)] border-y py-4 bop'>{board.content}</p>
      <div className='flex justify-end items-center py-4 gap-4'>
        <BoardDelete board={board} />
      </div>
      <ul className='mb-[70px] border-t pt-2'>
        {board.comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
      <CommentInput board={board} />
    </>
  );
};
export default BoardDetail;
