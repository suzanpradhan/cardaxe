import {
  CardTemplatesType,
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
  InfosFormsUpdateSchemaType,
} from '@/module/cards/cardsType';
import CardLayouts, { VariableValueType } from '../CardLayouts';
import FormWrapper from '../FormWrapper';
import ProfileDescription from './ProfileDescription';
import ProfileDetails from './ProfileDetails';

const PreviewSection = ({
  layout,
  variableValues,
  socialValues,
}: {
  layout: CardTemplatesType | undefined;
  variableValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType;
  socialValues: InfosFormsUpdateSchemaType;
}) => {
  return (
    <FormWrapper className="bg-white mx-auto">
      <div className="flex flex-col">
        {layout?.htmlCode && (
          <CardLayouts
            htmlSource={layout.htmlCode}
            variableValues={variableValues}
          />
        )}
        <ProfileDescription variableValues={variableValues} />
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
