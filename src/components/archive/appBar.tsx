// import { useAppDispatch } from '@/core/redux/clientStore';
// import { RootState } from '@/core/redux/store';
// import cardsApi from '@/module/cards/cardsApi';
// import { usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';

// const appBarLabel = 'My Personal Card';

// const AppBar = () => {
//   const dispatch = useAppDispatch();
//   const cardState = useSelector((state: RootState) => state.card);
//   const pathName = usePathname();
//   const [toggleTab, setToggleTab] = useState<number>(0);

//   useEffect(() => {
//     if (pathName.endsWith('/builder')) {
//       setToggleTab(0);
//     } else if (pathName.endsWith('/builder/contents')) {
//       setToggleTab(1);
//     } else if (pathName.endsWith('/builder/designs')) {
//       setToggleTab(2);
//     } else if (pathName.endsWith('/builder/infos')) {
//       setToggleTab(3);
//     }
//   }, [pathName]);

//   const handlePublish = () => {
//     var submitresponse;
//     switch (toggleTab) {
//       case 0:
//         break;
//       case 1:
//         if (!cardState?.errors) {
//           submitresponse = dispatch(
//             cardsApi.endpoints.updateContents.initiate({
//               id: 1,
//               ...cardState.card.cardFields,
//             })
//           );
//           break;
//         }
//         break;

//       case 2:
//         submitresponse = dispatch(
//           cardsApi.endpoints.updateDesigns.initiate({
//             id: 1,
//             ...cardState.designForm,
//           })
//         );
//         break;
//       case 3:
//         break;
//     }
//     submitresponse
//       ?.then((res) => toast.success('Submitted Successfully'))
//       .catch((err) => {
//         toast.error('Something went wrong');
//         throw err;
//       });
//   };
//   return (
//     <div className="flex w-full gap-3 h-[3.25rem] ">
//       <div className="px-2 grow h-full bg-componentBgGrey rounded-lg flex items-center gap-2">
//         <p className="inline text-grayfont">Label:</p>
//         <h2 className="inline font-extrabold">{appBarLabel}</h2>
//       </div>
//       <button
//         className="w-28 bg-input rounded-lg p-2 ring-1 ring-gray-300"
//         // onClick={handleSavedraft}
//         // onClick={() => {
//         //   // const submitresponse = dispatch(
//         //   //   cardsApi.endpoints.updateContents.initiate()
//         //   // );
//         // }}
//       >
//         Save Draft
//       </button>

//       <button
//         onClick={handlePublish}
//         className="w-28 bg-blueTheme text-white rounded-lg shadow-lg shadow-blueBg"
//       >
//         Publish
//       </button>
//     </div>
//   );
// };

// export default AppBar;
