'use client';
import ButtonForm from '@/components/ButtonForm';
import CreateNewTeam from '@/components/teams/CreateNewTeam';
import TeamCard from '@/components/teams/TeamCard';
import { useAppDispatch } from '@/core/redux/clientStore';
import teamsApi from '@/module/teams/teamApi';
import { TeamFormSchema, TeamFormType } from '@/module/teams/teamTypes';
import { useFormik } from 'formik';
import { useState } from 'react';
import { ZodError } from 'zod';

const Page = () => {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);
  // const [isFormExpanded, expandForm] = useState(false);
  const onSubmit = async (formData: TeamFormType) => {
    setIsLoading(true);
    try {
      const responseData = await Promise.resolve(
        dispatch(teamsApi.endpoints.createTeam.initiate(formData))
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const validateForm = (values: TeamFormType) => {
    try {
      TeamFormSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return error.formErrors.fieldErrors;
      }
    }
  };

  const formik = useFormik<TeamFormType>({
    // enableReinitialize: true,
    initialValues: {
      name: 'fdas',
      category: {
        label: '',
        value: '',
      },
      logo: null,
    },
    validateOnChange: true,
    onSubmit,
    validate: validateForm,
  });

  console.log(formik.values);

  return (
    <form
      className="mx-auto mt-28 flex h-screen max-h-screen min-h-screen w-fit flex-col-reverse justify-center gap-4 overflow-hidden md:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
    >
      <CreateNewTeam
        formik={formik}
        // expandForm={expandForm}
        // isFormExpanded={isFormExpanded}
      />
      <div className="mr-4 flex flex-col gap-2">
        <div className="h-min max-w-lg rounded-xl border-1 border-componentBgGrey">
          <TeamCard teamCardValues={formik.values} />
        </div>
        <div className="w-32 self-end">
          <ButtonForm label="Next" theme="blue" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default Page;
