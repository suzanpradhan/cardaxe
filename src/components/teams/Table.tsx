import MemberInfoDialog from '@/app/dashboard/(home)/teams/(components)/MemberInfoDialog';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import teamsApi from '@/module/teams/teamApi';
import { UserType } from '@/module/user/userType';
import { Activity, Eye, More, Scanning, Trash } from 'iconsax-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import profileImage from '../../../public/profile/profile.png';
import Dialog from '../Dialog';
import QrModal from '../QrModal';

const columnHeadings = [
  'User',
  'Title',
  'Department',
  'Access level',
  'Actions',
];

// type TabelPropsType = {
//   columnHeadings: string[];
//   data: {
//     profileImage: StaticImageData;
//     user: string;
//     email: string;
//     title: string;
//     department: string;
//     accessLevel: string;
//     actions: string;
//   }[];
// };

const ACTIONS_BUTTONS = [
  <Eye size="27" variant="Bulk" key={0} />,
  <Activity size="26" variant="Bulk" key={1} />,
  <Scanning size="24" variant="Bulk" key={2} />,
  <More size="26" variant="Bulk" key={3} />,
];

const Table = ({ teamSlug }: { teamSlug: string }) => {
  const dispatch = useAppDispatch();
  const [loading, setIsLoading] = useState(false);

  const teamMembers = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getEachTeamMembers-${teamSlug.toString()}`]
        ?.data as Array<UserType>
  );

  useEffect(() => {
    dispatch(
      teamsApi.endpoints.getEachTeamMembers.initiate({
        pageNumber: 0,
        slug: teamSlug,
      })
    );
  }, [dispatch, teamSlug]);

  const handleRemove = async (memberId: string) => {
    setIsLoading(true);
    try {
      const responseData = await Promise.resolve(
        dispatch(teamsApi.endpoints.deleteTeamMember.initiate(memberId))
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[62rem] border-b-1 border-t-1 border-b-borderMain border-t-borderMain">
      <div className="grid grid-cols-table-grid items-center justify-between py-2">
        {columnHeadings.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div className="flex flex-col">
        {teamMembers?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-table-grid items-center border-t-1 py-2"
          >
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-full shadow-lg">
                <Image
                  src={
                    item.avatar
                      ? `${apiPaths.serverUrl}${item.avatar}`
                      : profileImage
                  }
                  alt="Background Image"
                  fill
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="z-10 rounded-full"
                />
              </div>
              <div>
                <p>{item.fullname}</p>
                <p className="text-grayfont">{item.email}</p>
              </div>
            </div>
            <div></div>
            <div></div>

            <div></div>

            <div className="flex items-center justify-between text-grayfont">
              <Dialog
                triggerComponent={
                  <div className="mt-2 rounded-full bg-componentBgGrey p-2">
                    <Eye size="26" variant="Bulk" key={0} />
                  </div>
                }
              >
                <MemberInfoDialog userSlug={item.username} key={index} />
              </Dialog>

              {/* <div className="rounded-full bg-componentBgGrey p-2">
                <Scanning size="26" variant="Bulk" key={2} />
              </div> */}
              <Dialog
                className="w-96"
                triggerComponent={
                  <div className="mt-2 rounded-full bg-componentBgGrey p-2">
                    <Scanning size="26" variant="Bulk" key={2} />
                  </div>
                }
              >
                <QrModal userName={item.username} />
              </Dialog>

              <div className="rounded-full bg-componentBgGrey p-2">
                <More size="26" variant="Bulk" key={3} />
              </div>
              <button
                className="rounded-full bg-red-500 p-2 text-white"
                onClick={() => handleRemove(item.id.toString())}
              >
                <Trash size="26" variant="Bulk" key={1} />
              </button>
              {/* <button
                  className="rounded-full bg-componentBgGrey p-2"
                  key={index}
                  onClick={() => openDialog()}
                >
                  {item}
                </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* <Dialog >
        <ManageMemberDialog />
      </Dialog> */}
    </div>
  );
};

export default Table;
