import { camelToSnake } from '@/core/utils/generalFunctions';
import {
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
} from '@/module/cards/cardsType';
import Handlebars from 'handlebars';
import parse from 'html-react-parser';

export interface VariableValueType {
  logoUrl?: string;
  backgroundUrl?: string;
}

type HandlebarsTemplateFunction = () => string;

interface CardLayoutProps {
  enableShadow?: boolean;
  htmlSource: string;
  variableValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType;
}

const CardLayouts = ({
  htmlSource,
  variableValues,
  enableShadow = false,
}: CardLayoutProps) => {
  const snakeCaseVariablesValues = {
    ...camelToSnake(variableValues),
    // logo_url:
    //   variableValues.logoUrl && variableValues.logoUrl.length > 0
    //     ? variableValues.logoUrl
    //     : 'https://source.unsplash.com/1000x700/?logo',
  };
  Handlebars.registerHelper('isNotNull', function (value) {
    return value != null && value != undefined;
  });
  Object.entries(snakeCaseVariablesValues).forEach(([variable, value]) => {
    Handlebars.registerHelper(variable, () => value);
  });

  const template = Handlebars.compile(
    htmlSource,
    {}
  ) as HandlebarsTemplateFunction;

  const processedHtml = template();

  return (
    <div
      className={`w-full flex rounded-md ${
        enableShadow ? 'shadow-grayfont shadow-md ' : ''
      }`}
    >
      {parse(processedHtml)}
    </div>
  );
};

export default CardLayouts;
