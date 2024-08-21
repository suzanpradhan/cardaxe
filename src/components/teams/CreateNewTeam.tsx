import { CategoryType, TeamFormType } from '@/module/teams/teamTypes';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import teamsApi from '@/module/teams/teamApi';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import DateSelector from '../Inputs/DateSelector';
import ImageInput from '../Inputs/ImageInput';
import SelectInput, { SelectorDataType } from '../Inputs/SelectInput';
import TextInput from '../Inputs/TextInput';

const CreateNewTeam = ({
  formik,
  // expandForm,
  // isFormExpanded,
}: {
  formik: FormikProps<TeamFormType>;
  // expandForm: Dispatch<SetStateAction<boolean>>;
  // isFormExpanded: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [isFormExpanded, expandForm] = useState(false);

  useEffect(() => {
    dispatch(teamsApi.endpoints.getTeamsCategory.initiate(1));
  }, [dispatch]);

  const categoriesResult = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getTeamsCategory`]
        ?.data as PaginatedResponseType<CategoryType>
  );

  const categories: Array<SelectorDataType> = categoriesResult?.results.map(
    (p, index) => {
      return {
        value: p?.id.toString() ?? '',
        label: p?.title ?? '',
      };
    }
  );
  const loadPaginatedOptions = async (
    searchQuery: any,
    loadedOptions: any,
    { page }: any
  ) => {
    // dispatch(teamsApi.endpoints.getTeamsCategory.initiate(1));
    return {
      options: categories,
      hasMore: categoriesResult.pagination.totalPage > page,
      additional: {
        page: page,
      },
    };
  };

  return (
    <div className="max-w-4xl shrink-0 overflow-y-scroll px-4 max-md:mb-20">
      <h2 className="text-lg font-bold">Create a new team</h2>
      <div
        className="mb-9 flex flex-col gap-4 py-2"
        // onSubmit={handleSubmit(submitData)}
      >
        {/* {INPUT_FEILDS.slice(0, 3).map((item, index) => (
          <div key={index} className="h-16">
            <InputComp
              inputCompType={item.inputCompType}
              inputType={item.inputType}
              placeholder={item.placeholder}
              zSchemaName={item.zSchemaName}
              inputLabel={item.inputLabel}
            />
            
          </div>
        ))} */}
        <TextInput
          id={'name'}
          type={'text'}
          rows={1}
          error={formik.errors.name}
          label={'Team or organization name'}
          isMulti={false}
          placeholder={'eg SharpVenture'}
          {...formik.getFieldProps('name')}
        />
        <SelectInput
          id={'categories'}
          error={formik.errors.category?.value}
          label={'Category'}
          options={categories}
          placeholder={'eg SharpVenture'}
          value={formik.values.category}
          loadPaginatedOptions={loadPaginatedOptions}
          handleChange={(e) => {
            formik.setFieldValue(
              'category.value',
              (
                e as SingleValue<{
                  value: string;
                  label: string;
                  extra?: string | undefined;
                  __isNew__?: boolean | undefined;
                }>
              )?.value
            );
            formik.setFieldValue(
              'category.label',
              (
                e as SingleValue<{
                  value: string;
                  label: string;
                  extra?: string | undefined;
                  __isNew__?: boolean | undefined;
                }>
              )?.label
            );
          }}
          // {...formik.getFieldProps('category')}
        />
        <ImageInput
          id="logo"
          // className="mb-3 w-[98%]"
          label="Logo"
          name="backgroundImage"
          placeholder="Choose Image"
          value={formik.values.logo ?? undefined}
          error={formik.errors.logo ? 'error' : undefined}
          onChange={(e) => {
            formik.setFieldValue('logo', e.target.files?.[0]);
          }}
        />
        <TextInput
          id={'bio'}
          rows={5}
          name={'bio'}
          error={formik.errors.bio}
          label={'Bio'}
          isMulti={true}
          value={formik.values.bio ?? undefined}
          placeholder={''}
          onChange={(e) => {
            formik.setFieldValue('bio', e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => expandForm((prevState) => !prevState)}
        className="flex w-full items-center"
        type="button"
      >
        <span className="grow text-start">Add other details</span>{' '}
        {isFormExpanded ? <CaretDown size={24} /> : <CaretUp size={24} />}
      </button>

      <div className={clsx('relative overflow-clip')}>
        <section
          className={clsx(
            'flex flex-col gap-4 py-2 transition duration-300',
            !isFormExpanded ? '-translate-y-full' : 'translate-y-0'
          )}
        >
          <TextInput
            id={'ceo'}
            type={'text'}
            rows={1}
            error={formik.errors.ceo}
            label={'CEO'}
            isMulti={false}
            placeholder={'CEO name'}
            {...formik.getFieldProps('ceo')}
          />
          <TextInput
            id={'founders'}
            type={'text'}
            rows={1}
            error={formik.errors.founders}
            label={'Founders'}
            isMulti={false}
            placeholder={`founders' name`}
            {...formik.getFieldProps('founders')}
          />
          <DateSelector
            id="departureDate"
            placeholder="Select a date"
            onChange={(selectedDay) =>
              formik.setFieldValue('foundedAt', selectedDay)
            }
            value={formik.values.foundedAt ?? undefined}
          />
          <TextInput
            id={'headquater'}
            type={'text'}
            rows={1}
            error={formik.errors.headquater}
            label={'Headquater Location'}
            isMulti={false}
            placeholder={`headquater location`}
            {...formik.getFieldProps('headquater')}
          />
        </section>
      </div>
    </div>
  );
};

export default CreateNewTeam;
