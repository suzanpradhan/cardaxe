'use client';

import Header from '@/components/Header';
import React from 'react';
import Image from 'next/image';
import homepage_background from '../../../public/homepage_background.png';
import InputComp from '@/components/InputComp';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonForm from '@/components/ButtonForm';
import { TickCircle } from 'iconsax-react';
import Footer from '@/components/Footer';
import FaqCollection from '@/components/landingPage/FaqCollection';
import ContentHeading from '@/components/landingPage/ContentHeading';

const SwitchSchema = z.object({
  payMonthly: z.boolean().default(true),
});
type SwitchSchemaType = z.infer<typeof SwitchSchema>;

const tickCircle = (
  <TickCircle
    variant="Bold"
    size="24"
    className=" rounded-full text-blueTheme inline"
  />
);

const paymentDetails = [
  'Sed ut perspiciatis unde omnis iste natus',
  'Sed ut perspiciatis unde omnis iste natus',
  'Sed ut perspiciatis unde omnis iste natus',
  'Sed ut perspiciatis unde omnis iste natus',
  'Sed ut perspiciatis unde omnis iste natus',
];

const Page = () => {
  const { register, handleSubmit } = useForm<SwitchSchemaType>({
    resolver: zodResolver(SwitchSchema),
  });
  return (
    <div>
      <Header />
      <div className="-z-10 w-full h-screen min-h-fitall absolute top-0 left-0 ">
        <Image
          src={homepage_background}
          alt="image"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          objectFit="cover"
        />
      </div>
      <div className="mx-auto max-w-7xl p-2">
        <h2 className="font-medium text-4xl text-center mt-4 py-4">
          Pricing and plans
        </h2>
        <span className="flex justify-center py-4">
          Pay monthly
          <span className="inline pl-2">
            <input
              className="border-1 checked:border-black mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-black checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-black checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-neutral-100 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-black dark:checked:after:bg-black dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox"
              role="switch"
              aria-checked="true"
            />
          </span>
          Pay Annually
          <span className="text-blueTheme">(save 25%)</span>
        </span>
        <div className="flex justify-center gap-8 px-8 mt-2">
          <section className="max-w-md backdrop-blur-3xl grow p-5 border-2 border-white rounded-xl">
            <h3 className="font-bold text-2xl py-2">Free</h3>
            <h2 className="font-bold text-4xl inline">$0</h2>
            <span> per month</span>
            <div className="my-4">
              <ButtonForm bluebackground={false} label="Get Started" />
            </div>
            <ul className="grid gap-2 mb-32">
              {paymentDetails.map((item, index) => (
                <li key={index}>
                  {tickCircle} {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="max-w-md backdrop-blur-3xl grow p-5 border-2 border-white rounded-xl">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-2xl py-2">Premium</h3>
                <h2 className="font-bold text-4xl inline">$10</h2>
                <span> per month</span>
              </div>
              <aside className="w-36">7-days free trial, cancel anytime</aside>
            </div>
            <div className="my-4">
              <ButtonForm bluebackground label="Get Started" />
            </div>
            <ul className="grid gap-2 mb-32">
              {paymentDetails.map((item, index) => (
                <li key={index} className="flex">
                  {tickCircle} {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <div className="mt-52 text flex flex-col gap-16 p-20 max-w-4xl mx-auto">
        <ContentHeading
          headingTitle="Frequently Asked Questions"
          center={true}
        />
        <FaqCollection />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
