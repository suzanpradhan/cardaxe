import PreviewSection from '@/components/myCards/PreviewSection';
import { apiPaths } from '@/core/api/apiConstants';
import { snakeToCamel } from '@/core/utils/generalFunctions';
import { notFound } from 'next/navigation';

const page = async (props: any) => {
  const userId = props.params.userId;

  try {
    const res = await fetch(
      `${apiPaths.baseUrl}${apiPaths.getDefaultCardUrl}${userId}/`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        cache: 'no-store',
      }
    );
    const response = await res.json();
    const defaultCard = snakeToCamel(response);

    const variableValues = {
      ...defaultCard.cardFields,
      ...defaultCard.cardDesign,
      logoUrl: `${apiPaths.serverUrl}${defaultCard.cardDesign.logo}`,
      backgroundUrl: `${apiPaths.serverUrl}${defaultCard.cardDesign.backgroundImage}`,
    };

    if (defaultCard) {
      return (
        <div className="bg-componentBgGrey -z-20 ">
          <div className="max-w-xl mx-auto">
            <PreviewSection
              variableValues={variableValues}
              layout={defaultCard.cardTemplate}
            />
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  } catch (error) {
    console.log(error);
    return notFound();
  }
};

export default page;
