'use client';
import { useAppDispatch } from '@/core/redux/clientStore';
import cardsApi from '@/module/cards/cardsApi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MyCardsPage = () => {
  const router = useRouter();
  const { data } = useSession();
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    if (data?.user) {
      try {
        const response = await Promise.resolve(
          dispatch(cardsApi.endpoints.createCard.initiate(data?.user.id))
        );
        if (Object.prototype.hasOwnProperty.call(response, 'data')) {
          router.push(
            `/dashboard/builder/?cardId=${(response as any).data.id}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    }

    // const submitresponse = dispatch(
    //   cardsApi.endpoints.createCard.initiate('1')
    // );
    // submitresponse
    //   .then((res) => toast.success('Submitted Successfulluy'))
    //   .catch((err) => {
    //     toast.error('Something went wrong');
    //     throw err;
    //   });
    // router.push(`/dashboard/builder/`);
  };
  return (
    <div className="flex gap-2">
      <button onClick={() => handleClick()}>create card</button>
    </div>
  );
};

export default MyCardsPage;
