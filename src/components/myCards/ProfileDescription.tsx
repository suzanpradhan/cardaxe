import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import { cn } from '@/lib/utils';
import cardsApi from '@/module/cards/cardsApi';
import connectApi from '@/module/connect/connectApi';
import { UserType } from '@/module/user/userType';
import { Flash, Heart, More, MoreCircle, Share } from 'iconsax-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Dialog from '../Dialog';
import QrModal from '../QrModal';
import Description from './Description';

const PROFILE_DETAILS_BUTTONS = [
  <Heart
    key={1}
    size="40"
    variant="Bulk"
    className="rounded-full text-blueTheme hover:shadow-md active:ring-2 active:ring-blueTheme"
  />,
  <Share
    key={2}
    size="40"
    className="rounded-full text-blueTheme hover:shadow-md active:ring-2 active:ring-blueTheme"
    variant="Bold"
  />,
  <MoreCircle
    key={3}
    size="40"
    className="rounded-full text-blueTheme hover:shadow-md active:ring-2 active:ring-blueTheme"
    variant="Bulk"
  />,
];

type ProfileValueType = {
  address: string;
  designation: string;
  company: string;
  bio: string;
};

const ProfileDescription = ({
  values,
  user,
  userProfile,
  isLiked,
  cardId,
  cardSlug,
}: {
  values: ProfileValueType;
  user?: UserType;
  userProfile?: UserType;
  cardId?: number;
  cardSlug?: string;
  isLiked?: boolean;
}) => {
  console.log('userProfile', userProfile);
  const [isConnectedOrRequested, toggleConnectedOrRequested] = useState(false);
  const [isCardLiked, toggleCardLike] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user?.isConnected || user?.isRequested) {
      toggleConnectedOrRequested(true);
    } else {
      toggleConnectedOrRequested(false);
    }
  }, [user?.isConnected, user?.isRequested]);

  useEffect(() => {
    if (isLiked) {
      toggleCardLike(true);
    } else {
      toggleCardLike(false);
    }
  }, [isLiked]);

  const handleLike = (cardId: number, userProfile: UserType) => {
    console.log('likinghere');
    toggleCardLike(true);
    dispatch(
      cardsApi.endpoints.likeCard.initiate({
        card: cardId.toString(),
        user: userProfile.id.toString(),
      })
    );
  };
  const handleDislike = (cardSlug: string) => {
    toggleCardLike(false);
    dispatch(cardsApi.endpoints.dislikeCard.initiate(cardSlug));
  };

  const handleConnect = (toUser: UserType, fromUser: UserType) => {
    dispatch(
      connectApi.endpoints.sendRequest.initiate({
        to_user: {
          fullname: toUser!.fullname,
          email: toUser!.email,
          username: toUser!.username,
        },
        from_user: {
          fullname: fromUser!.fullname,
          email: fromUser!.email,
          username: fromUser!.username,
        },
        accepted: false,
        id: user!.id,
        timestamp: new Date().toISOString(),
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-start gap-4">
        <div className="shrink-0 basis-16 sm:basis-20">
          <div className="relative aspect-square overflow-hidden rounded-full">
            <Image
              src={
                user?.avatar
                  ? user.avatar.startsWith('https')
                    ? user.avatar
                    : `${apiPaths.serverUrl}${user.avatar}`
                  : '/square_image.jpg'
              }
              alt="user_profile_image"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex grow flex-col items-stretch justify-between gap-2">
          <div className="flex flex-col items-start justify-start">
            <h3 className="text-lg font-semibold leading-5 text-zinc-900">
              {user?.fullname}
            </h3>
            <span className="text-normal text-sm text-zinc-400">
              {values?.address} {values?.designation && '|'}{' '}
              {values?.designation} {values?.company && '-'} {values?.company}
            </span>
          </div>
          <div className="flex gap-2">
            {!isConnectedOrRequested &&
            user &&
            userProfile?.username !== user?.username ? (
              <button
                onClick={() =>
                  userProfile
                    ? handleConnect(user, userProfile)
                    : router.push(
                        `/login?callback=${window.location.origin}${pathname}`
                      )
                }
                type="button"
                className="flex h-8 w-48 items-center justify-center gap-1 rounded-full bg-blueTheme text-sm font-medium text-white shadow-md shadow-blueTheme/60"
              >
                <Flash size="21" variant="Bulk" />
                Connect
              </button>
            ) : (
              <></>
            )}
            {user && cardId && cardSlug ? (
              <Dialog
                className="bg-transparent"
                triggerComponent={
                  <div className="flex aspect-square w-8 items-center justify-center rounded-full bg-zinc-100 text-blueTheme">
                    <Share size="23" variant="Bulk" />
                  </div>
                }
              >
                <QrModal username={user.username} slug={cardSlug} />
              </Dialog>
            ) : (
              <></>
            )}
            {user && cardId && cardSlug ? (
              <div className="col-span-5 flex items-center justify-start gap-2">
                <button
                  onClick={() =>
                    userProfile
                      ? !isCardLiked
                        ? handleLike(cardId, userProfile)
                        : handleDislike(cardSlug)
                      : router.push(
                          `/login?callback=${window.location.origin}${pathname}`
                        )
                  }
                  className={cn(
                    'flex aspect-square w-8 items-center justify-center rounded-full bg-zinc-100',
                    isCardLiked ? 'text-blueTheme' : 'text-grayfont'
                  )}
                >
                  <Heart size="21" variant="Bulk" />
                </button>

                <button
                  onClick={() =>
                    userProfile
                      ? handleConnect(user, userProfile)
                      : router.push(
                          `/login?callback=${window.location.origin}${pathname}`
                        )
                  }
                  className="flex aspect-square w-8 items-center justify-center rounded-full bg-zinc-100 text-blueTheme"
                >
                  <More size="21" variant="TwoTone" />
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div>
        <Description text={values?.bio} />
      </div>
    </div>
  );
};

export default ProfileDescription;
