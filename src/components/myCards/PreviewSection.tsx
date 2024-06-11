import { useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import {
  CardResponseType,
  CardTemplatesType,
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
} from '@/module/cards/cardsType';
import CardLayouts, { VariableValueType } from '../CardLayouts';
import FormWrapper from '../FormWrapper';
import ProfileDescription from './ProfileDescription';
import ProfileDetails from './ProfileDetails';

const PreviewSection = ({
  card,
  layout,
  cardAction,
}: {
  card: CardResponseType<CardTemplatesType>;
  layout: CardTemplatesType | undefined;
  cardAction: string | null;
}) => {
  const cardState = useAppSelector((state: RootState) => state.card);
  const variableValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType = {
    backgroundColor:
      cardState.cardDesign.values.backgroundColor.length === 0
        ? cardAction === 'update'
          ? card?.cardDesign.backgroundColor
          : card?.cardTemplate.defaultCardDesign.backgroundColor
        : cardState.cardDesign.values.backgroundColor,
    backgroundImage:
      card?.cardDesign?.backgroundImage?.length === 0
        ? card?.cardDesign.backgroundImage
        : cardState.cardDesign.values.backgroundImage,
    bio:
      cardState.cardFields.values.bio?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.bio
          : card?.cardTemplate.defaultCardFields.bio ?? ''
        : cardState.cardFields.values.bio,
    firstName:
      cardState.cardFields.values.firstName.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.firstName
          : card?.cardTemplate.defaultCardFields.firstName
        : cardState.cardFields.values.firstName,
    middleName:
      cardState?.cardFields?.values.middleName?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.middleName
          : card?.cardTemplate.defaultCardFields.middleName ?? ''
        : cardState.cardFields.values.middleName,
    lastName:
      cardState?.cardFields?.values.lastName?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.lastName
          : card?.cardTemplate.defaultCardFields.lastName ?? ''
        : cardState.cardFields.values.lastName,
    email:
      cardState?.cardFields?.values.email?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.email
          : card?.cardTemplate.defaultCardFields.email ?? ''
        : cardState.cardFields.values.email,
    company:
      cardState?.cardFields?.values.company?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.company
          : card?.cardTemplate.defaultCardFields.company ?? ''
        : cardState.cardFields.values.company,
    phone:
      cardState?.cardFields?.values.phone?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.phone
          : card?.cardTemplate.defaultCardFields.phone ?? ''
        : cardState.cardFields.values.phone,
    prefix:
      cardState?.cardFields?.values.prefix?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.prefix
          : card?.cardTemplate.defaultCardFields.prefix ?? ''
        : cardState.cardFields.values.prefix,
    suffix:
      cardState?.cardFields?.values.suffix?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.suffix
          : card?.cardTemplate.defaultCardFields.suffix ?? ''
        : cardState.cardFields.values.suffix,
    department:
      cardState?.cardFields?.values.department?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.department
          : card?.cardTemplate.defaultCardFields.department ?? ''
        : cardState.cardFields.values.department,
    darkMode:
      cardAction === 'update'
        ? cardState?.cardDesign?.values.darkMode ??
          cardState.cardDesign.values.darkMode
        : card?.cardTemplate.defaultCardDesign.darkMode,
    showLogo:
      cardAction === 'update'
        ? card?.cardDesign?.showLogo ?? cardState.cardDesign.values.showLogo
        : card?.cardTemplate.defaultCardDesign.showLogo,
    showSocialIcons:
      cardAction === 'update'
        ? card?.cardDesign?.showSocialIcons ??
          cardState.cardDesign.values.showSocialIcons
        : card?.cardTemplate.defaultCardDesign.showSocialIcons,
    id: card?.id,
    designation:
      cardState?.cardFields?.values.designation?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.designation
          : card?.cardTemplate.defaultCardFields.designation ?? ''
        : cardState.cardFields.values.designation,
    imageUrl:
      cardState.cardDesign.values.logo === undefined ||
      cardState.cardDesign.values.logo?.length === 0
        ? cardAction === 'update'
          ? card?.cardDesign.logo
          : card?.cardTemplate.defaultCardDesign.logo
        : cardState.cardDesign.values.logo,
    website:
      cardState?.cardFields?.values.website?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.website
          : card?.cardTemplate.defaultCardFields.website ?? ''
        : cardState.cardFields.values.website,
  };

  return (
    <FormWrapper className="bg-white mx-auto">
      <div className="flex flex-col">
        {layout?.htmlCode && (
          <CardLayouts
            htmlSource={layout.htmlCode}
            variableValues={variableValues}
          />
        )}
        <ProfileDescription card={variableValues} />
        <ProfileDetails cardValues={variableValues} isTeamComp={false} />
      </div>
    </FormWrapper>
  );
};

export default PreviewSection;
