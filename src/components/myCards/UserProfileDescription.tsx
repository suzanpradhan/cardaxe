import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { getMinUserName } from '@/core/utils/generalFunctions';
import { cn } from '@/lib/utils';
import cardsApi from '@/module/cards/cardsApi';
import connectApi from '@/module/connect/connectApi';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import { UserCheck } from '@phosphor-icons/react';
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

const UserProfileDescription = ({
  values,
  user,
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
  const [isConnectedOrRequested, toggleConnectedOrRequested] = useState(false);
  const [isCardLiked, toggleCardLike] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const authUser = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );

  useEffect(() => {
    dispatch(userApi.endpoints.getUser.initiate());
  }, [dispatch]);

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
  console.log('userProfile', user);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-start gap-4">
        <div className="shrink-0 basis-20">
          <div className="relative block aspect-square overflow-hidden rounded-full">
            {user?.avatar && user.avatar.startsWith('https') ? (
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
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-blue-700">
                {user?.fullname && (
                  <h5 className="text-base font-extrabold text-white">
                    {getMinUserName(user?.fullname)}
                  </h5>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex grow flex-col items-stretch justify-between gap-1">
          <div className="flex flex-col items-start justify-start">
            <h3 className="text-base font-semibold leading-5 text-zinc-900 sm:text-lg">
              {user?.fullname}
            </h3>
            <span className="text-xs font-normal leading-5 tracking-tight text-zinc-500 sm:text-sm">
              {values?.address} {values?.designation && '|'}{' '}
              {values?.designation} {values?.company && '-'} {values?.company}
            </span>
          </div>
          <div className="flex gap-2">
            {user && authUser?.username !== user?.username ? (
              !isConnectedOrRequested ? (
                <button
                  onClick={() =>
                    authUser
                      ? handleConnect(user, authUser)
                      : router.push(
                          `/login?callback=${window.location.origin}${pathname}`
                        )
                  }
                  type="button"
                  className="flex h-8 w-max items-center justify-center gap-2 rounded-full bg-blueTheme px-4 text-sm font-medium text-white shadow-md shadow-blueTheme/60"
                >
                  <Flash size="21" variant="Bulk" />
                  Connect
                </button>
              ) : user?.isConnected ? (
                <button
                  type="button"
                  className="flex h-8 w-max items-center justify-center gap-2 rounded-full bg-componentBgGrey px-4 text-sm font-medium text-slate-600 shadow-md shadow-componentBgGrey/60"
                >
                  <UserCheck size={21} weight="thin" />
                  Connected
                </button>
              ) : (
                <button
                  type="button"
                  className="flex h-8 w-max items-center justify-center gap-2 rounded-full bg-componentBgGrey px-4 text-sm font-medium text-slate-600 shadow-md shadow-componentBgGrey/60"
                >
                  <UserCheck size={21} weight="thin" />
                  Requested
                </button>
              )
            ) : (
              <></>
            )}

            <Dialog
              className="bg-transparent"
              triggerComponent={
                <div className="flex aspect-square w-8 items-center justify-center rounded-full bg-zinc-100 text-blueTheme">
                  <Share size="23" variant="Bulk" />
                </div>
              }
            >
              <QrModal username={user!.username} slug={cardSlug!} />
            </Dialog>
            <div className="col-span-5 flex items-center justify-start gap-2">
              <button
                onClick={() =>
                  authUser
                    ? !isCardLiked
                      ? handleLike(cardId!, authUser)
                      : handleDislike(cardSlug!)
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
                  authUser
                    ? handleConnect(user!, authUser)
                    : router.push(
                        `/login?callback=${window.location.origin}${pathname}`
                      )
                }
                className="flex aspect-square w-8 items-center justify-center rounded-full bg-zinc-100 text-blueTheme"
              >
                <More size="21" variant="TwoTone" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Description text={values?.bio} />
      </div>
    </div>
  );
};

export default UserProfileDescription;
