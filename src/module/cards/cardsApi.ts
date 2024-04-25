import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { PaginatedResponseType } from "@/core/types/responseTypes";
import { CardTemplatesType, ContentFormSchemaType, SnakeCardContentType } from "./cardsType";

const cardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query<PaginatedResponseType<CardTemplatesType[]>, void>({
      query: () => `${apiPaths.getCardTemplatesUrl}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName + '-' + 'get-cards-endpoint';
      },
      transformResponse: (response: any) => {
        // console.log(response.data.contents);
        console.log('response:' + response)
        return response.results as any;
      },
    }),
    updateContents: builder.mutation<any, ContentFormSchemaType>({
      query: ({ id, ...payload }) => {
        var formData = new FormData();
        formData.append('prefix', payload.prefix);
        formData.append('first_name', payload.firstName);
        formData.append('middle_name', payload.middleName);
        formData.append('last_name', payload.lastName);
        formData.append('designation', payload.designation);
        formData.append('department', payload.department);
        formData.append('company', payload.company);
        formData.append('suffix', payload.suffix);
        formData.append('bio', payload.bio);
        formData.append('website', payload.website)
        formData.append('phone', payload.phone);
        formData.append('email', payload.email);
        return {
          url: `${apiPaths.updateContentUrl}${id}/`,
          method: 'PUT',
          body: formData,
        }
      },

      transformResponse: (response: { data: SnakeCardContentType }) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number }
        // meta,
        // arg
      ) => response.status,
    }),
  })
})

export default cardsApi;