'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
import Item, { BoardWithComment } from '../../components/Item';
import { axiosInstance } from '../../lib/axios';

type Inputs = {
  search: string;
};

const SearchPage = () => {
  const { data: response, mutateAsync } = useMutation({
    mutationFn: (value: string) => axiosInstance.get<BoardWithComment[]>(`/board?q=${value}`),
    mutationKey: ['search'],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (inputs: Inputs) => {
    mutateAsync(inputs.search);
  };

  return (
    <>
      <form className='flex items-center gap-2' onSubmit={handleSubmit(onSubmit)}>
        <input className='block w-[calc(100%-32px)] px-4 py-1 border rounded-full bg-transparent' placeholder='검색' type='text' {...register('search', { required: true })} />
        <button>
          <BsSearch size={24} />
        </button>
      </form>
      {response ? (
        <>
          <h2 className='font-bold text-xl text-center my-4 ml-3'>검색결과 ({response.data.length})</h2>
          <ul>
            {response.data.map(board => (
              <Item board={board} key={board.id} />
            ))}
          </ul>
        </>
      ) : (
        <h2 className='font-bold text-xl text-center my-4'>검색해주세요</h2>
      )}
    </>
  );
};
export default SearchPage;
