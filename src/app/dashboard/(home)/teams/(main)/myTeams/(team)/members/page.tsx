'use client';

import ButtonForm from '@/components/ButtonForm';
import Table from '@/components/teams/Table';
import { SearchNormal1 } from 'iconsax-react';
import React from 'react';
import image1 from '../../../../../../../../../public/staticImages/1.jpg';
import image2 from '../../../../../../../../../public/staticImages/2.jpg';
import image3 from '../../../../../../../../../public/staticImages/3.jpg';
import image4 from '../../../../../../../../../public/staticImages/4.jpg';
import image5 from '../../../../../../../../../public/staticImages/5.jpg';

const Page = () => {
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
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <label
          htmlFor="input"
          className="flex  items-center  focus-within:bg-blueBg focus-within:text-blueTheme text-grayfont rounded-md grow bg-inputBgGrey"
        >
          <SearchNormal1 size="36" className="px-2 " variant="Bulk" />
          <input
            className="grow h-full rounded-md focus:outline-0 bg-transparent"
            id="input"
            placeholder="Search"
          />
        </label>
        <div className="shadow-lg shadow-blueTheme rounded-lg">
          <ButtonForm label="Create Team" bluebackground />
        </div>
      </div>
      <Table columnHeadings={columnHeadings} data={data} />
    </div>
  );
};

export default Page;
