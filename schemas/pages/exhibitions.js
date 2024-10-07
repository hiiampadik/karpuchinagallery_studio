import { defineField, defineType, defineArrayMember } from '@sanity-typed/types'

export default defineType({
  name: "exhibitions",
  title: "Exhibitions",
  type: "document",

  fieldsets: [
    {
      name: "dates",
      title: "Dates",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField(    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.cs",
        maxLength: 96,
      },
    }),


    // todo requered
    // todo solve one time actions
    defineField({
      title: 'Start Date',
      name: 'startDate',
      type: 'date',
      fieldset: "dates",
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today'
      }
    }),
    defineField({
      title: 'End Date',
      name: 'endDate',
      type: 'date',
      fieldset: "dates",
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today'
      }
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

    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    }),

  ],

  preview: {
    select: {
      title: "title.cs"}
  },
});
