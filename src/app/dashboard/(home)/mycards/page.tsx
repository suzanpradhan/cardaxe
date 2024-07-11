'use client';

import CardLayouts from '@/components/CardLayouts.server';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
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
  const [createLoading, toggleLoading] = useState(false);
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

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 sm:col-start-2 sm:col-span-10 xl:col-start-3 xl:col-span-8 px-2 sm:px-0">
        <h3 className="text-lg font-bold text-zinc-900 my-4">My Cards</h3>
        <div className="flex flex-wrap lg:flex-nowrap w-full gap-3 h-auto my-2">
          <div className="grow flex items-center gap-2 h-auto bg-zinc-100 rounded-md px-2 md:px-4 focus-within:ring-2 ring-offset-2 ring-blueTheme/20">
            <SearchNormal size="20" variant="Bulk" className="text-zinc-500" />
            <input
              type="search"
              className="h-10 w-full bg-transparent outline-none text-blueTheme/75 font-medium placeholder:text-zinc-400"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => hanldeCreateCard()}
              className="w-10 lg:w-auto h-10 bg-teal-500 rounded-md shadow-md shadow-teal-200 text-white text-xs lg:px-3"
            >
              <p className="flex items-center justify-center gap-2">
                <Eye size="20" variant="Bulk" className="text-white" />
                <span className="hidden lg:block">Preview</span>
              </p>
            </button>
            <button
              onClick={() => hanldeCreateCard()}
              className="w-10 lg:w-auto h-10 bg-blueTheme rounded-md shadow-md shadow-blueTheme/60 text-white text-xs lg:px-3"
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
      <div className="col-span-12 sm:col-start-2 sm:col-span-10 xl:col-start-3 xl:col-span-8 grid grid-cols-6 gap-x-4 gap-y-4 px-2 sm:px-0">
        {cardsList?.map((card, index) => {
          // console.log(card.cardTemplate.htmlCode);
          return (
            card.id && (
              <div className="col-span-6 md:col-span-3" key={index}>
                <div
                  className="w-full mx-auto flex flex-col gap-4 border border-zinc-100 p-4 rounded-lg"
                  onClick={() => handleEditCard(card.id!)}
                >
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

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start gap-2">
                          <h4 className="text-base font-bold text-zinc-800">
                            Personal
                          </h4>
                          {index == 0 && (
                            <span className="flex items-center justify-center px-2 h-4 text-[0.60rem] text-zinc-500 font-medium bg-zinc-300 rounded-[0.15rem]">
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
                        <div className="flex items-center gap-2">
                          <Eye
                            size="24"
                            variant="Bulk"
                            className="text-zinc-500"
                          />
                          <span className="text-xs font-medium text-zinc-500">
                            242
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Share
                            size="24"
                            variant="Bulk"
                            className="text-zinc-500"
                          />
                          <span className="text-xs font-medium text-zinc-500">
                            242
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MouseSquare
                            size="24"
                            variant="Bulk"
                            className="text-zinc-500"
                          />
                          <span className="text-xs font-medium text-zinc-500">
                            242
                          </span>
                        </div>
                      </div>
                      {/* middle-ends */}
                    </div>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="grow flex items-center justify-center gap-2 p-1 border border-zinc-100 rounded-sm">
                        <Edit
                          size="21"
                          variant="Bulk"
                          className="text-zinc-600"
                        />{' '}
                        <span className="text-xs font-medium text-zinc-500">
                          Edit Card
                        </span>
                      </div>
                      <div className="grow flex items-center justify-center gap-2 p-1 border border-zinc-100 rounded-sm">
                        <BoxAdd
                          size="21"
                          variant="Bulk"
                          className="text-zinc-600"
                        />{' '}
                        <span className="text-xs font-medium text-zinc-500">
                          Add Infos
                        </span>
                      </div>
                      <div className="grow flex items-center justify-center gap-2 p-1 border border-zinc-100 rounded-sm">
                        <Scanning
                          size="21"
                          variant="Bulk"
                          className="text-zinc-600"
                        />{' '}
                        <span className="text-xs font-medium text-zinc-500">
                          Show QR
                        </span>
                      </div>
                      <div className="grow flex items-center justify-center gap-2 p-1 border border-zinc-100 rounded-sm">
                        <Share
                          size="21"
                          variant="Bulk"
                          className="text-zinc-600"
                        />{' '}
                        <span className="text-xs font-medium text-zinc-500">
                          Share
                        </span>
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
