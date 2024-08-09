import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
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
                if (payload.timeStamp != undefined) formData.append('timestamp', payload.timeStamp);
                if (payload.accepted != undefined) formData.append('accepted', payload.accepted.toString());
                return {
                    url: `${apiPaths.connectUrl}${id}/send_request`,
                    method: 'PATCH',
                    body: formData,
                    formData: true,
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Connections', id: arg.id }],
            transformResponse: (response: { data: any }) =>
                response.data,
            transformErrorResponse: (
                response: { status: string | number }
                // meta,
                // arg
            ) => response.status,
        }),
    }),
    overrideExisting: true,
})

export default connectApi;