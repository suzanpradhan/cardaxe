import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const appBarLabel = 'My Personal Card';

interface AppBarProps {
  cardId: string | null;
}

const AppBar = ({ cardId }: AppBarProps) => {
  const dispatch = useAppDispatch();
  const cardState = useSelector((state: RootState) => state.card);
  const pathName = usePathname();
  const session = useSession();
  const [toggleTab, setToggleTab] = useState<number>(0);
  // const [cardId, setCardId] = useState<string | undefined>();

  // if (searchParams.get('cardId')) {
  //   setCardId(searchParams.get('cardId') ?? undefined);
  // }

  useEffect(() => {
    if (pathName.endsWith('/builder')) {
      setToggleTab(0);
    } else if (pathName.endsWith('/builder/contents')) {
      setToggleTab(1);
    } else if (pathName.endsWith('/builder/designs')) {
      setToggleTab(2);
    } else if (pathName.endsWith('/builder/infos')) {
      setToggleTab(3);
    }
  }, [pathName]);

  const handlePublish = () => {
    var submitresponse = undefined;

    console.log(cardState.errors);

    if (!cardState.errors && cardId && session.data?.user?.id) {
      console.log(cardState.errors, cardId, session);
      submitresponse = dispatch(
        cardsApi.endpoints.upDateCard.initiate({
          cardFields: cardState.card.cardFields,
          cardDesign: cardState.card.cardDesign,
          cardId: cardId.toString(),
          userId: session.data?.user?.id,
        })
      );
      submitresponse
        ?.then((res) => {
          const errorMessage = (res as any).error;
          if (errorMessage) {
            toast.error(`Error:${errorMessage}`);
            throw errorMessage;
          }
          // const response = (res as any).data;
          toast.success('Successfully updated');
        })
        .catch((err) => {
          toast.error('Something went wrong');
          console.log(err);
          throw err;
        });
    }
    // submitResponse = submitResponse
    //   ?.then((res) => toast.success('Submitted Successfully'))
    //   .catch((err) => {
    //     toast.error('Something went wrong');
    //     throw err;
    //   });
  };
  return (
    <div className="flex w-full gap-3 h-[3.25rem] ">
      <div className="px-2 grow h-full bg-componentBgGrey rounded-lg flex items-center gap-2">
        <p className="inline text-grayfont">Label:</p>
        <h2 className="inline font-extrabold">{appBarLabel}</h2>
      </div>
      <button
        className="w-28 bg-input rounded-lg p-2 ring-1 ring-gray-300"
        // onClick={handleSavedraft}
        // onClick={() => {
        //   // const submitresponse = dispatch(
        //   //   cardsApi.endpoints.updateContents.initiate()
        //   // );
        // }}
      >
        Save Draft
      </button>

      <button
        onClick={handlePublish}
        className="w-28 bg-blueTheme text-white rounded-lg shadow-lg shadow-blueBg"
      >
        Publish
      </button>
    </div>
  );
};

export default AppBar;
