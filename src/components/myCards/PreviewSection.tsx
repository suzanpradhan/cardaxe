import { RootState } from '@/core/redux/store';
import { CardState, CardTemplatesType } from '@/module/cards/cardsType';
import { useSelector } from 'react-redux';
import CardLayouts from '../CardLayouts';
import FormWrapper from '../FormWrapper';
import ProfileDescription from './ProfileDescription';
import ProfileDetails from './ProfileDetails';

const PreviewSection = ({
  card,
  layout,
}: {
  card: CardState<CardTemplatesType | string>;
  layout: CardTemplatesType | undefined;
}) => {
  const cardState = useSelector((state: RootState) => state.card);
  console.log(cardState.cardDesign.values.backgroundImage);
  return (
    <FormWrapper className="bg-white mx-auto">
      <div className="flex flex-col">
        {layout?.htmlCode &&
          (cardState.cardDesign.values.backgroundImage?.length != 0 ? (
            <CardLayouts
              htmlSource={layout.htmlCode}
              variableValues={{
                ...card.cardFields.values,
                ...card.cardDesign.values,
                imageUrl: card.cardDesign.values.backgroundImage,
              }}
            />
          ) : (
            <CardLayouts
              htmlSource={layout.htmlCode}
              variableValues={{
                ...card.cardFields.values,
                ...card.cardDesign.values,
              }}
            />
          ))}
        <ProfileDescription card={card} />
        <ProfileDetails card={card} isTeamComp={false} />
      </div>
    </FormWrapper>
  );
};

export default PreviewSection;
