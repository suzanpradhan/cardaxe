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
            providesTags: ['User'],
            transformResponse: (response: any) => {
                const camelCaseResponse = snakeToCamel(response)
                return camelCaseResponse;
            },
        }),

    }),
    overrideExisting: true,
})

export default userApi;