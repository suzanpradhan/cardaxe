import { CardState, CardTemplatesType } from '@/module/cards/cardsType';
import Image from 'next/image';

const CardTemplate = ({
  card,
}: {
  card: CardState<CardTemplatesType | string>['card'];
}) => {
  return (
    <div
      className="w-full h-60 rounded-lg  mx-auto relative "
      style={{ backgroundColor: card.cardDesign.backgroundColor }}
    >
      {card.cardDesign.backgroundImage && (
        <Image
          src={card.cardDesign.backgroundImage as string}
          alt="Background Image"
          fill
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, 300px"
          className="rounded-lg -z-10 ov"
        />
      )}
      <div className="p-2">
        <h2 className="text-xl inline font-bold">
          {card.cardFields.firstName +
            ' ' +
            card.cardFields.middleName +
            ' ' +
            card.cardFields.lastName}
        </h2>
        <div
          id="logo"
          className="h-20 w-20  relative justify-self-end bg-transparent"
        >
          {card.cardDesign.logoUrl && (
            <Image
              src={card.cardDesign.logoUrl as string}
              alt="logo"
              fill
              objectFit="contain"
              sizes="(max-width: 768px) 100vw, 300px"
              className="bg-transparent"
            />
          )}
        </div>
        <p>{card.cardFields.email}</p>
      </div>
    </div>
  );
};

export default CardTemplate;
