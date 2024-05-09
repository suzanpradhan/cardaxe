import { RootState } from '@/core/redux/store';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import CardLayout from './CardLayout';

const CardTemplate = () => {
  const cardState = useSelector((state: RootState) => state.card);
  return (
    <CardLayout>
      {cardState.card.cardDesign.backgroundImage ? (
        <Image
          src={cardState.card.cardDesign.backgroundImage as string}
          alt="Background Image"
          fill
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, 300px"
          className="rounded-lg -z-10 ov"
        />
      ) : (
        <div
          className="h-full w-full absolute -z-10 rounded-lg"
          style={{ backgroundColor: cardState.card.cardDesign.backgroundColor }}
        ></div>
      )}
      <h1 className="col-span-1 text-xl inline font-bold">
        {cardState.card.cardFields.firstName +
          ' ' +
          cardState.card.cardFields.middleName +
          ' ' +
          cardState.card.cardFields.lastName}
      </h1>
      <div
        id="logo"
        className="col-span-1 col-start-2 h-20 w-20  relative justify-self-end bg-transparent"
      >
        {cardState.card.cardDesign.logoUrl && (
          <Image
            src={cardState.card.cardDesign.logoUrl as string}
            alt="logo"
            fill
            objectFit="contain"
            sizes="(max-width: 768px) 100vw, 300px"
            className="bg-transparent"
          />
        )}
      </div>

      <div className="col-span-2">
        <p>{cardState.card.cardFields.email}</p>
      </div>
      <h2 className="col-span-2 self-end font-bold"></h2>
      <p>{cardState.card.cardDesign.backgroundColor}</p>
    </CardLayout>
  );
};

export default CardTemplate;
