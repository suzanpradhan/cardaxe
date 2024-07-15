import {
  CardTemplatesType,
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
  InfosFormsUpdateSchemaType,
} from '@/module/cards/cardsType';
import { UserType } from '@/module/user/userType';
import CardLayouts, { VariableValueType } from '../CardLayouts.server';
import FormWrapper from '../FormWrapper';
import ProfileDescription from './ProfileDescription';
import ProfileDetails from './ProfileDetails';

const PreviewSection = ({
  user,
  layout,
  variableValues,
  socialValues,
}: {
  layout: CardTemplatesType | undefined;
  variableValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType;
  socialValues: InfosFormsUpdateSchemaType;
  user?: UserType;
}) => {
  return (
    <FormWrapper className="xs:px-0 mx-auto min-w-[15rem] max-w-lg bg-white px-2">
      <div className="flex flex-col gap-4">
        {layout?.htmlCode && (
          <CardLayouts
            htmlSource={layout.htmlCode}
            variableValues={variableValues}
          />
        )}
        <ProfileDescription variableValues={variableValues} user={user} />
        <ProfileDetails
          cardValues={variableValues}
          isTeamComp={false}
          socialValues={socialValues}
        />
      </div>
    </FormWrapper>
  );
};

export default PreviewSection;
