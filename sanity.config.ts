import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import homepage from './schemas/pages/homepage'
import about from './schemas/pages/about'
import artists from './schemas/pages/artists'
import figure from './schemas/components/figure'
import galleryArray from './schemas/components/galleryArray'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import localizedString from './schemas/objects/localizedString'
import localizedText from './schemas/objects/localizedText'
import {i18n} from './languages'
import localizedRichParagraph from './schemas/objects/localizedRichParagraph'
import blockRichParagraph from './schemas/components/blockRichParagraph'
import blockRichText from './schemas/components/blockRichText'
import localizedRichText from './schemas/objects/localizedRichText'
import exhibitions from './schemas/pages/exhibitions'
import {InferSchemaValues} from '@sanity-typed/types'
import {colorInput} from '@sanity/color-input'


const sanityConfig = defineConfig({
  name: 'default',
  title: 'Karpuchina Gallery',

  projectId: 'ai1apfv0',
  dataset: 'production',

  plugins: [
    visionTool(),
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({type: 'artists', S, context}),

            S.listItem().title('Homepage').child(S.document().schemaType('homepage').documentId('homepage')),

            S.listItem().title('About').child(S.document().schemaType('about').documentId('about')),

            // List out the rest of the document types, but filter out the config type
            ...S.documentTypeListItems().filter(
              (listItem) => !['about', 'homepage'].includes(listItem.getId() ?? ''),
            ),
          ]),
    }),
    colorInput(),
    // documentInternationalization({
    //   supportedLanguages: i18n.languages,
    //   schemaTypes: ['about'],
    // }),
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
    types: (prevTypes: any) => {
      return [
        ...prevTypes,
        homepage,
        about,
        artists,
        exhibitions,

        figure,
        blockRichText,
        blockRichParagraph,
        galleryArray,

        localizedRichText,
        localizedRichParagraph,
        localizedString,
        localizedText,
      ]
    },
  },
})

export default sanityConfig
export type SanityValues = InferSchemaValues<typeof sanityConfig>
