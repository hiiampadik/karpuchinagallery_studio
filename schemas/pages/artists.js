import { defineField, defineType } from '@sanity-typed/types'

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
      fieldset: "info",
      validation: (Rule) => Rule.required(),
    }),
    defineField(    {
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: "info",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: 'bio',
      type: 'localizedRichParagraph',
      validation: (Rule) => Rule.required(),
    }),

    // todo  works + selected
  // todo second bio
  // todo cover

  ],

  preview: {
    select: {
      title: "name"}
  },
});
