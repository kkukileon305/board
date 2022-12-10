'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
import Item, { BoardWithComment } from '../../components/Item';
import ItemSkeleton from '../../components/ItemSkeleton';
import { axiosInstance } from '../../lib/axios';

type Inputs = {
  search: string;
};

const SearchPage = () => {
  const {
    data: response,
    mutateAsync,
    isLoading,
  } = useMutation({
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
      <form className='flex items-center gap-2 px-4 py-2 border rounded-full' onSubmit={handleSubmit(onSubmit)}>
        <input className='block w-[calc(100%-32px)] bg-transparent' placeholder='검색' type='text' {...register('search', { required: true })} />
        <button>
          <BsSearch size={24} />
        </button>
      </form>
      {isLoading && (
        <>
          <div className='flex justify-center my-4'>
            <div className='h-[28px] w-[100px] bg-gray-400 rounded' />
          </div>
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
        </>
      )}
      {response && (
        <>
          <h2 className='font-bold text-xl text-center my-4 ml-3'>검색결과 ({response.data.length})</h2>
          <ul>
            {response.data.map(board => (
              <Item board={board} key={board.id} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};
export default SearchPage;
