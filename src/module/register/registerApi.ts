import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { toast } from "react-toastify";
import { RegistrationSchemaType } from "./registerType";

export const registerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation<any, RegistrationSchemaType>({
            query: ({ ...payload }) => {
                console.log("payload", payload)
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
            invalidatesTags: ['Signup'],
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
                console.log(response);
                return response as any;
            },
        },),
    }),
    overrideExisting: true
})
