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
      }
    );
    const response = await res.json();
    const defaultCard = snakeToCamel(response);

    if (defaultCard) {
      return (
        <div className="bg-componentBgGrey -z-20">
          {/* <PreviewSection card={defaultCard} layout={}/> */}
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
