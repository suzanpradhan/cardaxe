import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { PaginatedResponseType } from "@/core/types/responseTypes";
import { snakeToCamel } from "@/core/utils/generalFunctions";
import { CardResponseType, CardTemplatesType, ContentFormSchemaType, CreateCardResponseType, DesignFromSchemaType, LikeCardResponse, LikeCardSchemaType, SocialMediaInfo, UpdateCardParams } from "./cardsType";

const cardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCardsTemplates: builder.query<PaginatedResponseType<CardTemplatesType>, number>({
      query: (pageNumber) => `${apiPaths.getCardTemplatesUrl}?page=${pageNumber}`,
      providesTags: (response) =>
        response?.results
          ? [
            ...response.results.map((layout) => ({ type: 'CardLayout', id: layout.id } as const)),
            { type: 'CardLayout', id: 'LIST' },
          ]
          : [{ type: 'CardLayout', id: 'LIST' }],
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
        const camelCaseResponse = snakeToCamel(response)
        return camelCaseResponse as PaginatedResponseType<CardTemplatesType>;
      },
    }),
    getCardTemmplate: builder.query<CardTemplatesType, string>({
      query: (templateId) => `${apiPaths.getCardTemplatesUrl}${templateId}/`,
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName + '-' + queryArgs;
      },

      providesTags: (result, error, id) => [{ type: 'CardLayout', id: id }],
      transformResponse: (response: any) => {
        const camelCaseResponse = snakeToCamel(response)
        return camelCaseResponse;
      },
    }),
    getCard: builder.query<CardResponseType<CardTemplatesType>, string>({
      query: (slug) => `${apiPaths.getCardUrl}${slug}/`,
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName + '-' + queryArgs;
      },
      providesTags: (result, error, slug) => [{ type: 'Card', id: slug }],
      transformResponse: (response: any) => {
        const camelCaseResponse = snakeToCamel(response)
        return camelCaseResponse;
      },
    }),
    getMyCards: builder.query<PaginatedResponseType<CardResponseType<CardTemplatesType>>, void>({
      query: () => `${apiPaths.getCardUrl}me/`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      providesTags: (response) =>
        response?.results
          ? [
            ...response.results.map((card) => ({ type: 'Card', id: card.slug } as const)),
            { type: 'Card', id: 'LIST' },
          ]
          : [{ type: 'Card', id: 'LIST' }],
      transformResponse: (response: any) => {
        const camelCaseResponse = snakeToCamel(response)
        return camelCaseResponse.results;
      },
    }),
    getAllCards: builder.query<PaginatedResponseType<CardResponseType<CardTemplatesType>>, number>({
      query: (pageNumber) => `${apiPaths.getCardUrl}?page=${pageNumber}`,
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
            ...response.results.map((card) => ({ type: 'Card', id: card.slug } as const)),
            { type: 'Card', id: 'LIST' },
          ]
          : [{ type: 'Card', id: 'LIST' }],
      transformResponse: (response: any) => {
        const camelCaseResponse = snakeToCamel(response)
        return camelCaseResponse;
      },
    }),
    getUsersCard: builder.query<PaginatedResponseType<CardResponseType<CardTemplatesType>>, { pageNumber: number, slug: string }>({
      query: ({ pageNumber, slug }) => `${apiPaths.getPublicCardsUrl}${slug}?page=${pageNumber}`,
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
            ...response.results.map((card) => ({ type: 'Card', id: card.slug } as const)),
            { type: 'Card', id: 'LIST' },
          ]
          : [{ type: 'Card', id: 'LIST' }],
      transformResponse: (response: any) => {
        const camelCaseResponse = snakeToCamel(response)
        return camelCaseResponse;
      },
    }),
    createCard: builder.mutation<CreateCardResponseType<CardTemplatesType>, { user: string, title: string }>({
      query: ({ user, title }) => {
        // var formData = new FormData();
        const payload = {
          'card_fields': {},
          'card_design': {},
          'user': user,
          'title': title,
          "card_template": 2
        }
        return {
          url: `${apiPaths.cardsUrl}`,
          method: 'POST',
          body: payload,
        }
      },
      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
          // toast.success('Card successfully created.');
        } catch (err) {
          console.error(err);
          // toast.error('Failed createing card!!');
        }
      },
      invalidatesTags: [{ type: 'Card', id: 'LIST' }],
      transformResponse: (response: any) => {
        const camelCaseResponse = snakeToCamel(response)
        return camelCaseResponse;
      },
    }),
    likeCard: builder.mutation<LikeCardResponse, LikeCardSchemaType>({
      query: (card) => {
        return {
          url: `${apiPaths.favoritesUrl}`,
          method: 'POST',
          body: card,
        }
      },
      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
          // toast.success('Card successfully created.');
        } catch (err) {
          console.error(err);
          // toast.error('Failed createing card!!');
        }
      },

      // invalidatesTags: [{ type: 'CardsList', id: 'LIST' }],
      invalidatesTags: (result, error, arg) => [{ type: 'Card', id: "LIST" }],
      transformResponse: (response: any) => {
        const camelCaseResponse = snakeToCamel(response)
        return camelCaseResponse;
      },
    }),
    dislikeCard: builder.mutation<LikeCardResponse, string>({
      query: (cardSlug) => {
        return {
          url: `${apiPaths.favoritesUrl}${cardSlug}/`,
          method: 'DELETE',
        }
      },
      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
          // toast.success('Card successfully created.');
        } catch (err) {
          console.error(err);
          // toast.error('Failed createing card!!');
        }
      },

      invalidatesTags: (result, error, arg) => [{ type: 'Card', id: "LIST" }],
      transformResponse: (response: any) => {
        const camelCaseResponse = snakeToCamel(response)
        return camelCaseResponse;
      },
    }),

    upDateCard: builder.mutation<any, UpdateCardParams<string>>({
      query: ({ userId, cardSlug, ...payload }) => {
        const fecthCachedImage = async (name: string) => {
          const cache = await caches.open('filesCache');
          const response = await cache.match(name);
          if (!response) return;
          const blob = await response.blob();
          await cache.delete(name)
          return blob;

        }

        const formData = new FormData();
        if (payload.cardFields.id != undefined) formData.append('card_fields.id', payload.cardFields.id.toString())
        if (payload.cardFields.title != undefined) formData.append('card_fields.title', payload.cardFields.title)
        if (payload.cardFields.prefix != undefined) formData.append('card_fields.prefix', payload.cardFields.prefix)
        if (payload.cardFields.firstName != undefined) formData.append('card_fields.first_name', payload.cardFields.firstName)
        if (payload.cardFields.lastName != undefined) formData.append('card_fields.last_name', payload.cardFields.lastName)
        if (payload.cardFields.suffix != undefined) formData.append('card_fields.suffix', payload.cardFields.suffix)
        if (payload.cardFields.bio != undefined) formData.append('card_fields.bio', payload.cardFields.bio)
        if (payload.cardFields.phone != undefined) formData.append('card_fields.phone', payload.cardFields.phone)
        if (payload.cardFields.email != undefined) formData.append('card_fields.email', payload.cardFields.email)
        if (payload.cardFields.address != undefined) formData.append('card_fields.address', payload.cardFields.address)
        if (payload.cardFields.middleName != undefined) formData.append('card_fields.middle_name', payload.cardFields.middleName)
        if (payload.cardFields.designation != undefined) formData.append('card_fields.designation', payload.cardFields.designation)
        if (payload.cardFields.department != undefined) formData.append('card_fields.department', payload.cardFields.department)
        if (payload.cardFields.company != undefined) formData.append('card_fields.company', payload.cardFields.company)
        if (payload.cardFields.website != undefined) formData.append('card_fields.website', payload.cardFields.website)
        if (payload.cardDesign.id != undefined) formData.append('card_design.id', payload.cardDesign.id.toString())
        if (payload.cardDesign.backgroundColor != undefined) formData.append('card_design.background_color', payload.cardDesign.backgroundColor)
        if (payload.cardDesign.foregroundColor != undefined) formData.append('card_design.foreground_color', payload.cardDesign.foregroundColor)
        if (payload.cardDesign.backgroundImage != undefined && payload.cardDesign.backgroundImage.length > 0) {
          fecthCachedImage('backgroundImage').then((response) => {
            if (response) { formData.append('card_design.background_image', new File([response], 'filename.png')) }
            else { formData.append('card_design.background_image', payload.cardDesign.backgroundImage!) }
          });
        } else { formData.append('card_design.background_image', '') }
        if (payload.cardDesign.backgroundImage != undefined && payload.cardDesign.backgroundImage.length > 0) {
          fecthCachedImage('logo').then((response) => {
            if (response) { formData.append('card_design.logo', new File([response], 'filename.png')) }
            else { formData.append('card_design.logo', payload.cardDesign.logo!) }
          });
        } else { formData.append('card_design.logo', '') }
        if (payload.cardDesign.showLogo != undefined) formData.append('card_design.show_logo', payload.cardDesign.showLogo.toString())
        if (payload.cardDesign.showSocialIcons != undefined) formData.append('card_design.show_social_icons', payload.cardDesign.showSocialIcons.toString())
        if (payload.cardDesign.darkMode != undefined) formData.append('card_design.dark_mode', payload.cardDesign.darkMode.toString())
        if (payload.isPublished != undefined) formData.append('is_published', payload.isPublished.toString())
        if (userId != undefined) formData.append('user', userId.toString())
        if (payload.cardBasics.slug) formData.append("slug", payload.cardBasics.slug)
        if (payload.cardBasics.title) formData.append("title", payload.cardBasics.title)
        if (payload.isDefault != undefined) formData.append('is_default', payload.isDefault as unknown as string)
        if (payload.cardTemplate != undefined) formData.append('card_template', payload.cardTemplate)
        if (payload.cardInfos && Object.entries(payload.cardInfos).length != 0) {
          Object.values(payload.cardInfos).filter((info) => info?.url?.length != 0).forEach((info) => {
            if (info?.id) formData.append(`card_infos[][id]`, info?.id);
            if (info?.url) formData.append(`card_infos[][url]`, info?.url);
            if (info?.displayText) formData.append(`card_infos[][display_text]`, info?.displayText);
            if (info?.cardInfoId) formData.append(`card_infos[][card_info_id]`, info?.cardInfoId);
          })
        }
        return {
          url: `${apiPaths.cardsUrl}${cardSlug}/`,
          method: 'PATCH',
          body: formData,
          formData: true,
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Card', id: arg.cardBasics.slug ?? 'slug' }],
      transformResponse: (response: { data: any }) =>
        response,
      transformErrorResponse: (
        response: { status: string | number }
        // meta,
        // arg
      ) => response.status,
    }),
    updateContents: builder.mutation<any, ContentFormSchemaType>({
      query: ({ id, ...payload }) => {
        var formData = new FormData();
        if (payload.prefix) formData.append('prefix', payload.prefix);
        formData.append('first_name', payload.firstName);
        if (payload.middleName) {
          formData.append('middle_name', payload.middleName);
        }
        formData.append('last_name', payload.lastName);
        if (payload.designation) formData.append('designation', payload.designation);
        if (payload.department) formData.append('department', payload.department);
        if (payload.company) formData.append('company', payload.company);
        if (payload.suffix) formData.append('suffix', payload.suffix);
        if (payload.bio) formData.append('bio', payload.bio);
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
        if (payload.backgroundColor) formData.append('background_color', payload.backgroundColor);
        if (payload.backgroundImage?.[0])
          formData.append('background_image', payload.backgroundImage[0]);
        if (payload.logo) formData.append('logo_url', payload.logo);
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
    getDefaultCard: builder.query<CardResponseType<CardTemplatesType>, string>({
      query: (userName) => `${apiPaths.getDefaultCardUrl}${userName}/`,
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName + '-' + queryArgs;
      },
      providesTags: (result, error, id) => [{ type: 'Card', id: id }],
      transformResponse: (response: any) => {
        const camelCaseResponse = snakeToCamel(response)
        return camelCaseResponse;
      },
    }),
    getSocialInfos: builder.query<Array<SocialMediaInfo>, void>({
      query: () => apiPaths.getSocialInfosUrl,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      transformResponse: (response: any) => {
        const camelCaseResponse = snakeToCamel(response)
        return camelCaseResponse;
      },
    }),
  }),
  overrideExisting: true,
})

export default cardsApi;