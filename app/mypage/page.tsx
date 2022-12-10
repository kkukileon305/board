'use client';

import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { getFormattedDate } from '../../lib/getFormattedDate';
import useToken from '../../zustand/useToken';

const MyPage = () => {
  const token = useToken(store => store.token);
  const { data, isFetching } = useQuery({
    queryFn: () => axiosInstance.post<User>('/user', { token }),
    queryKey: ['user'],
  });

  if (isFetching) {
    return (
      <div className='mx-auto max-w-[400px] flex flex-col items-center rounded-xl border p-3'>
        <div className='w-[100px] h-[28px] bg-gray-400 rounded-xl my-4' />
        <div className='w-full h-[24px] bg-gray-400 rounded-xl' />
        <div className='w-full h-[24px] bg-gray-400 rounded-xl my-4' />
        <div className='w-full h-[24px] bg-gray-400 rounded-xl mb-4' />
      </div>
    );
  }

  if (!data) {
    return <div>로그인해주세요</div>;
  }

  return (
    <div className='mx-auto max-w-[400px] rounded-xl border p-3'>
      <h2 className='text-center font-bold text-xl my-4'>회원 정보</h2>
      <h2 className='font-bold flex justify-between items-center'>
        <span className='font-light'>닉네임</span>
        {data.data.username}
      </h2>
      <p className='flex justify-between items-center my-4'>
        <span>이메일</span>
        {data.data.email}
      </p>
      <p className='flex justify-between items-center my-4'>
        <span>가입날짜</span>
        {getFormattedDate(new Date(data.data.createdAt))}
      </p>
    </div>
  );
};
export default MyPage;
