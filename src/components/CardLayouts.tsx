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
  htmlSource: string;
  variableValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType;
}

const CardLayouts = ({ htmlSource, variableValues }: CardLayoutProps) => {
  const snakeCaseVariablesValues = {
    ...camelToSnake(variableValues),
    // logo_url:
    //   variableValues.logoUrl && variableValues.logoUrl.length > 0
    //     ? variableValues.logoUrl
    //     : 'https://source.unsplash.com/1000x700/?logo',
  };
  Object.entries(snakeCaseVariablesValues).forEach(([variable, value]) => {
    Handlebars.registerHelper(variable, () => value);
  });

  const template = Handlebars.compile(
    htmlSource,
    {}
  ) as HandlebarsTemplateFunction;

  const processedHtml = template();

  return <div className="max-w-xl mb-4 flex">{parse(processedHtml)}</div>;
};

export default CardLayouts;
