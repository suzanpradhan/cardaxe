import PreviewSection from '@/components/myCards/PreviewSection';
import { apiPaths } from '@/core/api/apiConstants';
import { snakeToCamel } from '@/core/utils/generalFunctions';

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
    console.log('defaultCard', defaultCard);

    const variableValues = {
      ...defaultCard.cardFields,
      ...defaultCard.cardDesign,
      logoUrl: `${apiPaths.serverUrl}${defaultCard.cardDesign.logo}`,
      backgroundUrl: `${apiPaths.serverUrl}${defaultCard.cardDesign.backgroundImage}`,
    };

    const socialsValues = Object.fromEntries(
      defaultCard.cardInfos.map((obj: any) => [
        obj.cardInfo,
        { ...obj, cardInfoId: obj.cardInfo },
      ])
    );

    // const user = defaultCard.,

    if (defaultCard) {
      return (
        <div className="h-screen overflow-y-scroll bg-zinc-100">
          <div className="mx-auto max-w-sm bg-white px-4 py-4 lg:max-w-lg">
            <PreviewSection
              variableValues={variableValues}
              layout={defaultCard.cardTemplate}
              socialValues={socialsValues}
              user={defaultCard.user}
            />
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  } catch (error) {
    console.log(error);
    return <>No default card</>;
  }
};

export default page;
