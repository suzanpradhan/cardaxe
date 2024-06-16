'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import userApi from '@/module/user/userApi';
import { UserDetailType, UserType, userSchema } from '@/module/user/userType';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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

  const validateForm = (values: UserDetailType) => {
    try {
      userSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return error.formErrors.fieldErrors;
      }
    }
  };

  const onSubmit = async (formData: UserDetailType) => {
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

  const formik = useFormik<UserDetailType>({
    enableReinitialize: true,
    initialValues: {
      fullname: user?.fullname ?? '',
      username: user?.username ?? '',
    },
    validateOnChange: false,
    validate: validateForm,
    onSubmit,
  });
  return (
    <section className="max-w-3xl mx-auto mb-20">
      <div className="bg-white px-5 py-9">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <div className="flex flex-col items-stretch gap-5">
            <h3 className="text-xl font-semibold mb-5">Edit Profile</h3>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 w-full rounded-lg bg-slate-100 px-4 py-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative overflow-hidden w-14 h-14 rounded-full">
                  <Image
                    src={`/profile/profile.png`}
                    alt="profile-image"
                    objectFit="cover"
                    layout="fill"
                    sizes="(max-width: 2000px) 75vw, 33vw"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold">Niwesh Shrestha</h3>
                  <p className="text-sm font-normal">Free Plan</p>
                </div>
              </div>
              <button className="h-10 bg-blueTheme text-white px-2 rounded shadow-lg shadow-blueTheme/60">
                Change Profile
              </button>
            </div>
            <div className="flex flex-col justify-stretch gap-1">
              <label htmlFor="username" className="text-grayfont">
                Username
              </label>
              <div className="h-12 border bg-slate-100 flex items-stretch rounded focus-within:ring-2">
                <div className="px-4 bg-slate-300 flex items-center">
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
                <span className="text-xs text-red-400 font-medium">
                  {formik.errors.username}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col justify-stretch gap-1">
              <label htmlFor="username" className="text-grayfont">
                Full name
              </label>
              <div className="h-12 border bg-slate-100 flex items-stretch rounded focus-within:ring-2">
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
                <span className="text-xs text-red-400 font-medium">
                  {formik.errors.fullname}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col justify-stretch gap-1">
              <label htmlFor="username" className="text-grayfont">
                Location
              </label>
              <div className="h-12 border bg-slate-100 flex items-stretch rounded focus-within:ring-2">
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
              <div className="h-12 border bg-slate-100 flex items-stretch rounded focus-within:ring-2">
                <select
                  placeholder="Istanbul, Turkey"
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
              <div className="border bg-slate-100 flex items-stretch rounded focus-within:ring-2">
                <textarea
                  rows={5}
                  placeholder="Tell something about you..."
                  className="w-full bg-transparent indent-3 outline-none py-2"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="h-10 bg-blueTheme text-white px-2 rounded shadow-lg shadow-blueTheme/60"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
