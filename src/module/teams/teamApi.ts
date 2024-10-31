import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { PaginatedResponseType } from "@/core/types/responseTypes";
import { UserType } from "../user/userType";
import { TeamTemplateState } from "./teamTemplateTypes";
import { CategoryType, InviteMembersType, Team, TeamFormType, TeamRequest } from "./teamTypes";

const teamsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTeam: builder.mutation<Team, TeamFormType>({
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
                    console.error(err);
                }
            },

            invalidatesTags: (result, error, arg) => [{ type: 'Team', id: "LIST" }],
            transformResponse: (response) => {
                return response as Team
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
        intiviteMembers: builder.mutation<any, InviteMembersType>({
            query: ({ ...payload }) => {
                const formData = new FormData();
                formData.append('email', payload.email);
                formData.append('team', payload.team.toString());


                return {
                    url: `${apiPaths.teamRequestUrl}`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                }
            },

            async onQueryStarted(payload, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.error(err);
                }
            },

            invalidatesTags: (result, error, arg) => [{ type: 'RequestByTeam', id: "LIST" }],
            transformResponse: (response) => {
                return response
            }
        }),
        getMyTeams: builder.query<PaginatedResponseType<Team>, number>({
            query: (pageNumber) => `${apiPaths.teamsUrl}mine/?page=${pageNumber}`,
            providesTags: (response) =>
                response?.results
                    ? [
                        ...response.results.map((layout) => ({ type: 'Team', id: layout.id } as const)),
                        { type: 'Team', id: 'LIST' },
                    ]
                    : [{ type: 'Team', id: 'LIST' }],
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
        getRequestByTeam: builder.query<PaginatedResponseType<TeamRequest>, { pageNumber?: number, teamId: string }>({
            query: ({ pageNumber, teamId }) => `${apiPaths.requestByTeamUrl}${teamId}${pageNumber ? `?page=${pageNumber}` : ''}`,
            providesTags: (response) =>
                response?.results
                    ? [
                        ...response.results.map((requests) => ({ type: 'RequestByTeam', id: requests.id.toString() } as const)),
                        { type: 'RequestByTeam', id: 'LIST' },
                    ]
                    : [{ type: 'RequestByTeam', id: 'LIST' }],
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            onCacheEntryAdded: () => { },
            merge: (currentCache, newItems) => {
                if (currentCache.pagination.currentPage === newItems.pagination.currentPage) {
                    currentCache.pagination = newItems.pagination;
                    currentCache.results = newItems.results;
                } else {
                    currentCache.pagination = newItems.pagination;
                    currentCache.results.push(...newItems.results);
                }
            },
            forceRefetch({ currentArg, previousArg, }) {
                return currentArg !== previousArg;
            },
            transformResponse: (response: any) => {
                return response as PaginatedResponseType<TeamRequest>;
            },
        }),
        getEachTeamMembers: builder.query<Array<UserType>, { pageNumber: number, slug: string }>({
            query: ({ pageNumber, slug }) => `${apiPaths.teamsUrl}${slug}/members/`,
            providesTags: (response) =>
                response
                    ? [
                        ...response.map((layout) => ({ type: 'Member', id: layout.username } as const)),
                        { type: 'Member', id: 'LIST' },
                    ]
                    : [{ type: 'Member', id: 'LIST' }],
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}-${queryArgs.slug}`;
            },
            // merge: (currentCache, newItems) => {
            //     currentCache.pagination = newItems.pagination;
            //     currentCache.results.push(...newItems.results);
            // },
            // forceRefetch({ currentArg, previousArg }) {
            //     return currentArg !== previousArg;
            // },
            transformResponse: (response: any) => {
                return response as Array<UserType>;
            },
        }),
        deleteTeamMember: builder.mutation<any, { teamSlug: string, userSlug: string }>({
            query: ({ teamSlug, userSlug }) => { return { url: `${apiPaths.teamUrl}${teamSlug}/member/${userSlug}`, method: "DELETE" } },
            invalidatesTags: (result, error, arg) => [{ type: 'Member', id: arg.userSlug }],
            async onQueryStarted(payload, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.error(err);
                }
            },
            transformResponse: (response: any) => {
                return response as Array<UserType>;
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
                if (payload.design.showSocialIcons != undefined) formData.append('card_design.show_social_icons', payload.design.showSocialIcons.toString())
                if (payload.design.darkMode != undefined) formData.append('card_design.dark_mode', payload.design.darkMode.toString())
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