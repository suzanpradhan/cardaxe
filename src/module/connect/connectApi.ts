import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { PaginatedResponseType } from "@/core/types/responseTypes";
import { ConnectionType } from "./connectTypes";

const connectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendRequest: builder.mutation<any, ConnectionType>({
            query: ({ id, ...payload }) => {
                const formData = new FormData();
                if (payload.to_user.fullname != undefined) formData.append('to_user.fullname', payload.to_user.fullname);
                if (payload.to_user.username != undefined) formData.append('to_user.username', payload.to_user.username);
                if (payload.to_user.email != undefined) formData.append('to_user.email', payload.to_user.email);
                if (payload.from_user.fullname != undefined) formData.append('from_user.fullname', payload.from_user.fullname);
                if (payload.from_user.username != undefined) formData.append('from_user.username', payload.from_user.username);
                if (payload.from_user.email != undefined) formData.append('from_user.email', payload.from_user.email);
                if (payload.timestamp != undefined) formData.append('timestamp', payload.timestamp);
                if (payload.accepted != undefined) formData.append('accepted', payload.accepted.toString());
                return {
                    url: `${apiPaths.connectUrl}${id}/send_request/`,
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

            invalidatesTags: (result, error, arg) => [{ type: 'Connections', id: "LIST" }, { type: 'Card', id: "LIST" },],
            transformResponse: (response) => {
                return response
            }
        }),
        acceptRequest: builder.mutation<any, ConnectionType>({
            query: ({ id, ...payload }) => {
                const formData = new FormData();
                if (payload.to_user.fullname != undefined) formData.append('to_user.fullname', payload.to_user.fullname);
                if (payload.to_user.username != undefined) formData.append('to_user.username', payload.to_user.username);
                if (payload.to_user.email != undefined) formData.append('to_user.email', payload.to_user.email);
                if (payload.from_user.fullname != undefined) formData.append('from_user.fullname', payload.from_user.fullname);
                if (payload.from_user.username != undefined) formData.append('from_user.username', payload.from_user.username);
                if (payload.from_user.email != undefined) formData.append('from_user.email', payload.from_user.email);
                if (payload.timestamp != undefined) formData.append('timestamp', payload.timestamp);
                if (payload.accepted != undefined) formData.append('accepted', payload.accepted.toString());
                return {
                    url: `${apiPaths.connectUrl}${id}/accept_request/`,
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
            invalidatesTags: (result, error, arg) => [{ type: 'Connections', id: arg.id }, { type: "Card", id: "LIST" }],
            transformResponse: (response) => {
                return response
            }
        }),
        getConnectRequests: builder.query<PaginatedResponseType<ConnectionType>, number>({
            query: (pageNumber) => `${apiPaths.connectionRequestUrl}?page=${pageNumber}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                if (currentCache.pagination.currentPage === newItems.pagination.currentPage) {
                    currentCache.pagination = newItems.pagination;
                    currentCache.results = newItems.results;
                } else {
                    currentCache.pagination = newItems.pagination;
                    currentCache.results.push(...newItems.results);
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            providesTags: (response) =>
                response?.results
                    ? [
                        ...response.results.map((card) => ({ type: 'Connections', id: card.id } as const)),
                        { type: 'Connections', id: 'LIST' },
                    ]
                    : [{ type: 'Connections', id: 'LIST' }],
            transformResponse: (response: any) => {
                return response;
            },
        }),
    }),
    overrideExisting: true,
})

export default connectApi;