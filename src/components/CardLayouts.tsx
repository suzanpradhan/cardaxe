import { camelToSnake } from '@/core/utils/generalFunctions';
import { ContentFormSchemaType } from '@/module/cards/cardsType';
import Handlebars from 'handlebars';
import parse from 'html-react-parser';

interface VariableValues {
  first_name: string;
}

type HandlebarsTemplateFunction = () => string;

interface CardLayoutProps {
  htmlSource: string;
  variableValues: ContentFormSchemaType;
}

const CardLayouts = ({ htmlSource, variableValues }: CardLayoutProps) => {
  // const snakeCaseVariablesValues = {
  //   ...camelToSnake(variableValues),
  //   logo_url: 'http://localhost:3000/3f74f2d6-3419-4524-8340-fd982623e1d6',
  // };
  const snakeCaseVariablesValues = {
    ...camelToSnake(variableValues),
    logo_url: 'https://source.unsplash.com/1000x700/?architecture',
  };
  Object.entries(snakeCaseVariablesValues).forEach(([variable, value]) => {
    Handlebars.registerHelper(variable, () => value);
  });
  //   const htmlSourceTemp = `<div className="w-full h-56 bg-[#01ff7b] rounded-lg p-4 ">
  //   <div className="relative w-20 h-20 z-10">
  //     <Image
  //       src={{logo_url}}
  //       alt="Background Image"
  //       fill
  //       objectFit="cover"
  //       sizes="(max-width: 768px) 100vw, 300px"
  //       className="rounded-lg -z-10 ov"
  //     />

  //   </div>
  //   <div className="flex justify-between items-stretch mt-4">
  //     <div className="flex flex-col justify-between">
  //       <h2 className="font-semibold">{{first_name}}</h2>
  //       <h3 className="font-extrabold">{{designation}}</h3>
  //     </div>
  //     <div>
  //       <p>{{phone}}</p>
  //       <p>{{email}}</p>
  //       <p>{{website}}</p>
  //     </div>
  //   </div>
  // </div>`;
  const template = Handlebars.compile(
    htmlSource,
    {}
  ) as HandlebarsTemplateFunction;
  const processedHtml = template();

  return <div>{parse(processedHtml)}</div>;
};

export default CardLayouts;
