import { defineField, defineType, defineArrayMember } from '@sanity-typed/types'

export default defineType({
  name: "exhibitions",
  title: "Exhibitions",
  type: "document",

  fieldsets: [
    {
      name: "info",
      title: "Info",
      options: {
        columns: 2
      },
    },
  ],
  fields: [
    defineField({
      name: "orderRank",
      title: "Order",
      type: "string",
      hidden: true,
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      fieldset: "info",
      validation: (Rule) => Rule.required(),
    }),
    defineField(    {
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: "info",
      options: {
        source: "title.cs",
        maxLength: 96,
      },
    }),
    defineField(    {
      name: 'artists',
      title: 'Artists',
      type: "array",
      of: [
        defineArrayMember({
          title: "Artist",
          type: 'reference',
          to: [{type: 'artists' }]
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title.cs"}
  },
});
