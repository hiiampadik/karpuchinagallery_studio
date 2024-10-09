import {defineField, defineType} from 'sanity'

export default defineType({
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
