'use client';

import CardLayouts from '@/components/CardLayouts';
import Dialog from '@/components/Dialog';
import QrModal from '@/components/QrModal';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import { Edit, Eye, Heart, Magicpen, SearchNormal, Share } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CreateCardPopup from './(components)/CreateCardPopup';

const MyCardsPage = () => {
  const router = useRouter();
  // const [showQrModal, setShowQrModal] = useState<boolean>(false);
  // const [showCreateCardModal, setShowCreateCardModal] =
  //   useState<boolean>(false);
  const { data: sessionData } = useSession();
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

  const handleEditCard = (slug: string) => {
    router.push(`/dashboard/builder/${slug}/?action=update`);
  };

  return (
    <div className="flex flex-col">
      <div className="mx-auto w-full max-w-sm px-2 lg:max-w-3xl">
        <h3 className="my-4 text-lg font-bold text-zinc-900">My Cards</h3>
        <div className="my-2 flex h-auto w-full gap-3 lg:flex-nowrap">
          <div className="flex h-auto grow items-center gap-2 rounded-md bg-zinc-100 px-2 ring-blueTheme/20 ring-offset-2 focus-within:ring-2 lg:px-4">
            <SearchNormal size="20" variant="Bulk" className="text-zinc-500" />
            <input
              type="search"
              className="h-10 w-full bg-transparent font-medium text-blueTheme/75 outline-none placeholder:text-zinc-400"
              placeholder="Search"
            />
          </div>
          <Dialog
            triggerComponent={
              <div
                // onClick={() => setShowCreateCardModal(true)}
                className="flex h-10 w-10 items-center justify-center gap-2 rounded-md bg-blueTheme text-xs text-white shadow-md shadow-blueTheme/60 lg:w-auto lg:px-3"
              >
                <Magicpen size="20" variant="Bulk" className="text-white" />
                <span className="hidden lg:block">Create New card</span>
              </div>
            }
          >
            {sessionData?.user ? (
              <CreateCardPopup userId={sessionData.user.id} />
            ) : (
              <></>
            )}
          </Dialog>
        </div>
      </div>
      <div className="mx-auto mb-20 grid w-full max-w-sm grid-cols-6 gap-x-4 gap-y-4 px-2 lg:max-w-3xl">
        {/* <PopUpDialog show={showQrModal} onClose={() => setShowQrModal(false)}>
          
        </PopUpDialog> */}
        {cardsList?.map((card, index) => {
          return (
            <div className="col-span-6 lg:col-span-3" key={index}>
              <div className="mx-auto flex w-full flex-col gap-4 rounded-lg border border-zinc-100 p-4">
                <div onClick={() => handleEditCard(card.slug!)}>
                  <CardLayouts
                    enableShadow
                    htmlSource={card.cardTemplate?.htmlCode}
                    variableValues={{
                      ...card.cardFields,
                      ...card.cardDesign,
                      logoUrl: card.cardDesign.logo
                        ? `${apiPaths.serverUrl}${card.cardDesign.logo}`
                        : undefined,
                      backgroundUrl: card.cardDesign.backgroundImage
                        ? `${apiPaths.serverUrl}${card.cardDesign.backgroundImage}`
                        : undefined,
                    }}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-start gap-2">
                        <h4 className="text-base font-bold text-zinc-800">
                          {card.title}
                        </h4>
                        {index == 0 && (
                          <span className="flex h-4 items-center justify-center rounded-[0.15rem] bg-zinc-300 px-2 text-[0.60rem] font-medium text-zinc-500">
                            Default
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold ${!card.isPublished ? 'text-rose-500' : 'text-green-500'}`}
                      >
                        {!card.isPublished ? 'Inactive' : 'Active'}
                      </span>
                    </div>
                    {/* top-ends */}
                    <div className="flex items-center justify-start gap-4">
                      <div className="flex items-center gap-2 text-zinc-500">
                        <Eye size="24" variant="Bulk" />
                        <span className="text-xs font-medium">
                          {card.views}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500">
                        <Heart size="24" variant="Bulk" />
                        <span className="text-xs font-medium">
                          {card.likes}
                        </span>
                      </div>
                      {/* <div className="flex cursor-pointer items-center gap-2 text-zinc-500 hover:text-blueTheme">
                        <MouseSquare size="24" variant="Bulk" />
                        <span className="text-xs font-medium">242</span>
                      </div> */}
                    </div>
                    {/* middle-ends */}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div
                      className="flex grow cursor-pointer items-center justify-center gap-2 rounded-sm border border-zinc-100 p-1 text-zinc-500 hover:border-blueTheme hover:text-blueTheme"
                      onClick={() => handleEditCard(card.slug!)}
                    >
                      <Edit size="21" variant="Bulk" />{' '}
                      <span className="text-xs font-medium">Edit Card</span>
                    </div>
                    {card.slug && card.user?.username && (
                      <Dialog
                        className="flex grow cursor-pointer items-center justify-center gap-2 rounded-sm border border-zinc-100 p-1 text-zinc-500 hover:border-blueTheme hover:text-blueTheme"
                        dialogClassName="grow"
                        triggerComponent={
                          <>
                            <Share size="21" variant="Bulk" />{' '}
                            <span className="text-xs font-medium">Share</span>
                          </>
                        }
                      >
                        <QrModal
                          slug={
                            card.isDefault ? card.user?.username : card.slug
                          }
                          username={card.user?.username}
                        />
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCardsPage;
