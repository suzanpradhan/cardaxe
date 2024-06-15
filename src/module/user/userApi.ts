import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { snakeToCamel } from "@/core/utils/generalFunctions";
import { toast } from "react-toastify";
import { UserDetailType, UserType } from "./userType";

const userApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getUser: builder.query<UserType, void>({
            query: () => `${apiPaths.profileUrl}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            providesTags: ['User'],
            transformResponse: (response: any) => {
                const camelCaseResponse = snakeToCamel(response)
                console.log(camelCaseResponse)
                return camelCaseResponse;
            },
        }),
        updateUser: builder.mutation<UserType, UserDetailType>({
            query: ({ ...payload }) => ({
                url: `${apiPaths.profileUrl}`,
                method: 'PATCH',
                body: payload,
            }),
            async onQueryStarted(payload, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Profile updated.');
                } catch (err) {
                    console.log(err);
                    // toast.error();
                    toast.error('Failed updating profile.');
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
        }),
    }),
    overrideExisting: true,
})

export default userApi;