import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: "artworks",
  title: "Artworks",
  type: "document",

  fieldsets: [
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
      validation: (Rule) => Rule.required(),
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
      name: 'exhibitions',
      title: 'Exhibitions',
      type: "array",
      of: [
        defineArrayMember({
          title: "Exhibition",
          type: 'reference',
          to: [{type: 'exhibitions' }]
        }),
      ],
      validation: Rule => Rule.unique(),
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
