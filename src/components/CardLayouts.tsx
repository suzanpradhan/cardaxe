import { camelToSnake } from '@/core/utils/generalFunctions';
import {
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
} from '@/module/cards/cardsType';
import Handlebars from 'handlebars';
import parse from 'html-react-parser';

interface VariableValueType {
  imageUrl?: string;
}

type HandlebarsTemplateFunction = () => string;

interface CardLayoutProps {
  htmlSource: string;
  variableValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType;
}

const CardLayouts = ({ htmlSource, variableValues }: CardLayoutProps) => {
  console.log(variableValues);
  const snakeCaseVariablesValues = {
    ...camelToSnake(variableValues),
    // logo_url:
    //   variableValues.logoUrl && variableValues.logoUrl.length > 0
    //     ? variableValues.logoUrl
    //     : 'https://source.unsplash.com/1000x700/?logo',
  };
  Object.entries(snakeCaseVariablesValues).forEach(([variable, value]) => {
    console.log(value);

    Handlebars.registerHelper(variable, () => value);
  });

  const template = Handlebars.compile(
    htmlSource,
    {}
  ) as HandlebarsTemplateFunction;

  const processedHtml = template();
  console.log(processedHtml);

  return <div className="w-full">{parse(processedHtml)}</div>;
};

export default CardLayouts;
