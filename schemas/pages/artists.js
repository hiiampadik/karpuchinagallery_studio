import {defineField, defineType} from 'sanity'

export default defineType({
  name: "artists",
  title: "Artists",
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

    // todo knihovna medii organizovanejsi
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

    // todo  works + selected
  // todo second bio

  ],

  preview: {
    select: {
      title: "name"}
  },
});
