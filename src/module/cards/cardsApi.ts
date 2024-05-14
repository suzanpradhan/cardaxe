import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { PaginatedResponseType } from "@/core/types/responseTypes";
import { snakeToCamel } from "@/core/utils/generalFunctions";
import { toast } from "react-toastify";
import { CardTemplatesType, ContentFormSchemaType, DesignFromSchemaType, UpdateCardParams, UpdateCardState } from "./cardsType";

const cardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query<PaginatedResponseType<CardTemplatesType[]>, void>({
      query: () => `${apiPaths.getCardTemplatesUrl}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName + '-' + 'get-cards-endpoint';
      },
      transformResponse: (response: any) => {
        const camelCaseResponse = snakeToCamel(response)
        return camelCaseResponse.results as any;
      },
    }),
    getCard: builder.query<UpdateCardState<CardTemplatesType>['card'], string>({
      query: (cardId) => `${apiPaths.getCardUrl}${cardId}/`,
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName + '-' + queryArgs;
      },
      async onQueryStarted(payload, { queryFulfilled },) {
        try {
          await queryFulfilled;
          console.log('query process.', payload);
        } catch (err) {
          console.log(err);
        }
      },
      providesTags: (result, error, id) => [{ type: 'Card', id: id }],
      transformResponse: (response: any) => {
        const camelCaseResponse = snakeToCamel(response)
        console.log(camelCaseResponse)
        return camelCaseResponse;
      },
    }),

    createCard: builder.mutation<any, string>({
      query: (user) => {
        // var formData = new FormData();
        const payload = {
          'card_fields': {},
          'card_design': {},
          "is_published": false,
          'user': user,
          "card_template": 1
        }
        // formData.append('card_fields', JSON.stringify({}))
        // formData.append('card_design', JSON.stringify({}))
        // formData.append('is_published', 'true')
        // formData.append('user', user)
        // formData.append('card_template', '1')

        // formData.append('card_fields[first_name]', payload.cardFields.prefix)
        // formData.append('card_fields[last_name]', payload.cardFields.prefix)
        // formData.append('card_fields[suffix]', payload.cardFields.prefix)
        // formData.append('card_fields[bio]', payload.cardFields.prefix)
        // formData.append('card_fields[phone]', payload.cardFields.prefix)
        // formData.append('card_fields[email]', payload.cardFields.prefix)
        // formData.append('card_fields[middle_name]', payload.cardFields.prefix)
        // formData.append('card_fields[designation]', payload.cardFields.prefix)
        // formData.append('card_fields[department]', payload.cardFields.prefix)
        // formData.append('card_fields[company]', payload.cardFields.prefix)
        // formData.append('card_fields[website]', payload.cardFields.prefix)
        // formData.append('card_design[logo_url]', payload.cardFields.prefix)
        // formData.append('card_design[show_logo]', payload.cardFields.prefix)
        // formData.append('card_design[show_social_icons]', payload.cardFields.prefix)
        // formData.append('card_design[dark_mode]', payload.cardFields.prefix)
        // formData.append('card_design[dark_mode]', payload.cardFields.prefix)
        // formData.append('card_design[dark_mode]', payload.cardFields.prefix)
        // formData.append('card_design[dark_mode]', payload.cardFields.prefix)
        return {
          url: `${apiPaths.cardsUrl}`,
          method: 'POST',
          body: payload,
        }
      },

      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Card successfully created.');
        } catch (err) {
          console.log(err);
          toast.error('Failed createing card!!');
        }
      },
    }),
    upDateCard: builder.mutation<any, UpdateCardParams & UpdateCardState<string>['card']>({
      query: ({ userId, cardId, ...payload }) => {
        const formData = new FormData();
        if (payload.cardFields.prefix) formData.append('card_fields.prefix', payload.cardFields.prefix)
        if (payload.cardFields.firstName) formData.append('card_fields.first_name', payload.cardFields.firstName)
        if (payload.cardFields.lastName) formData.append('card_fields.last_name', payload.cardFields.lastName)
        if (payload.cardFields.suffix) formData.append('card_fields.suffix', payload.cardFields.suffix)
        if (payload.cardFields.bio) formData.append('card_fields.bio', payload.cardFields.bio)
        if (payload.cardFields.phone) formData.append('card_fields.phone', payload.cardFields.phone)
        if (payload.cardFields.email) formData.append('card_fields.email', payload.cardFields.email)
        if (payload.cardFields.middleName) formData.append('card_fields.middle_name', payload.cardFields.middleName)
        if (payload.cardFields.designation) formData.append('card_fields.designation', payload.cardFields.designation)
        if (payload.cardFields.department) formData.append('card_fields.department', payload.cardFields.department)
        if (payload.cardFields.company) formData.append('card_fields.company', payload.cardFields.company)
        if (payload.cardFields.website) formData.append('card_fields.website', payload.cardFields.website)
        if (payload.cardDesign.backgroundColor) formData.append('card_design.background_color', payload.cardDesign.backgroundColor)
        if (payload.cardDesign.logoUrl) formData.append('card_design.logo_url', payload.cardDesign.logoUrl)
        if (payload.cardDesign.showLogo) formData.append('card_design.show_logo', payload.cardDesign.showLogo.toString())
        if (payload.cardDesign.showSocialIcons) formData.append('card_design.show_social_icons', payload.cardDesign.showSocialIcons.toString())
        if (payload.cardDesign.darkMode) formData.append('card_design.dark_mode', payload.cardDesign.darkMode.toString())
        if (payload.isPublished) formData.append('is_published', payload.isPublished.toString())
        if (payload.user) formData.append('user', userId.toString())
        if (payload.cardTemplate) formData.append('card_template', payload.cardTemplate.toString())
        var object: Record<string, any> = {};
        formData.forEach(function (value, key) {
          object[key] = value;
        });
        var json = JSON.stringify(object);
        console.log("sjon formdata", formData.values())

        return {
          url: `${apiPaths.cardsUrl}${cardId}/`,
          method: 'PATCH',
          // headers: { 'Content-Type': 'multipart/form-data', "type": "formData" },
          body: formData,
          formData: true,
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Card', id: arg.cardId }],
      transformResponse: (response: { data: any }) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number }
        // meta,
        // arg
      ) => response.status,
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
  }),
  overrideExisting: true,
})

export default cardsApi;