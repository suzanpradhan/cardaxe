'use client';

import Dialog from '@/components/Dialog';
import SearchInput from '@/components/SearchInput';
import Table from '@/components/teams/Table';
import image1 from '../../../../../../../../public/staticImages/1.jpg';
import image2 from '../../../../../../../../public/staticImages/2.jpg';
import image3 from '../../../../../../../../public/staticImages/3.jpg';
import image4 from '../../../../../../../../public/staticImages/4.jpg';
import image5 from '../../../../../../../../public/staticImages/5.jpg';
import AddMembersPopup from './(components)/AddMembersPopup';

const Page = ({ params }: { params: { teamSlug: string } }) => {
  console.log(params.teamSlug);
  const columnHeadings = [
    'User',
    'Title',
    'Department',
    'Access level',
    'Actions',
  ];

  const data = [
    {
      profileImage: image1,
      user: 'Sujan Pradhan',
      email: 'sujanpradhan@gmail.com',
      title: 'CEO',
      department: 'Admin',
      accessLevel: 'Owner',
      actions: '',
    },
    {
      profileImage: image2,
      user: 'Alex Brooker',
      email: 'alexbrooker@gamil.com',
      title: 'Manager',
      department: 'Admin',
      accessLevel: 'Editor',
      actions: '',
    },
    {
      profileImage: image3,
      user: 'Eugene Cheng',
      email: 'eugenecheng@gamil.com',
      title: 'Developer',
      department: 'Technical',
      accessLevel: 'Member',
      actions: '',
    },
    {
      profileImage: image4,
      user: 'Avishek Dahal',
      email: 'avishekdahal@gamil.com',
      title: 'CEO',
      department: 'Management',
      accessLevel: 'Casd',
      actions: '',
    },
    {
      profileImage: image5,
      user: 'Mahesh Tripathi',
      email: 'mahesh@gamil.com',
      title: 'CEO',
      department: 'Management',
      accessLevel: 'Casd',
      actions: '',
    },
  ];

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
            <AddMembersPopup teamSlug={params.teamSlug} />
          </Dialog>
        </div>
      </div>
      <div className="w-full overflow-x-scroll">
        <Table columnHeadings={columnHeadings} data={data} />
      </div>
    </div>
  );
};

export default Page;
