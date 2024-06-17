import { CardState, CardTemplatesType } from '@/module/cards/cardsType';
import Image from 'next/image';

const CardTemplate = ({
  card,
}: {
  card: CardState<CardTemplatesType | string>;
}) => {
  return (
    <div
      className="w-full h-60 rounded-lg  mx-auto relative "
      // style={{ backgroundColor: card.cardDesign.values.backgroundColor }}
    >
      {card.cardDesign.values.backgroundImage && (
        <Image
          src={card.cardDesign.values.backgroundImage as string}
          alt="Background Image"
          fill
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, 300px"
          className="rounded-lg -z-10 ov"
        />
      )}
      <div className="p-2">
        <h2 className="text-xl inline font-bold">
          {card.cardFields.values.firstName +
            ' ' +
            card.cardFields.values.middleName +
            ' ' +
            card.cardFields.values.lastName}
        </h2>
        <div
          id="logo"
          className="h-20 w-20  relative justify-self-end bg-transparent"
        >
          {card.cardDesign.values.logo && (
            <Image
              src={card.cardDesign.values.logo as string}
              alt="logo"
              fill
              objectFit="contain"
              sizes="(max-width: 768px) 100vw, 300px"
              className="bg-transparent"
            />
          )}
        </div>
        <p>{card.cardFields.values.email}</p>
      </div>
    </div>
  );
};

export default CardTemplate;
