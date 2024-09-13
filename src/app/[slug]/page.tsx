import PreviewSection from '@/components/myCards/PreviewSection';
import { apiPaths } from '@/core/api/apiConstants';
import { authOptions } from '@/core/utils/authOptions';
import { snakeToCamel } from '@/core/utils/generalFunctions';
import { UserType } from '@/module/user/userType';
import { getServerSession } from 'next-auth';

const page = async (props: any) => {
  const slug = props.params.slug;
  // const card = props.params.slugs[1];

  let cardInfo;
  let userProfile;
  const cardUrl = `${apiPaths.baseUrl}${apiPaths.cardsUrl}${slug}/`;
  const profileUrl = `${apiPaths.baseUrl}${apiPaths.profileUrl}`;

  try {
    const session = await getServerSession(authOptions);

    console.log('session', session);

    if (session) {
      const res = await fetch(cardUrl, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${session.user?.token}`,
        },
        cache: 'no-store',
      });
      const response = await res.json();

      console.log('response', response);

      cardInfo = snakeToCamel(response);
    } else {
      const res = await fetch(cardUrl, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        cache: 'no-store',
      });
      const response = await res.json();

      console.log('response', response);

      cardInfo = snakeToCamel(response);
    }
  } catch (err) {
    throw Error(err as string);
  }

  try {
    const session = await getServerSession(authOptions);

    if (session) {
      const res = await fetch(profileUrl, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${session.user?.token}`,
        },
        cache: 'no-store',
      });
      const response = await res.json();

      userProfile = snakeToCamel(response) as UserType;

      console.log('userProfile', userProfile);
    }
  } catch (err) {
    throw Error(err as string);
  }

  if ((cardInfo as any).detail) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Not found
      </div>
    );
  }

  const variableValues = {
    ...cardInfo.cardFields,
    ...cardInfo.cardDesign,
    slug: cardInfo.slug,
    id: cardInfo.id,
    logoUrl: `${apiPaths.serverUrl}${cardInfo.cardDesign?.logo}`,
    backgroundUrl: `${apiPaths.serverUrl}${cardInfo.cardDesign?.backgroundImage}`,
  };

  const socialsValues = Object.fromEntries(
    cardInfo.cardInfos?.map((obj: any) => [
      obj.cardInfo,
      { ...obj, cardInfoId: obj.cardInfo },
    ])
  );

  console.log('cardInfo', cardInfo);
  return (
    <div className="h-screen overflow-y-scroll bg-zinc-100">
      <div className="mx-auto max-w-sm bg-white px-4 py-4 lg:max-w-lg">
        <PreviewSection
          variableValues={variableValues}
          layout={cardInfo?.cardTemplate.id}
          socialValues={socialsValues}
          user={cardInfo?.user}
          isLiked={cardInfo.isLiked}
          userProfile={userProfile}
        />
      </div>
    </div>
  );
};

export default page;
