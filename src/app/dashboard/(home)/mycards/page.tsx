'use client';

import CardLayouts from '@/components/CardLayouts.server';
import QrModal from '@/components/QrModal';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import PopUpDialog from '@/core/ui/components/PopUpDialog';
import CircleLoader from '@/core/ui/loaders/CircleLoader';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import {
  BoxAdd,
  Edit,
  Eye,
  Magicpen,
  MouseSquare,
  Scanning,
  SearchNormal,
  Share,
} from 'iconsax-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyCardsPage = () => {
  const router = useRouter();
  const [createLoading, toggleLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cardsApi.endpoints.getMyCards.initiate());
  }, [dispatch]);

  const cardsList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getMyCards']?.data as Array<
        CardResponseType<CardTemplatesType>
      >
  );

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const hanldeCreateCard = () => {
    toggleLoading(true);

    if (data?.user) {
      dispatch(cardsApi.endpoints.createCard.initiate(data?.user.id))
        .then((createCardResponse) => {
          Object.prototype.hasOwnProperty.call(createCardResponse, 'data') &&
            (createCardResponse as any).data.id &&
            router.push(
              `/dashboard/builder/?cardId=${
                (createCardResponse as any).data.id
              }&action=create`
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

  const handleEditCard = (cardId: number) => {
    router.push(`/dashboard/builder/?cardId=${cardId}&action=update`);
  };

  console.log('cardsList', cardsList);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 px-2 sm:col-span-10 sm:col-start-2 sm:px-0 xl:col-span-8 xl:col-start-3">
        <h3 className="my-4 text-lg font-bold text-zinc-900">My Cards</h3>
        <div className="my-2 flex h-auto w-full flex-wrap gap-3 lg:flex-nowrap">
          <div className="flex h-auto grow items-center gap-2 rounded-md bg-zinc-100 px-2 ring-blueTheme/20 ring-offset-2 focus-within:ring-2 md:px-4">
            <SearchNormal size="20" variant="Bulk" className="text-zinc-500" />
            <input
              type="search"
              className="h-10 w-full bg-transparent font-medium text-blueTheme/75 outline-none placeholder:text-zinc-400"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => hanldeCreateCard()}
              className="h-10 w-10 rounded-md bg-blueTheme text-xs text-white shadow-md shadow-blueTheme/60 lg:w-auto lg:px-3"
            >
              <p className="flex items-center justify-center gap-2">
                {createLoading ? (
                  <CircleLoader />
                ) : (
                  <Magicpen size="20" variant="Bulk" className="text-white" />
                )}
                <span className="hidden lg:block">Create New card</span>
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-12 mb-5 grid grid-cols-6 gap-x-4 gap-y-4 px-2 sm:col-span-10 sm:col-start-2 sm:px-0 xl:col-span-8 xl:col-start-3">
        <PopUpDialog show={showModal} onClose={handleCloseModal}>
          <QrModal />
        </PopUpDialog>
        {cardsList?.map((card, index) => {
          return (
            card.id && (
              <div className="col-span-6 lg:col-span-3" key={index}>
                <div className="mx-auto flex w-full flex-col gap-4 rounded-lg border border-zinc-100 p-4">
                  <div onClick={() => handleEditCard(card.id!)}>
                    <CardLayouts
                      enableShadow
                      htmlSource={card.cardTemplate?.htmlCode}
                      variableValues={{
                        ...card.cardFields,
                        ...card.cardDesign,
                        logoUrl: card.cardDesign.logo
                          ? `${apiPaths.serverUrl}${card.cardDesign.logo}`
                          : undefined,
                        backgroundUrl: `${apiPaths.serverUrl}${card.cardDesign.backgroundImage}`,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start gap-2">
                          <h4 className="text-base font-bold text-zinc-800">
                            Personal
                          </h4>
                          {index == 0 && (
                            <span className="flex h-4 items-center justify-center rounded-[0.15rem] bg-zinc-300 px-2 text-[0.60rem] font-medium text-zinc-500">
                              Default
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-xs font-semibold ${index == 2 || index == 6 ? 'text-rose-500' : 'text-green-500'}`}
                        >
                          {index == 2 || index == 6 ? 'Inactive' : 'Active'}
                        </span>
                      </div>
                      {/* top-ends */}
                      <div className="flex items-center justify-start gap-4">
                        <div className="flex cursor-pointer items-center gap-2 text-zinc-500 hover:text-blueTheme">
                          <Eye size="24" variant="Bulk" />
                          <span className="text-xs font-medium">242</span>
                        </div>
                        <div className="flex cursor-pointer items-center gap-2 text-zinc-500 hover:text-blueTheme">
                          <Share size="24" variant="Bulk" />
                          <span className="text-xs font-medium">242</span>
                        </div>
                        <div className="flex cursor-pointer items-center gap-2 text-zinc-500 hover:text-blueTheme">
                          <MouseSquare size="24" variant="Bulk" />
                          <span className="text-xs font-medium">242</span>
                        </div>
                      </div>
                      {/* middle-ends */}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div
                        className="flex grow cursor-pointer items-center justify-center gap-2 rounded-sm border border-zinc-100 p-1 text-zinc-500 hover:text-blueTheme"
                        onClick={() => handleEditCard(card.id!)}
                      >
                        <Edit size="21" variant="Bulk" />{' '}
                        <span className="text-xs font-medium">Edit Card</span>
                      </div>
                      <div className="flex grow cursor-pointer items-center justify-center gap-2 rounded-sm border border-zinc-100 p-1 text-zinc-500 hover:text-blueTheme">
                        <BoxAdd size="21" variant="Bulk" />{' '}
                        <span className="text-xs font-medium">Add Infos</span>
                      </div>
                      <div
                        className="flex grow cursor-pointer items-center justify-center gap-2 rounded-sm border border-zinc-100 p-1 text-zinc-500 hover:text-blueTheme"
                        onClick={handleOpenModal}
                      >
                        <Scanning size="21" variant="Bulk" />{' '}
                        <span className="text-xs font-medium">Show QR</span>
                      </div>
                      <div className="flex grow cursor-pointer items-center justify-center gap-2 rounded-sm border border-zinc-100 p-1 text-zinc-500 hover:text-blueTheme">
                        <Share size="21" variant="Bulk" />{' '}
                        <span className="text-xs font-medium">Share</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default MyCardsPage;
