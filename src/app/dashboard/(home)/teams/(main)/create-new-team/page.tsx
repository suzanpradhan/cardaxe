'use client';

import ButtonForm from '@/components/ButtonForm';
import CreateNewTeamForm from '@/components/teams/CreateNewTeamForm';
import TeamCard from '@/components/teams/TeamCard';

const CreateTeam = () => {
  return (
    // <div className="flex w-fit mx-auto gap-4 justify-center mt-28">
    //   <div className="flex flex-col gap-2">
    //     <div className="max-w-lg h-min border-1 border-componentBgGrey rounded-xl">
    //       <TeamCard />
    //     </div>
    //     <div className="w-32 self-end">
    //       <ButtonForm label="Next" theme="blue" />
    //     </div>
    //   </div>
    // </div>
    <div className="lg:flex lg:items-center lg:justify-center lg:h-screen lg:overflow-y-scroll">
      <div className="max-w-5xl">
        <div className="grid grid-cols-12 place-items-stretch gap-10">
          <div className="col-span-12 lg:col-span-6">
            <CreateNewTeamForm />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <TeamCard />
          </div>
        </div>
        <div className="flex items-center justify-between mt-5">
          <p>Add other details ˅</p>
          <div className="w-max">
            <ButtonForm label="Create Team" theme="blue" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
