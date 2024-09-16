import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import { cn } from '@/lib/utils';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import connectApi from '@/module/connect/connectApi';
import { UserType } from '@/module/user/userType';
import { Eye, Flash, Heart, Share } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
// import profileImage from '../../public/profile/profile.png';
import { getMinUserName } from '@/core/utils/generalFunctions';
import { useEffect, useState } from 'react';
import CardLayouts from './CardLayouts.server';
import Dialog from './Dialog';
import QrModal from './QrModal';

interface HomePageCardProps {
  index: number;
  card: CardResponseType<CardTemplatesType>;
  userProfile: UserType;
}

export default function HomePageCard({
  index,
  card,
  userProfile,
}: HomePageCardProps) {
  // const [isConnectionLoading, toggleConnectionLoading] = useState(false);
  const [isLiked, toggleLiked] = useState(false);
  const [isConnected, toggleConnected] = useState(false);

  const dispatch = useAppDispatch();

  const handleConnect = (user: UserType) => {
    toggleConnected(true);
    dispatch(
      connectApi.endpoints.sendRequest.initiate({
        to_user: {
          fullname: user.fullname,
          email: user.email,
          username: user.username,
        },
        from_user: {
          fullname: userProfile.fullname,
          email: userProfile.email,
          username: userProfile.username,
        },
        accepted: false,
        id: user.id,
        timestamp: new Date().toISOString(),
      })
    );
  };

  const handleLike = (cardId: number) => {
    toggleLiked(true);
    dispatch(
      cardsApi.endpoints.likeCard.initiate({
        card: cardId.toString(),
        user: userProfile.id.toString(),
      })
    );
  };
  const handleDislike = (cardSlug: string) => {
    toggleLiked(false);

    dispatch(cardsApi.endpoints.dislikeCard.initiate(cardSlug));
  };

  useEffect(() => {
    if (card.user?.isConnected || card.user?.isRequested) {
      toggleConnected(true);
    } else {
      toggleConnected(false);
    }
  }, [card.user?.isConnected, card.user?.isRequested]);

  useEffect(() => {
    if (card.isLiked) {
      toggleLiked(true);
    } else {
      toggleLiked(false);
    }
  }, [card.isLiked]);

  return (
    <div
      key={index}
      className="mx-auto flex w-full min-w-[20rem] max-w-sm flex-col gap-4 border-b border-zinc-100 px-2 py-5 last-of-type:border-b-0 xs:px-0 sm:min-w-[24rem] sm:max-w-sm"
    >
      <section className="flex items-center gap-2">
        <div className="relative z-auto h-8 w-8 overflow-hidden rounded-full">
          {card.user?.avatar ? (
            <Image
              src={card.user?.avatar ?? '/square_image.jpg'}
              alt="image"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              objectFit="cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-blue-700">
              {card.user?.fullname && (
                <h5 className="text-base font-extrabold text-white">
                  {getMinUserName(card.user?.fullname)}
                </h5>
              )}
            </div>
          )}
        </div>
        <Link
          href={'dashboard/account/' + card.user?.username}
          className="grow font-semibold hover:text-blueTheme"
        >
          {card.user?.fullname}
        </Link>
        <div className="flex items-center gap-1">
          {card.user?.username !== userProfile.username && !isConnected ? (
            <button
              className={cn(
                'text-x flex h-8 items-center gap-1 rounded-sm bg-blueTheme px-3 text-white hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2'
              )}
              onClick={() => card.user?.id && handleConnect(card.user)}
            >
              <>
                <Flash size="15" variant={'Bulk'} />{' '}
                <p className="text-sm">Connect</p>
              </>
            </button>
          ) : (
            <></>
          )}
          {/* <More size="30" className="text-zinc-500" /> */}
        </div>
      </section>
      {card.user?.username && card.slug ? (
        <Link href={card.isDefault ? card.user.username : card.slug}>
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
        </Link>
      ) : (
        <></>
      )}
      <section className="flex gap-1">
        <button
          className={cn(
            'flex items-center gap-2 rounded-xl p-1 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2',
            isLiked ? 'text-blueTheme' : 'text-zinc-400'
          )}
          onClick={() =>
            card.user?.id &&
            card.id &&
            card.slug &&
            (isLiked ? handleDislike(card.slug) : handleLike(card.id))
          }
        >
          <Heart size="23" variant={isLiked ? 'Bulk' : 'TwoTone'} />
          <p>{card.likes}</p>
        </button>
        <button className="flex items-center gap-2 rounded-xl p-1 text-zinc-400 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2">
          <Eye size="23" variant="TwoTone" />
          <p>{card.views}</p>
        </button>
        {card.user?.username && card.slug ? (
          <Dialog
            className="bg-transparent"
            triggerComponent={
              <div className="flex items-center gap-2 rounded-xl p-1 text-zinc-400 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2">
                <Share size="23" variant="TwoTone" />
                <p>0</p>
              </div>
            }
          >
            <QrModal username={card.user?.username} slug={card.slug} />
          </Dialog>
        ) : (
          <></>
        )}
        <button className="flex items-center gap-2 rounded-xl p-1 text-zinc-400 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2"></button>

        {/* <div className="flex grow justify-end">
                    <Bookmark
                      variant="TwoTone"
                      size="24"
                      className="text-zinc-300 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2"
                    />
                  </div> */}
      </section>
    </div>
  );
}
