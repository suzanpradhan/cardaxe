import PreviewSection from '@/components/myCards/PreviewSection';
import { apiPaths } from '@/core/api/apiConstants';
import { snakeToCamel } from '@/core/utils/generalFunctions';

const page = async (props: any) => {
  const slug = props.params.slug;
  // const card = props.params.slugs[1];

  let cardInfo;
  const cardUrl = `${apiPaths.baseUrl}${apiPaths.cardsUrl}${slug}/`;

  try {
    const res = await fetch(cardUrl, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      cache: 'no-store',
    });
    const response = await res.json();

    cardInfo = snakeToCamel(response);
  } catch (err) {
    throw Error(err as string);
  }

  console.log('template number ', cardInfo);

  if ((cardInfo as any).detail) {
    return <>Not found</>;
  }

  const variableValues = {
    ...cardInfo.cardFields,
    ...cardInfo.cardDesign,
    logoUrl: `${apiPaths.serverUrl}${cardInfo.cardDesign?.logo}`,
    backgroundUrl: `${apiPaths.serverUrl}${cardInfo.cardDesign?.backgroundImage}`,
  };

  const socialsValues = Object.fromEntries(
    cardInfo.cardInfos?.map((obj: any) => [
      obj.cardInfo,
      { ...obj, cardInfoId: obj.cardInfo },
    ])
  );
  return (
    <div className="h-screen overflow-y-scroll bg-zinc-100">
      <div className="mx-auto max-w-sm bg-white px-4 py-4 lg:max-w-lg">
        <PreviewSection
          variableValues={variableValues}
          layout={cardInfo?.cardTemplate.id}
          socialValues={socialsValues}
          user={cardInfo?.user}
        />
      </div>
    </div>
  );
};

export default page;
