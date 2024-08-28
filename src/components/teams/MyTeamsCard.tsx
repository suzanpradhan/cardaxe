import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import teamsApi from '@/module/teams/teamApi';
import { UserType } from '@/module/user/userType';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import staticLogoImage from '../../../public/logo.png';
import Imageoverlay from './Imageoverlay';

type MyTeamsCardPropsType = {
  organizationName?: string;
  slug: string;
  logo?: string;
};

const MyTeamsCard = ({
  organizationName,
  logo,
  slug,
}: MyTeamsCardPropsType) => {
  const dispatch = useAppDispatch();

  const teamMembers = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getEachTeamMembers-${slug.toString()}`]
        ?.data as Array<UserType>
  );

  useEffect(() => {
    dispatch(
      teamsApi.endpoints.getEachTeamMembers.initiate({
        pageNumber: 0,
        slug: slug,
      })
    );
  }, [dispatch, slug]);
  return (
    <Link
      href={`/dashboard/teams/${slug}`}
      className="relative max-w-3xl grow rounded-lg border-1 border-borderMain"
    >
      <div
        className="absolute top-0 h-10 w-full rounded-t-lg"
        style={{ backgroundColor: 'red' }}
      ></div>
      <div className="grid gap-2 p-4">
        <div className="relative h-20 w-20 rounded-lg shadow-lg">
          <Image
            src={logo ?? staticLogoImage}
            alt="Background Image"
            fill
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 300px"
            className="z-10 rounded-lg"
          />
        </div>
        <div className="flex justify-between">
          <strong>{organizationName}</strong>
          <span>Active</span>
        </div>
        <Imageoverlay
          images={teamMembers?.map((item, index) => item.avatar ?? undefined)}
        />
      </div>
    </Link>
  );
};

export default MyTeamsCard;
