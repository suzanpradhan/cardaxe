import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { toast } from "react-toastify";
import { ConfirmEmailSchemaType, ForgotPasswordSchemaType, RegistrationSchemaType } from "./registerType";

export const registerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation<any, RegistrationSchemaType>({
            query: ({ ...payload }) => {
                var formData = new FormData();
                formData.append("email", payload.email);
                formData.append("password", payload.password);
                formData.append("fullname", payload.fullname);
                if (payload.confirmPassword) formData.append("confirmPassword", payload.confirmPassword);
                return {
                    url: `${apiPaths.registerUrl}`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                };
            },
            async onQueryStarted(payload, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Registration Successful');
                } catch (err) {
                    console.log(err);
                    toast.error((err as any).error.data.errors.errors[0]);
                }
            },
            transformResponse: (response) => {
                return response as any;
            },
        },),
        changeCurrentPassword: builder.mutation<any, ForgotPasswordSchemaType>({
            query: ({ ...payload }) => {
                var formData = new FormData();
                formData.append("currnet_password", payload.current_password);
                formData.append("new_password", payload.new_password);
                if (payload.new_repassword) formData.append("new_repassword", payload.new_repassword);
                return {
                    url: `${apiPaths.changeCurrentPasswordUrl}`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                };
            },
            async onQueryStarted(payload, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Registration Successful');
                } catch (err) {
                    console.log(err);
                    toast.error('Failed to Registration');
                }
            },
            transformResponse: (response) => {
                return response as any;
            },
        },),
        confirmEmail: builder.mutation<any, ConfirmEmailSchemaType>({
            query: ({ ...payload }) => {
                var formData = new FormData();
                formData.append("email", payload.email);
                return {
                    url: `${apiPaths.sendForgotPasswordEmailUrl}`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                };
            },
            async onQueryStarted(payload, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Successfully send email');
                } catch (err) {
                    console.log(err);
                    toast.error('Please check your email');
                }
            },
            transformResponse: (response) => {
                return response as any;
            },
        },),
    }),
    overrideExisting: true
})
