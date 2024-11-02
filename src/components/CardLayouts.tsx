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
  };

  Object.entries(snakeCaseVariablesValues).forEach(([variable, value]) => {
    Handlebars.registerHelper(variable, () => value);
  });

  const template = Handlebars.compile(htmlSource);

  const processedHtml = template(snakeCaseVariablesValues);

  return (
    <div
      className={`w-full cursor-pointer overflow-hidden rounded-sm shadow-lg shadow-black/5`}
    >
      {parse(processedHtml)}
    </div>
  );
};

export default CardLayouts;
