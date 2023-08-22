import React from 'react';

const RegisterationForm = () => {
  const REGISTRATION_ITEMS = [
    {
      placeholder: 'Full Name',
      type: 'text',
    },
    {
      placeholder: 'Email',
      type: 'email',
    },
    {
      placeholder: 'Password',
      type: 'password',
    },
    {
      placeholder: 'Confirm Password',
      type: 'password',
    },
  ];
  return (
    <div className="flex flex-col ">
      <h1 className="text-4xl font-extrabold py-3">cardaxe.</h1>
      <form className="flex flex-col gap-4 py-2">
        {REGISTRATION_ITEMS.map((item, index) => (
          <input
            type={item.type}
            placeholder={item.placeholder}
            className="bg-input placeholder:text-placeholder border-inputBorder border-1 rounded-sm p-2"
          ></input>
        ))}
        <button type="submit" className="bg-blue-500 rounded-sm p-2 text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterationForm;
