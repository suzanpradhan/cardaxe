import React from 'react';
import logo from '../../../public/logo.png';
import Image from 'next/image';
import { RootState } from '@/app/GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

const CARD_DETAILS = {
  cardHolder: 'Adam Smith',
  logo: logo,
  cardNumber: 5065454093,
  email: 'info@websiteurl.com',
  url: 'websiteurl.com',
};

const CardTemplate = () => {
  const cardState = useSelector((state: RootState) => state.card);
  return (
    <div
      style={{ backgroundColor: cardState.designForm.backgroundColor }}
      className={clsx(
        ' h-72 w-130 rounded-lg p-6 grid grid-cols-2 mx-auto relative'
      )}
    >
      {cardState.designForm.backgroundImage && (
        <Image
          src={cardState.designForm.backgroundImage as string}
          alt="Background Image"
          fill
          objectFit="contain"
          sizes="(max-width: 768px) 100vw, 300px"
          className="rounded-lg"
        />
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
      {JSON.stringify(cardState.designForm.logoUrl)}
      <div className="col-span-2">
        <p>{cardState.cardId}</p>
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
