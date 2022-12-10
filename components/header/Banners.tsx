'use client';

import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const banners = [
  {
    id: 1,
    content: '배너1',
  },
  {
    id: 2,
    content: '배너2',
  },
  {
    id: 3,
    content: '배너3',
  },
  {
    id: 4,
    content: '배너4',
  },
];

const Banners = () => {
  return (
    <Swiper //
      modules={[Navigation, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      className='mt-4 mb-12 rounded-xl overflow-hidden'
      autoplay
      loop
    >
      {banners.map(ban => (
        <SwiperSlide key={ban.id}>
          <div className='h-[300px] flex justify-center items-center font-bold text-2xl text-white bg-blue-300 rounded-xl overflow-hidden'>{ban.content}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banners;
