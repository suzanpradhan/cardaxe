import React from 'react';
import CardHomeLayout from './CardHomeLayout';

type CardTempHomeTypes = {
  firstName: string;
  lastName: string;
  designation: string;
  phone: string;
  website: string;
  email: string;
  logo: string;
};

const CardTempHome = ({
  firstName,
  lastName,
  designation,
  phone,
  website,
  email,
  logo,
}: CardTempHomeTypes) => {
  return (
    <CardHomeLayout>
      <h2 className="text-xl font-extrabold ">
        {firstName} {lastName}
      </h2>
      <p className="font-semibold text-green-500">{designation}</p>
      <p className="grow mt-32">
        {phone} <br /> {website} <br /> {email}
      </p>
    </CardHomeLayout>
  );
};

export default CardTempHome;
