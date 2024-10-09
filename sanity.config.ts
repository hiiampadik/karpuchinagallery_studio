import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import about from './schemas/pages/about'
import figure from './schemas/components/figure'
import galleryArray from './schemas/components/galleryArray'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import localizedString from './schemas/objects/localizedString'
import localizedText from './schemas/objects/localizedText'
import {i18n} from './languages'
import localizedRichParagraph from './schemas/objects/localizedRichParagraph'
import blockRichParagraph from './schemas/components/blockRichParagraph'
import blockRichText from './schemas/components/blockRichText'
import localizedRichText from './schemas/objects/localizedRichText'
import exhibitions from './schemas/pages/exhibitions'
import {colorInput} from '@sanity/color-input'
import fairs from './schemas/pages/fairs'
import {createPageTreeDocumentList} from '@q42/sanity-plugin-page-tree'
import {pageTreeConfig} from './page-tree-config'
import homepage from './schemas/pages/homepage'
import {artworkType} from './schemas/pages/artworks'
import {artistType} from './schemas/pages/artists'

const sanityConfig = defineConfig({
  name: 'default',
  title: 'Karpuchina Gallery',

  projectId: 'ai1apfv0',
  dataset: 'production',

  plugins: [
    // structureTool({
    //   structure: (S, context) =>
    //     S.list()
    //       .title('KG Website')
    //       .items([
    //         orderableDocumentListDeskItem({type: 'artists', S, context}),
    //
    //         S.listItem().title('Homepage').child(S.document().schemaType('homepage').documentId('homepage')),
    //
    //         S.listItem().title('About').child(S.document().schemaType('about').documentId('about')),
    //
    //         // List out the rest of the document types, but filter out the config type
    //         ...S.documentTypeListItems().filter(
    //           (listItem) => !['about', 'homepage'].includes(listItem.getId() ?? ''),
    //         ),
    //       ]),
    // }),
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('KG Website')
          .items([

            S.listItem().title('Homepage').child(S.document().schemaType('homepage').documentId('homepage')),
            S.listItem().title('About').child(S.document().schemaType('about').documentId('about')),

            // S.listItem()
            //   .title('Artists')
            //   .child(
            //     createPageTreeDocumentList(S, {
            //       config: pageTreeConfig,
            //       extendDocumentList: (builder) =>
            //         builder.id('pages').title('Pages').apiVersion(pageTreeConfig.apiVersion),
            //     }),
            //   ),


            ...S.documentTypeListItems().filter(
              (listItem) => !['about', 'homepage', 'artists'].includes(listItem.getId() ?? ''),
            ),
          ]),
    }),
    colorInput(),
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
        exhibitions,
        fairs,
        artistType,
        artworkType,

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
