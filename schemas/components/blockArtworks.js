import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  title: 'Artworks',
  name: 'blockArtworks',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'artwork',
      title: 'Artwork',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: "Cover",
          name: "cover",
          type: "image",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'showInSelection',
          title: 'Show in Selection',
          type: 'boolean',
          description: 'Show in the artist\'s selection of works',
          initialValue: true,
          options: {
            layout: 'checkbox' // or 'switch' for a toggle
          }
        }),
        defineField(    {
          name: 'exhibitions',
          title: 'Exhibitions',
          type: "reference",
          to: [{type: 'exhibitions' }],
          validation: (Rule) => Rule.required(),
        }),

      ]

    }),
  ],
})
