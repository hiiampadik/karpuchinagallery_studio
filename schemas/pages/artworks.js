import {defineField, defineType} from 'sanity'
import {definePageType} from '@q42/sanity-plugin-page-tree'
import {pageTreeConfig} from '../../page-tree-config'

const _artworkType = defineType({
  name: "artworks",
  title: "Artworks",
  type: "document",
  fields: [

    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      title: "Cover",
      name: "cover",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title.cs"}
  },
});


export const artworkType = definePageType(_artworkType, pageTreeConfig)
