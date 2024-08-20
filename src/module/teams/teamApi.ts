import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { PaginatedResponseType } from "@/core/types/responseTypes";
import { TeamTemplateState } from "./teamTemplateTypes";
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
            query: (slug) => `${apiPaths.teamsUrl}${slug}/`,
            serializeQueryArgs: ({ queryArgs, endpointName }) => {
                return endpointName + '-' + queryArgs;
            },

            providesTags: (result, error, slug) => [{ type: 'Team', id: slug }],
            transformResponse: (response: any) => {
                return response;
            },
        }),
        createTeamTemplate: builder.mutation<any, TeamTemplateState<string>>({

            query: ({ ...payload }) => {
                const formData = new FormData();
                if (payload.design.backgroundColor != undefined) formData.append('card_design.background_color', payload.design.backgroundColor)
                if (payload.design.showLogo != undefined) formData.append('card_design.show_logo', payload.design.showLogo.toString())
                if (payload.otherValues.title != undefined) formData.append('title', payload.otherValues.title)
                if (payload.otherValues.template != undefined) formData.append('card_template', payload.otherValues.template)

                return {
                    url: `${apiPaths.teamTemplatesUrl}`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: 'TeamTemplate', id: "LIST" }],
            transformResponse: (response: { data: any }) =>
                response,
            transformErrorResponse: (
                response: { status: string | number }
                // meta,
                // arg
            ) => response.status,
        }),
    }),
    overrideExisting: true,
})

export default teamsApi;