import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { snakeToCamel } from "@/core/utils/generalFunctions";
import { UserType } from "./userType";

const userApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getUser: builder.query<UserType, void>({
            query: () => `${apiPaths.profileUrl}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            providesTags: (response) => [{ type: 'User', id: response?.id }],
            transformResponse: (response: any) => {
                const camelCaseResponse = snakeToCamel(response)
                return camelCaseResponse;
            },
        }),
        getPublicProfile: builder.query<UserType, string>({
            query: (slug) => `${apiPaths.publicProfileUrl}/${slug}`,
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}-${queryArgs}`;
            },
            providesTags: (result, error, arg) => [{ type: 'User', id: arg }],
            transformResponse: (response: any) => {
                const camelCaseResponse = snakeToCamel(response)
                return camelCaseResponse;
            },
        }),
        updateUser: builder.mutation<UserType, UserType>({
            query: ({ ...payload }) => {
                const formData = new FormData()
                formData.append("email", payload.email);
                formData.append("fullname", payload.fullname);
                formData.append('id', payload.id.toString());
                formData.append("username", payload.username);
                formData.append('gender', payload.gender);
                if (payload.bio) formData.append('bio', payload.bio);
                if (payload.address) formData.append('address', payload.address);
                if (payload.updateAvatar) formData.append("avatar", payload.updateAvatar);

                return ({
                    url: `${apiPaths.profileUrl}`,
                    method: 'PATCH',
                    body: formData,
                })
            },
            async onQueryStarted(payload, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.error(err);

                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }, { type: 'Card', id: "LIST" }],
        }),
    }),
    overrideExisting: true,
})

export default userApi;