import React from 'react';
import Image from 'next/image';
import { RootState } from '@/app/GlobalRedux/store';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const CardTemplate = () => {
  const cardState = useSelector((state: RootState) => state.card);
  return (
    <div
      className={clsx(
        '  w-full h-60 rounded-lg p-6 grid grid-cols-2 mx-auto relative bg-transparent 2xl:h-72 2xl:w-130'
      )}
    >
      {cardState.designForm.backgroundImage ? (
        <Image
          src={cardState.designForm.backgroundImage as string}
          alt="Background Image"
          fill
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, 300px"
          className="rounded-lg -z-10 ov"
        />
      ) : (
        <div
          className="h-full w-full absolute -z-10 rounded-lg"
          style={{ backgroundColor: cardState.designForm.backgroundColor }}
        ></div>
      )}
      <h1 className="col-span-1 text-xl inline font-bold">
        {cardState.contentForm.firstName +
          ' ' +
          cardState.contentForm.middleName +
          ' ' +
          cardState.contentForm.lastName}
      </h1>
      <div
        id="logo"
        className="col-span-1 col-start-2 h-20 w-20  relative justify-self-end"
      >
        {cardState.designForm.logoUrl && (
          <Image
            src={cardState.designForm.logoUrl as string}
            alt="logo"
            fill
            objectFit="contain"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        )}
      </div>

      <div className="col-span-2">
        <p>{cardState.infosForm.cardId}</p>
        <p>{cardState.contentForm.email}</p>
      </div>
      <h2 className="col-span-2 self-end font-bold">
        {cardState.infosForm.url}
      </h2>
      <p>{cardState.designForm.backgroundColor}</p>
    </div>
  );
};

export default CardTemplate;
