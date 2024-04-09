import React from 'react';
import Image from 'next/image';
import image1 from '../../../../../public/staticImages/1.jpg';
import { ArrowLeft2, Flash } from 'iconsax-react';
import ButtonRounded from '@/components/ButtonRounded';

const USER_DETAILS = [
  {
    type: 'Connections',
    number: '634',
  },
  {
    type: 'Followers',
    number: '1.5k',
  },
  {
    type: 'Following',
    number: '256',
  },
];

const BUTTONS = ['Follow', 'Share'];

const BUTTON_LABEL = (
  <div>
    <Flash size="32" color="#FF8A65" />
    <span>Connect</span>
  </div>
);

const page = () => {
  return (
    <div className="grid gap-4">
      <p className="px-4 pb-2 border-b-1 border-borderMain">
        <ArrowLeft2 size={16} className="inline font-semibold" /> Eugene Cheng
      </p>
      <div className="px-4 grid gap-4">
        <div>
          <div className="flex gap-5 items-center">
            <div className="relative w-20 h-20 rounded-full">
              <Image
                src={image1}
                alt="image"
                fill
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 300px"
                className="rounded-full"
              />
            </div>
            <div className="grow grid gap-2">
              <div className="flex justify-between">
                {USER_DETAILS.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <strong className="text-lg-mobile">{item.number}</strong>
                    <p className="text-base-mobile text-grayfont">
                      {item.type}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-around">
                {BUTTONS.map((button, index) => (
                  <button
                    key={index}
                    className="py-1 px-6 text-blueTheme bg-componentBgGrey rounded-full"
                  >
                    {button}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="">Eugene Cheng</h2>
          <p>Istambul, Trukey | Creative Director - Compelling</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, natus saepe. Asperiores nesciunt.
          </p>
          <div>
            <ButtonRounded label={BUTTON_LABEL} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
