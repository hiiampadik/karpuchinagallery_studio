import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: "fairs",
  title: "Fairs",
  type: "document",
  fieldsets: [
    {
      name: "texts",
      title: "Texts",
      options: {
        collapsible: true,
        columns: 1,
      },
    },
    {
      name: "details",
      title: "Details",
      options: {
        collapsible: true,
        columns: 1,
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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: 'The slug is the unique part of the URL for this document. It should be lowercase and contain only letters, numbers, or dashes.',
      options: {
        source: "title.cs",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      title: "Cover",
      name: "cover",
      type: "image",
      fieldset: 'details',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
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
      validation: Rule => Rule.unique(),
    }),
  ],

  preview: {
    select: {
      title: "title.cs"}
  },
});
