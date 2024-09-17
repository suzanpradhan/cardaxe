import HomeCardTemplate from '@/components/dashboard/HomeCardTemplate';
import Dialog from '@/components/Dialog';
import QrModal from '@/components/QrModal';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { cn } from '@/lib/utils';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import { PenAdd, ScanBarcode, Share } from 'iconsax-react';
import Link from 'next/link';
import { useEffect } from 'react';

const ICONS_COMMON_CLASS: string = 'p-3 rounded-full h-12 w-12 hover:shadow-lg';

export default function HomePageAside({ userName }: { userName: string }) {
  const dispatch = useAppDispatch();

  const defaultCard = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCard-${userName}`]
        ?.data as CardResponseType<CardTemplatesType>
  );

  useEffect(() => {
    if (userName) dispatch(cardsApi.endpoints.getCard.initiate(userName));
  }, [dispatch, userName]);

  console.log('defaultCard', defaultCard);
  if (defaultCard) {
    return (
      <>
        <h2 className="font-bold">My Card</h2>
        <Link href={'/dashboard/account/me'}>
          <HomeCardTemplate userName={userName} />
        </Link>
        <div className="flex gap-2">
          <Link
            href={`dashboard/builder?slug=${defaultCard.slug}&action=update`}
          >
            <PenAdd
              size="32"
              variant="Bulk"
              key={0}
              className={cn('bg-[#d3f4df] text-[#23c562]', ICONS_COMMON_CLASS)}
            />
          </Link>
          {defaultCard.user?.username && defaultCard.slug && (
            <Dialog
              className="bg-transparent"
              triggerComponent={
                <Share
                  size="32"
                  variant="Bulk"
                  key={3}
                  className={cn(
                    'bg-[#d5e3ff] text-[#2f73fe]',
                    ICONS_COMMON_CLASS
                  )}
                />
              }
            >
              <QrModal
                username={defaultCard.user?.username ?? ''}
                slug={defaultCard.user?.username}
              />
            </Dialog>
          )}
          {defaultCard.user?.username && defaultCard.slug && (
            <Dialog
              className="bg-transparent"
              triggerComponent={
                <ScanBarcode
                  size="32"
                  variant="Bulk"
                  key={2}
                  className={cn(
                    'bg-[#ffd5d6] text-[#ff1843]',
                    ICONS_COMMON_CLASS
                  )}
                />
              }
            >
              <QrModal
                username={defaultCard.user?.username ?? ''}
                slug={defaultCard.user?.username}
              />
            </Dialog>
          )}
        </div>
      </>
    );
  } else <></>;
}
