import ButtonForm from '@/components/ButtonForm';
import SearchInput from '@/components/SearchInput';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import teamsApi from '@/module/teams/teamApi';
import {
  inviteMembersSchema,
  InviteMembersType,
  Team,
  TeamRequest,
} from '@/module/teams/teamTypes';
import { useFormik } from 'formik';
import { CloseCircle } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { ZodError } from 'zod';

export default function AddMembersPopup({ teamSlug }: { teamSlug: string }) {
  const [hasMoreData, setHasMoreData] = useState(true);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const team = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getEachTeam-${teamSlug}`]?.data as Team
  );

  useEffect(() => {
    dispatch(teamsApi.endpoints.getEachTeam.initiate(teamSlug));
  }, [dispatch, teamSlug]);

  const requestsResponse = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries.getRequestByTeam
        ?.data as PaginatedResponseType<TeamRequest>
  );

  useEffect(() => {
    if (!hasMoreData || !team.id) return;
    const fetchData = async (currentPage: number) => {
      const response = await Promise.resolve(
        dispatch(
          teamsApi.endpoints.getRequestByTeam.initiate({
            pageNumber: currentPage,
            teamId: team.id!.toString(),
          })
        )
      );
      if (response.data) {
        if (
          response.data!.pagination.currentPage >=
          response.data!.pagination.totalPage
        ) {
          setHasMoreData(false);
        }
      }
    };
    fetchData(currentPage);
  }, [currentPage, team.id]);

  const onSubmit = async (formData: InviteMembersType) => {
    setIsLoading(true);
    try {
      const responseData = await Promise.resolve(
        dispatch(teamsApi.endpoints.intiviteMembers.initiate(formData))
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const validateForm = (values: InviteMembersType) => {
    try {
      inviteMembersSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return error.formErrors.fieldErrors;
      }
    }
  };

  const formik = useFormik<InviteMembersType>({
    initialValues: {
      email: '',
      team: team.id?.toString() ?? '',
    },
    validateOnChange: true,
    onSubmit,
    validate: validateForm,
  });

  console.log('formik.errors', formik.errors);

  return (
    <div className="flex h-96 w-full flex-col gap-2 p-4 lg:w-[60rem]">
      <h2>Invite Members</h2>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className="grow">
          <SearchInput greyBackground {...formik.getFieldProps('email')} />
        </div>
        <div className="rounded-lg">
          <ButtonForm
            label="Invite"
            className="h-9"
            disableInput={formik.errors.email != null}
            theme="blue"
            type="submit"
          />
        </div>
      </form>
      {requestsResponse?.results.map((item, index) => (
        <div
          key={index}
          className="flex w-full items-center gap-4 rounded-md bg-inputBgGrey p-2"
        >
          <div className="h-10 w-10 rounded-full bg-componentBgGrey"></div>
          <p className="grow">{item.email}</p>
          <CloseCircle size="32" variant="Bold" className="text-grayfont" />
        </div>
      ))}
    </div>
  );
}
