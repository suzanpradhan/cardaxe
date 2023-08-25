import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../../utils/authOptions';
import { redirect } from 'next/navigation';

const mainPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }
  return <div>mainPage</div>;
};

export default mainPage;
