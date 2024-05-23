import { camelToSnake } from '@/core/utils/generalFunctions';
import {
  ContentFormSchemaType,
  DesignFromSchemaType,
} from '@/module/cards/cardsType';
import Handlebars from 'handlebars';
import parse from 'html-react-parser';

interface VariableValues {
  first_name: string;
}

type HandlebarsTemplateFunction = () => string;

interface CardLayoutProps {
  htmlSource: string;
  variableValues: ContentFormSchemaType & DesignFromSchemaType;
}

const CardLayouts = ({ htmlSource, variableValues }: CardLayoutProps) => {
  const snakeCaseVariablesValues = {
    ...camelToSnake(variableValues),
    logo_url:
      variableValues.logoUrl && variableValues.logoUrl.length > 0
        ? variableValues.logoUrl
        : 'https://source.unsplash.com/1000x700/?logo',
  };
  Object.entries(snakeCaseVariablesValues).forEach(([variable, value]) => {
    Handlebars.registerHelper(variable, () => value);
  });

  const template = Handlebars.compile(
    htmlSource,
    {}
  ) as HandlebarsTemplateFunction;
  const processedHtml = template();

  return <div>{parse(processedHtml)}</div>;
};

export default CardLayouts;
