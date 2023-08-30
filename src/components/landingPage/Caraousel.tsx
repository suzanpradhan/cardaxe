import square_image from '../../../public/square_image.jpg';
import { EffectCoverflow, Navigation, Zoom } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import 'swiper/swiper-bundle.min.css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import ClientsOpinion from './ClientsOpinion';
import { clientOpinion } from '../../app/module';

const Caraousel = () => {
  const params = {
    spaceBetween: 30,
    slidesPerView: 3,
    modules: Zoom,
    Navigation,
    navigation: true,
    zoom: true,
    className: 'w-full my-8',
    on: {},
  };
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={3}
      modules={[Zoom, Navigation, EffectCoverflow]}
      navigation={true}
      zoom={true}
      className="w-full m-8"
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
  );
};

export default Caraousel;
