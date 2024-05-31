import { CardState, CardTemplatesType } from '@/module/cards/cardsType';
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
  return (
    <FormWrapper className="bg-white w-fit mx-auto">
      <div className="grid justify-center ">
        {/* <MobileDesktopSwitch /> */}
        <div className="object-contain my-4">
          {layout?.htmlCode && (
            <CardLayouts
              htmlSource={layout.htmlCode}
              variableValues={{
                ...card.cardFields.values,
                ...card.cardDesign.values,
              }}
            />
          )}
          {/* <CardTemplate card={card} /> */}
        </div>
        <ProfileDescription card={card} />
        <ProfileDetails card={card} isTeamComp={false} />
      </div>
    </FormWrapper>
  );
};

export default PreviewSection;
