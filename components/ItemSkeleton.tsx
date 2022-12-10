'use client';

const ItemSkeleton = () => {
  return (
    <div className='h-[86px] my-2 p-3 border rounded-xl'>
      <div className='mb-2 flex gap-4 items-center'>
        <div className='w-[100px] h-[30px] bg-gray-400 rounded' />
        <div className='w-[50px] h-[28px] bg-gray-400 rounded' />
      </div>
      <div className='w-[70px] h-[24px] bg-gray-400 rounded' />
    </div>
  );
};
export default ItemSkeleton;
