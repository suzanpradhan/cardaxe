'use client';
import ButtonForm from '@/components/ButtonForm';
import CreateNewTeam from '@/components/teams/CreateNewTeam';
import TeamCard from '@/components/teams/TeamCard';

const page = () => {
  return (
    <div className="flex w-fit mx-auto gap-4 justify-center mt-28">
      <CreateNewTeam />
      <div className="flex flex-col gap-2">
        <div className="max-w-lg h-min border-1 border-componentBgGrey rounded-xl">
          <TeamCard />
        </div>
        <div className="w-32 self-end">
          <ButtonForm label="Next" theme="blue" />
        </div>
      </div>
    </div>
  );
};

export default page;
