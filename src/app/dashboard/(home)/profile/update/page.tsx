'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import userApi from '@/module/user/userApi';
import { UserType, userSchema } from '@/module/user/userType';
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
      id: user?.id ?? null,
      updateAvatar: undefined,
      avatar: user?.avatar ? `${user?.avatar}` : '/profile/profile.png',
    },
    validateOnChange: false,
    validate: validateForm,
    onSubmit,
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(e.target.name, e.target.files?.[0]);
  };

  console.log(formik.values);

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
                <div className="relative h-14 w-14 overflow-hidden rounded-full">
                  <Image
                    src={
                      formik.values.updateAvatar
                        ? (URL.createObjectURL(formik.values.updateAvatar) ??
                          '/profile/profile.png')
                        : (formik.values.avatar ?? '/profile/profile.png')
                    }
                    alt="profile-image"
                    objectFit="cover"
                    layout="fill"
                    sizes="(max-width: 2000px) 75vw, 33vw"
                  />
                </div>
                <div className="flex flex-col max-md:items-center">
                  <h3 className="text-base font-semibold">
                    {formik.values.fullname}
                  </h3>
                  <p className="text-sm font-normal">Free Plan</p>
                </div>
              </div>
              <div className="">
                <label htmlFor="image-input">
                  <div className="rounded bg-blueTheme px-2 py-2 text-center text-white shadow-lg shadow-blueTheme/60">
                    Change Profile
                  </div>
                </label>
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
              </div>
              {/* <button
                className=" bg-blueTheme py-2 text-white px-2 rounded shadow-lg shadow-blueTheme/60"
                onClick={handleImageChange}
              >
                Change Profile
              </button> */}
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
                  name="fullname"
                  className="w-full bg-transparent indent-3 outline-none"
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
                  placeholder="Istanbul, Turkey"
                  className="w-full bg-transparent indent-3 outline-none"
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
                >
                  <option value="1">Male</option>
                  <option value="2">Female</option>
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
