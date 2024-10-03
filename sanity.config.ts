import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import about from "./schemas/pages/about";
import artists from "./schemas/pages/artists";
import figure from "./schemas/components/figure";
import gallery from "./schemas/components/gallery";
import blockContent from "./schemas/components/blockContent";
import blockCredits from "./schemas/components/blockCredits";
import galleryArray from "./schemas/components/galleryArray";
import {orderableDocumentListDeskItem, orderRankField, orderRankOrdering} from "@sanity/orderable-document-list";
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import localizedString from './schemas/objects/localizedString'
import localizedText from './schemas/objects/localizedText'
import {i18n} from './languages'
import {documentInternationalization} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'Karpuchina Gallery',

  projectId: 'ai1apfv0',
  dataset: 'production',

  plugins: [
    visionTool(),
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            orderableDocumentListDeskItem({type: 'artists', S, context}),

            S.listItem()
              .title("About")
              .child(S.document().schemaType("about").documentId("about")),

            // List out the rest of the document types, but filter out the config type
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !["about"].includes(listItem.getId() ?? '')
            ),

          ])
    }),
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: ['about'],
    }),
    internationalizedArray({
      languages: i18n.languages,
      defaultLanguages: [i18n.base],
      fieldTypes: ['string', 'text'],
    }),
  ],

  // schema: {
  //   types: schemaTypes,
  // },

  schema: {
    types: (prevTypes) => {
      return [
        ...prevTypes,
        about,
        artists,

        figure,
        gallery,

        blockContent,
        blockCredits,
        galleryArray,

        localizedString,
        localizedText,
      ]
    }
  },
})
