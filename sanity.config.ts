import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {colorInput} from '@sanity/color-input'
import {i18n} from './languages'
import {HomeIcon, InfoOutlineIcon, UsersIcon, ImagesIcon, PresentationIcon} from '@sanity/icons'

import homepage from './schemas/pages/homepage'
import about from './schemas/pages/about'
import artists from './schemas/pages/artists'
import exhibitions from './schemas/pages/exhibitions'
import artworks from './schemas/pages/artworks'

import figure from './schemas/components/figure'
import galleryArray from './schemas/components/galleryArray'
import blockRichParagraph from './schemas/components/blockRichParagraph'
import blockRichText from './schemas/components/blockRichText'
import blockArtworks from './schemas/components/blockArtworks'
import artistAwards from './schemas/components/artistAwards'
import artistEducation from './schemas/components/artistEducation'
import artistGroupExhibition from './schemas/components/artistGroupExhibition'
import artistSoloExhibition from './schemas/components/artistSoloExhibition'

import localizedString from './schemas/objects/localizedString'
import localizedText from './schemas/objects/localizedText'
import localizedRichParagraph from './schemas/objects/localizedRichParagraph'
import localizedRichText from './schemas/objects/localizedRichText'
import documentsArray from './schemas/components/documentsArray'
import fairs from './schemas/pages/fairs'

const sanityConfig = defineConfig({
  name: 'default',
  title: 'Karpuchina Gallery',

  projectId: 'cg5jvog9',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([

            S.listItem()
              .title('Homepage')
              .icon(HomeIcon)
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')),

            S.listItem()
              .title('About')
              .icon(InfoOutlineIcon)
              .child(
                S.document()
                  .schemaType('about')
                  .documentId('about')),

            S.divider(),

            S.listItem()
              .title('Exhibitions')
              .icon(PresentationIcon)
              .child(
                S.documentList()
                  .title('Exhibitions')
                  .filter('_type == "exhibitions"')
                  .params({ order: 'startDate' })
                  .defaultOrdering([{ field: 'startDate', direction: 'asc' }])
              ),

            S.listItem()
              .title('Fairs')
              .icon(PresentationIcon)
              .child(
                S.documentList()
                  .title('Fairs')
                  .filter('_type == "fairs"')
                  .params({ order: 'startDate' })
                  .defaultOrdering([{ field: 'startDate', direction: 'asc' }])
              ),

            S.listItem()
              .title('Artists')
              .icon(UsersIcon)
              .child(
                S.documentList()
                  .title('Artists')
                  .filter('_type == "artists"')
              ),

            orderableDocumentListDeskItem({
              type: 'artists',
              title: 'Order of Artists',
              S, context}),

            S.divider(),


            S.listItem()
              .title('All Artworks')
              .icon(ImagesIcon)
              .child(
                S.documentList()
                  .title('All Artworks')
                  .filter('_type == "artworks"')
                  .defaultOrdering([{ field: 'artist', direction: 'asc' }])
              ),


            S.listItem()
              .title('Artworks by Artist')
              .icon(ImagesIcon)
              .child(
                S.documentTypeList('artists')
                  .title('Artists')
                  .child(artistId =>
                    S.documentList()
                      .title('Artworks')
                      .filter('_type == "artworks" && artist._ref == $artistId')
                      .params({ artistId }),
                  )
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

  schema: {
    types: (prevTypes: any) => {
      return [
        ...prevTypes,
        homepage,
        about,
        artists,
        artworks,
        fairs,
        exhibitions,

        figure,
        blockRichText,
        blockRichParagraph,
        blockArtworks,
        galleryArray,
        documentsArray,
        artistAwards,
        artistEducation,
        artistGroupExhibition,
        artistSoloExhibition,

        localizedRichText,
        localizedRichParagraph,
        localizedString,
        localizedText,
      ]
    },
  },
})

export default sanityConfig
