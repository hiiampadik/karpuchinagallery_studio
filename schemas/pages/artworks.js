import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: "artworks",
  title: "Artworks",
  type: "document",

  fieldsets: [
    {
      name: "info",
      title: "Info",
      options: {
        columns: 2
      },
    },
    {
      name: "artistSection",
      title: "Artist",
      options: {
        columns: 2
      },
    },
  ],


  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: "info",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      title: 'Year',
      name: 'year',
      type: 'string',
      fieldset: "info",
    }),


    defineField(    {
      name: 'artist',
      title: 'Select Artist',
      type: "reference",
      fieldset: "artistSection",
      to: [{type: 'artists' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showInSelection',
      title: 'Show in Selection',
      type: 'boolean',
      description: 'Show in the artist\'s selection of works',
      initialValue: true,
      fieldset: "artistSection",
      options: {
        layout: 'checkbox' // or 'switch' for a toggle
      }
    }),

    defineField({
      title: "Cover",
      name: "cover",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      name: 'info',
      title: 'Info',
      type: 'localizedRichParagraph',
    }),


    defineField({
      name: 'gallery',
      title: "Image Gallery",
      type: 'galleryArray',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      artistName: "artist.name",
      media: "cover"
    },
    prepare(selection) {
      const {title, artistName, media} = selection;
      return {
        title: title ?? 'Draft',
        subtitle: artistName ? `by ${artistName}` : "Artist not selected",
        media: media
      };
    }
  },
});
