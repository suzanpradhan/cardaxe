import TextInput from '@/components/Inputs/TextInput';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import CircleLoader from '@/core/ui/loaders/CircleLoader';
import cardsApi from '@/module/cards/cardsApi';
import { updateCardBasics, validateForms } from '@/module/cards/cardSlice';
import { Magicpen } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import loginCoverImage from '../../../../../../public/banner/login-banner.jpg';

export default function CreateCardPopup({ userId }: { userId: string }) {
  const [createLoading, toggleLoading] = useState<boolean>(false);
  const cardState = useAppSelector((state: RootState) => state.card);

  const router = useRouter();
  const { data: sessionData } = useSession();
  const dispatch = useAppDispatch();

  const hanldeCreateCard = () => {
    toggleLoading(true);
    dispatch(validateForms('cardBasics'));

    if (
      sessionData?.user &&
      Object.keys(cardState.cardBasics.errors).length === 0
    ) {
      dispatch(
        cardsApi.endpoints.createCard.initiate({
          user: sessionData?.user.id,
          title: cardState.cardBasics.values.title ?? '',
        })
      )
        .then((createCardResponse) => {
          Object.prototype.hasOwnProperty.call(createCardResponse, 'data') &&
            (createCardResponse as any).data.slug &&
            router.push(
              `/dashboard/builder/${
                (createCardResponse as any).data.slug
              }/?action=create`
            );
          toggleLoading(false);
        })
        .catch((error) => {
          toggleLoading(false);
          console.log(error);
          throw error;
        });
    }
  };
  return (
    <div className="flex h-110 flex-col rounded-md bg-white">
      <p className="p-4 text-lg font-bold">Create new card</p>
      <div className="relative h-60 w-120">
        <Image
          src={loginCoverImage}
          alt="create card image"
          objectFit="cover"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="mt-2 flex h-10 w-full flex-col items-end bg-white px-4">
        <TextInput
          id={'title'}
          type={'text'}
          rows={1}
          className="flex w-full flex-col bg-white pb-4"
          name={'title'}
          // error={errors[item.zSchemaName as keyof ContentFormSchemaType]}
          label={'Title'}
          required={true}
          value={cardState.cardBasics.values.title ?? ''}
          placeholder={'your card title'}
          onChange={(e) =>
            dispatch(updateCardBasics({ title: e.target.value }))
          }
        />
        <button
          onClick={() => hanldeCreateCard()}
          className="rounded-md bg-blueTheme py-2 text-xs text-white shadow-md shadow-blueTheme/60 lg:w-auto lg:px-3"
        >
          {!createLoading ? (
            <p className="flex items-center justify-center gap-2">
              <Magicpen size="20" variant="Bulk" className="text-white" />
              <span className="hidden lg:block">Go to Builder</span>
            </p>
          ) : (
            <div className="w-full">
              <CircleLoader />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
