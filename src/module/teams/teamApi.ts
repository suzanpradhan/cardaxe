import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { PaginatedResponseType } from "@/core/types/responseTypes";
import { CategoryType, Team, TeamFormType } from "./teamTypes";

const teamsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTeam: builder.mutation<any, TeamFormType>({
            query: ({ ...payload }) => {
                const formData = new FormData();
                formData.append('name', payload.name);
                formData.append('category', payload.category.value);
                if (payload.logo) formData.append('logo', payload.logo);
                if (payload.bio != undefined) formData.append('bio', payload.bio);
                if (payload.ceo != undefined) formData.append('ceo', payload.ceo);
                if (payload.foundedAt != undefined) formData.append('founded_at', payload.foundedAt.toISOString());
                if (payload.headquater != undefined) formData.append('address', payload.headquater);
                if (payload.founders != undefined) formData.append('founded_by', payload.founders);


                return {
                    url: `${apiPaths.teamsUrl}`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                }
            },

            async onQueryStarted(payload, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.log(err);
                }
            },

            // invalidatesTags: (result, error, arg) => [{ type: 'Connections', id: arg.id }],
            transformResponse: (response) => {
                console.log("response", response);
                return response
            }
        }),
        getTeamsCategory: builder.query<PaginatedResponseType<CategoryType>, number>({
            query: (pageNumber) => `${apiPaths.getTeamsCategoryUrl}?page=${pageNumber}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.pagination = newItems.pagination;
                currentCache.results.push(...newItems.results);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            transformResponse: (response: any) => {
                return response as PaginatedResponseType<CategoryType>;
            },
        }),
        getMyTeams: builder.query<PaginatedResponseType<Team>, number>({
            query: (pageNumber) => `${apiPaths.teamsUrl}?page=${pageNumber}`,
            providesTags: (response) =>
                response?.results
                    ? [
                        ...response.results.map((layout) => ({ type: 'Team', id: layout.id } as const)),
                        { type: 'TeamList', id: 'LIST' },
                    ]
                    : [{ type: 'TeamList', id: 'LIST' }],
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.pagination = newItems.pagination;
                currentCache.results.push(...newItems.results);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            transformResponse: (response: any) => {
                return response as PaginatedResponseType<Team>;
            },
        }),
        getEachTeam: builder.query<Team, string>({
            query: (teamId) => `${apiPaths.teamsUrl}${teamId}/`,
            serializeQueryArgs: ({ queryArgs, endpointName }) => {
                return endpointName + '-' + queryArgs;
            },

            providesTags: (result, error, id) => [{ type: 'Team', id: id }],
            transformResponse: (response: any) => {
                return response;
            },
        }),
    }),
    overrideExisting: true,
})

export default teamsApi;