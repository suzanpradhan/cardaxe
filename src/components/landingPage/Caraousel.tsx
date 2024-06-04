'use client';

import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import 'swiper/css';
import { EffectCoverflow, Navigation, Zoom } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import square_image from '../../../public/square_image.jpg';
// import 'swiper/swiper-bundle.min.css';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import { clientOpinion } from '../../app/module';
import ClientsOpinion from './ClientsOpinion';

const Caraousel = () => {
  const [isBeginning, toggleIsBeginning] = useState<boolean>(true);
  const [isEnd, toggleIsEnd] = useState<boolean>(false);
  const swiperRef = useRef<SwiperRef | null>(null);

  const breakpoints = {
    // when window width is >= 320px
    200: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2.25,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 3.25,
      spaceBetween: 25,
    },
  };

  return (
    <div className="relative w-full">
      <div className="text-black md:flex gap-4 absolute hidden right-0 ">
        <button
          // disabled={swiperRef.current?.swiper.isBeginning}
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className={clsx(
            'p-1 border-2 border-black rounded-full disabled:border-gray-500 disabled:text-red-500'
          )}
        >
          <GrFormPrevious />
        </button>
        <button
          // disabled={swiperRef.current?.swiper.isEnd}
          className="p-1 border-2 border-black rounded-full disabled:border-gray-500 disabled:text-red-500"
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <GrFormNext />
        </button>
      </div>
      <Swiper
        modules={[Zoom, Navigation, EffectCoverflow]}
        navigation={false}
        zoom={true}
        breakpoints={breakpoints}
        className="w-full m-8 mt-12"
        ref={swiperRef}
        onSlideChange={() => {
          // swiperRef.current &&
          //   toggleIsBeginning(swiperRef.current?.swiper.isBeginning);
          // swiperRef.current && toggleIsEnd(swiperRef.current?.swiper.isEnd);
          // if (!swiperRef.current?.swiper.isBeginning) {
          //   toggleIsBeginning(false);
          // } else if (!swiperRef.current?.swiper.isEnd) {
          //   toggleIsEnd(false);
          // } else {
          //   toggleIsBeginning(true);
          //   toggleIsEnd(true);
          // }
        }}
      >
        {clientOpinion.map((opinion, index) => (
          <SwiperSlide key={index} zoom={true}>
            <ClientsOpinion
              clientName={opinion.name}
              clientPosition={opinion.position}
              isSelected={false}
              clientPic={square_image}
              clientView={opinion.opinion}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Caraousel;
