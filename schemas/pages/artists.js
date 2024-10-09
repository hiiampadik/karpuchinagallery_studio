import {defineArrayMember, defineField, defineType} from 'sanity'
import {definePageType, PageTreeField, PageTreeInput} from '@q42/sanity-plugin-page-tree'
import {pageTreeConfig} from '../../page-tree-config'

const _artistsType = defineType({
  name: 'artists',
  title: 'Artists',
  type: 'document',

  fieldsets: [
    {
      name: 'info',
      title: 'Info',
      options: {
        columns: 2,
      },
    },
  ],

  fields: [
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The slug is the unique part of the URL for this document. It should be lowercase and contain only letters, numbers, or dashes.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'artists' }, { type: 'artworks' }],
          components: {
            input: props => PageTreeInput({ ...props, config: pageTreeConfig }),
          },
        }),
      ],
    }),

    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'page',
          title: 'Page',
          type: 'reference',
          validation: Rule => Rule.required(),
          to: [{ type: 'artworks' }, { type: 'artists' }],
          components: {
            field: props => PageTreeField({ ...props, config: pageTreeConfig }),
          },
        }),
      ],
    }),


    defineField({
      title: 'Cover',
      name: 'cover',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'bio',
      type: 'localizedRichParagraph',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
    },
  },
})

export const artistType = definePageType(_artistsType, pageTreeConfig, {
  isRoot: true,
});