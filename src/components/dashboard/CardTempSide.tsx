import Image from 'next/image';
import rift_logo from '../../../public/facebook_image.png';

const CardTempSide = () => {
  return (
    <div className="w-full h-56 bg-[#01ff7b] rounded-lg p-4 ">
      <div className="relative w-20 h-20 z-10">
        <Image
          src={rift_logo}
          alt="Background Image"
          fill
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, 300px"
          className="rounded-lg -z-10 ov"
        />
      </div>
      <div className="flex justify-between items-stretch mt-4">
        <div className="flex flex-col justify-between">
          <h2 className="font-semibold">John Archlend</h2>
          <h3 className="font-extrabold">Head Manager</h3>
        </div>
        <div>
          <p>+ 31 181 377 377</p>
          <p>info@roft.ru</p>
          <p>Roft.ru</p>
        </div>
      </div>
    </div>
  );
};

export default CardTempSide;
