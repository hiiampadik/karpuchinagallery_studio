import {defineArrayMember, defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: "artists",
  title: "Artists",
  type: "document",
  orderings: [orderRankOrdering],

  fieldsets: [
    {
      name: "info",
      title: "Info",
      options: {
        columns: 2
      },
    },

    {
      name: "additionalInfo",
      title: "Additional Info",
      options: {
        collapsible: true,
        columns: 1
      },
    },
  ],

  fields: [
    orderRankField({
      type: "category",
      newItemPosition: "after"
    }),

    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField(    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: 'The slug is the unique part of the URL for this document. It should be lowercase and contain only letters, numbers, or dashes.',
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      title: "Cover",
      name: "cover",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'bio',
      type: 'localizedRichParagraph',
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      type: 'soloExhibitions',
      name: 'soloExhibitions',
      fieldset: 'additionalInfo'
    }),

    defineField({
      type: 'groupExhibitions',
      name: 'groupExhibitions',
      fieldset: 'additionalInfo'
    }),

    defineField({
      type: 'education',
      name: 'education',
      fieldset: 'additionalInfo'
    }),

    defineField({
      type: 'awards',
      name: 'awards',
      fieldset: 'additionalInfo'
    }),

    defineField({
      name: 'events',
      title: 'Exhibitions / Fairs',
      type: "array",
      of: [
        defineArrayMember({
          title: "Event",
          type: 'reference',
          to: [{type: 'exhibitions' }, {type: 'fairs' }]
        }),
      ],
      validation: Rule => Rule.unique(),
    }),

  ],

  preview: {
    select: {
      title: "name",
      media: "cover"
    },
    prepare(selection) {
      const {title, media} = selection;
      return {
        title: title ?? 'Draft',
        media: media
      };
    }
  },
});
