'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { getMinUserName } from '@/core/utils/generalFunctions';
import userApi from '@/module/user/userApi';
import { UserType, userSchema } from '@/module/user/userType';
import { Pencil } from '@phosphor-icons/react';
import { useFormik } from 'formik';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { ZodError } from 'zod';

export default function UpdateProfile() {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);

  const user = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );

  useEffect(() => {
    dispatch(userApi.endpoints.getUser.initiate());
  }, [dispatch]);

  const validateForm = (values: UserType) => {
    try {
      userSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return error.formErrors.fieldErrors;
      }
    }
  };

  const onSubmit = async (formData: UserType) => {
    setIsLoading(true);
    try {
      const responseData = await Promise.resolve(
        dispatch(userApi.endpoints.updateUser.initiate(formData))
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const formik = useFormik<UserType>({
    enableReinitialize: true,
    initialValues: {
      fullname: user?.fullname ?? '',
      username: user?.username ?? '',
      email: user?.email ?? '',
      address: user?.address ?? '',
      bio: user?.bio ?? '',
      gender: user?.gender ?? 'MALE',
      id: user?.id ?? null,
      updateAvatar: undefined,
      avatar: user?.avatar ? `${user?.avatar}` : '',
    },
    validateOnChange: false,
    validate: validateForm,
    onSubmit,
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(e.target.name, e.target.files?.[0]);
  };

  return (
    <section className="mx-auto mb-20 max-w-3xl">
      <div className="bg-white px-5 py-9">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <div className="flex flex-col items-stretch gap-5">
            <h3 className="mb-5 text-xl font-semibold">Edit Profile</h3>
            <div className="flex w-full flex-col justify-between gap-2 rounded-lg bg-slate-100 px-4 py-3 md:flex-row md:items-center md:gap-0">
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <div className="relative h-14 w-14">
                  {formik.values.avatar || formik.values.updateAvatar ? (
                    <Image
                      src={
                        formik.values.updateAvatar
                          ? (URL.createObjectURL(formik.values.updateAvatar) ??
                            '/square_image.jpg')
                          : (formik.values.avatar ?? '/square_image.jpg')
                      }
                      alt="profile-image"
                      objectFit="cover"
                      layout="fill"
                      sizes="(max-width: 2000px) 75vw, 33vw"
                      className="h-full w-full overflow-hidden rounded-full"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-blue-700">
                      {formik.values.fullname && (
                        <h5 className="text-base font-extrabold text-white">
                          {getMinUserName(formik.values.fullname)}
                        </h5>
                      )}
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 lg:hidden">
                    <label htmlFor="image-input">
                      <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white text-center text-blue-700 shadow-lg shadow-black/60">
                        <Pencil size={15} weight="light" />
                      </div>
                    </label>
                  </div>
                </div>
                <input
                  id={'image-input'}
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                  className="hidden"
                  accept="image/*"
                  // value={formik.values.updateAvatar?.name ?? ''}
                  // value={
                  //   formik.values.updateAvatar
                  //     ? URL.createObjectURL(formik.values.updateAvatar)
                  //     : undefined
                  // }
                  name="updateAvatar"
                />
                <div className="flex flex-col">
                  <h3 className="text-base font-semibold">
                    {formik.values.fullname}
                  </h3>
                  <p className="text-sm font-normal">Free Plan</p>
                </div>
              </div>
              <div className="max-lg:hidden">
                <label htmlFor="image-input">
                  <div className="rounded bg-blueTheme px-2 py-2 text-center text-white shadow-lg shadow-blueTheme/60">
                    Change Profile
                  </div>
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-stretch gap-1">
              <label htmlFor="username" className="text-grayfont">
                Username
              </label>
              <div className="flex h-12 items-stretch rounded border bg-slate-100 focus-within:ring-2">
                <div className="flex items-center bg-slate-300 px-4">
                  cardaxe.com/
                </div>
                <input
                  type="text"
                  placeholder="niwesh_shrestha"
                  name="username"
                  className="w-full bg-transparent indent-3 outline-none"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.username && formik.errors.username ? (
                <span className="text-xs font-medium text-red-400">
                  {formik.errors.username}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col justify-stretch gap-1">
              <label htmlFor="username" className="text-grayfont">
                Full name
              </label>
              <div className="flex h-12 items-stretch rounded border bg-slate-100 focus-within:ring-2">
                <input
                  type="text"
                  placeholder="eg. Niwesh Shrestha"
                  className="w-full bg-transparent indent-3 outline-none"
                  name="fullname"
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.fullname && formik.errors.fullname ? (
                <span className="text-xs font-medium text-red-400">
                  {formik.errors.fullname}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col justify-stretch gap-1">
              <label htmlFor="username" className="text-grayfont">
                Location
              </label>
              <div className="flex h-12 items-stretch rounded border bg-slate-100 focus-within:ring-2">
                <input
                  type="text"
                  placeholder="eg. Kathmandu, Nepal"
                  className="w-full bg-transparent indent-3 outline-none"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address ?? undefined}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            <div className="flex flex-col justify-stretch gap-1">
              <label htmlFor="username" className="text-grayfont">
                Gender
              </label>
              <div className="flex h-12 items-stretch rounded border bg-slate-100 focus-within:ring-2">
                <select
                  // placeholder="Istanbul, Turkey"

                  className="w-full bg-transparent indent-3 outline-none"
                  name="gender"
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                  onBlur={formik.handleBlur}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Others</option>
                  <option value="UNKNOWN">Unknown</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-stretch gap-1">
              <label htmlFor="username" className="text-grayfont">
                Bio
              </label>
              <div className="flex items-stretch rounded border bg-slate-100 focus-within:ring-2">
                <textarea
                  rows={5}
                  placeholder="Tell something about you..."
                  className="w-full bg-transparent py-2 indent-3 outline-none"
                  name="bio"
                  onChange={formik.handleChange}
                  value={formik.values.bio ?? undefined}
                  onBlur={formik.handleBlur}
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="h-10 rounded bg-blueTheme px-2 text-white shadow-lg shadow-blueTheme/60"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
