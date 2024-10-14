import {defineField, defineType} from 'sanity'
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


    {
      name: 'soloExhibitions',
      type: 'array',
      title: 'Selection of Solo Exhibitions',
      of: [
        {
          type: 'object',
          title: 'Solo Exhibition',
          fields: [
            {
              name: 'year',
              type: 'number',
              title: 'Year',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'localizedRichParagraph',
            },
          ],
          preview: {
            select: {
              title: 'title',
              year: 'year'
            },
            prepare(value) {
              const {title, year} = value
              const block = (title.cs || []).find(block => block._type === 'block')
              return {
                title: block
                  ? year + ' - ' + block.children
                    .filter(child => child._type === 'span')
                    .map(span => span.text)
                    .join('')
                  : 'No title'
              }
            }
          }
        }
      ]
    }

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
