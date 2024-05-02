import Handlebars from 'handlebars';
import parse from 'html-react-parser';

interface VariableValues {
  first_name: string;
}

type HandlebarsTemplateFunction = () => string;

interface CardLayoutProps {
  htmlSource: string;
  variableValues: VariableValues;
}

const CardLayouts = ({ htmlSource, variableValues }: CardLayoutProps) => {
  //   const html_code = '<div>{{first_name}}</div>';
  Object.entries(variableValues).forEach(([variable, value]) => {
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
