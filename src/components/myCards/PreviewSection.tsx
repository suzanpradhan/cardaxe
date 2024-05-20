import { CardState, CardTemplatesType } from '@/module/cards/cardsType';
import FormWrapper from '../FormWrapper';
import CardTemplate from './CardTemplate';
import MobileDesktopSwitch from './MobileDesktopSwitch';
import ProfileDescription from './ProfileDescription';
import ProfileDetails from './ProfileDetails';

const PreviewSection = ({
  card,
}: {
  card: CardState<CardTemplatesType | string>['card'];
}) => {
  return (
    <div className="basis-1/2">
      <FormWrapper>
        <div className="grid justify-center">
          <MobileDesktopSwitch />
          <div className="object-contain my-4">
            <CardTemplate card={card} />
          </div>
          <ProfileDescription card={card} />
          <ProfileDetails card={card} isTeamComp={false} />
        </div>
      </FormWrapper>
    </div>
  );
};

export default PreviewSection;
