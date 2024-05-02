import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { PaginatedResponseType } from "@/core/types/responseTypes";
import { CardTemplatesType, ContentFormSchemaType, DesignFromSchemaType } from "./cardsType";

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
        if (payload.middleName) {
          formData.append('middle_name', payload.middleName);
        }
        formData.append('last_name', payload.lastName);
        formData.append('designation', payload.designation);
        formData.append('department', payload.department);
        formData.append('company', payload.company);
        formData.append('suffix', payload.suffix);
        formData.append('bio', payload.bio);
        if (payload.website) {
          formData.append('website', payload.website)
        }
        formData.append('phone', payload.phone);
        formData.append('email', payload.email);
        return {
          url: `${apiPaths.updateContentUrl}${id}/`,
          method: 'PATCH',
          body: formData,
        }
      },
      transformResponse: (response: { data: any }) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number }
        // meta,
        // arg
      ) => response.status,
    }),
    updateDesigns: builder.mutation<any, DesignFromSchemaType>({
      query: ({ id, ...payload }) => {
        var formData = new FormData();
        formData.append('background_color', payload.backgroundColor);
        if (payload.backgroundImage)
          formData.append('background_image', payload.backgroundImage);
        formData.append('logo_url', payload.logoUrl);
        if (payload.showLogo)
          formData.append('show_logo', payload.showLogo.toString());

        if (payload.showSocialIcons)
          formData.append('show_social_icons', payload.showSocialIcons.toString());

        if (payload.darkMode)
          formData.append('dark_mode', payload.darkMode.toString());

        return {
          url: `${apiPaths.updateContentUrl}${id}/`,
          method: 'PATCH',
          body: formData,
        }
      },

      transformResponse: (response: { data: any }) =>
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