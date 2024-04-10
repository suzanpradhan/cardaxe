import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { CardTemplatesType, SnakeCardContentType } from "./cardsType";

const cardsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCards: builder.query<CardTemplatesType[], string>({
                  query: () => `${apiPaths.getCardTemplates}`,
                }),
                    updateContents: builder.mutation<Record<string, any>, Record<string, any>>({
      query: ({ id, ...cardDesign }) => ({
        url: `${apiPaths.updateContent}${id}/`,
        method: 'PUT',
        body: cardDesign,
      }),
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