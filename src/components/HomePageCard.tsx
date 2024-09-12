import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import { cn } from '@/lib/utils';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import connectApi from '@/module/connect/connectApi';
import { UserType } from '@/module/user/userType';
import { Eye, Flash, Heart, MoreSquare, Share } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
// import profileImage from '../../public/profile/profile.png';
import { useState } from 'react';
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
  const [isConnectionLoading, toggleConnectionLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleConnect = (user: UserType) => {
    toggleConnectionLoading(true);
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
    toggleConnectionLoading(false);
  };

  const handleLike = (cardId: number) => {
    dispatch(
      cardsApi.endpoints.likeCard.initiate({
        card: cardId.toString(),
        user: userProfile.id.toString(),
      })
    );
  };
  const handleDislike = (cardSlug: string) => {
    dispatch(cardsApi.endpoints.dislikeCard.initiate(cardSlug));
  };
  return (
    <div
      key={index}
      className="mx-auto flex w-full min-w-[20rem] max-w-xs flex-col gap-4 border-b border-zinc-100 px-2 py-5 xs:px-0 sm:min-w-[24rem] sm:max-w-sm"
    >
      <section className="flex items-center gap-2">
        <div className="relative z-auto h-8 w-8 rounded-full">
          <Image
            className="rounded-full"
            src={card.user?.avatar ?? '/profile/profile.png'}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="contain"
          />
        </div>
        <Link
          href={'dashboard/account/' + card.user?.username}
          className="grow font-semibold hover:text-blueTheme"
        >
          {card.user?.fullname}
        </Link>
        {card.user?.username !== userProfile.username &&
        !card.user?.isConnected &&
        !card.user?.isRequested ? (
          <button
            className={cn(
              'bg flex items-center gap-1 rounded-sm bg-blueTheme p-1 text-white hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2'
            )}
            onClick={() => card.user?.id && handleConnect(card.user)}
          >
            {isConnectionLoading ? (
              <p className="text-sm">Connecting</p>
            ) : (
              <>
                <Flash size="16" variant={'Bulk'} />{' '}
                <p className="text-sm">Connect</p>
              </>
            )}
          </button>
        ) : (
          <></>
        )}
        <MoreSquare size="24" className="text-zinc-200" />
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
      <section className="flex gap-4">
        <button
          className={cn(
            'flex items-center gap-2 rounded-xl p-1 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2',
            card.isLiked ? 'text-blueTheme' : 'text-zinc-400'
          )}
          onClick={() =>
            card.user?.id &&
            card.id &&
            card.slug &&
            (card.isLiked ? handleDislike(card.slug) : handleLike(card.id))
          }
        >
          <Heart size="24" variant={card.isLiked ? 'Bulk' : 'TwoTone'} />
          <p>{card.likes}</p>
        </button>
        <button className="flex items-center gap-2 rounded-xl p-1 text-zinc-400 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2">
          <Eye size="24" variant="TwoTone" />
          <p>{card.views}</p>
        </button>
        {card.user?.username && card.slug ? (
          <Dialog
            className="bg-transparent"
            triggerComponent={
              <div className="flex items-center gap-2 rounded-xl p-1 text-zinc-400 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2">
                <Share size="24" variant="TwoTone" />
                {/* <p>11.1k</p> */}
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
