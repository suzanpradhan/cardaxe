'use client';

import Dialog from '@/components/Dialog';
import SearchInput from '@/components/SearchInput';
import Table from '@/components/teams/Table';
// import image1 from '../../../../../../../../public/staticImages/1.jpg';
// import image2 from '../../../../../../../../public/staticImages/2.jpg';
// import image3 from '../../../../../../../../public/staticImages/3.jpg';
// import image4 from '../../../../../../../../public/staticImages/4.jpg';
// import image5 from '../../../../../../../../public/staticImages/5.jpg';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import teamsApi from '@/module/teams/teamApi';
import { Team } from '@/module/teams/teamTypes';
import { useEffect } from 'react';
import AddMembersPopup from './(components)/AddMembersPopup';

const Page = ({ params }: { params: { teamSlug: string } }) => {
  const dispatch = useAppDispatch();
  const team = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getEachTeam-${params.teamSlug}`]?.data as Team
  );

  useEffect(() => {
    dispatch(teamsApi.endpoints.getEachTeam.initiate(params.teamSlug));
  }, [dispatch, params.teamSlug]);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex gap-2">
        <div className="grow">
          <SearchInput greyBackground />
        </div>
        <div className="rounded-lg">
          <Dialog
            triggerComponent={
              <div
                className="flex h-9 items-center rounded-sm bg-blueTheme px-4 text-white"
                // handleClick={() => setIsDialogOpen(true)}
              >
                Add Members
              </div>
            }
          >
            {team?.id ? <AddMembersPopup team={team} /> : <></>}
          </Dialog>
        </div>
      </div>
      <div className="w-full overflow-x-scroll">
        <Table teamSlug={params.teamSlug} />
      </div>
    </div>
  );
};

export default Page;
