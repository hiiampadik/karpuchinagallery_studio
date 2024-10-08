import {defineArrayMember, defineField, defineType} from 'sanity'

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
      description: 'The slug is the unique part of the URL for this document. It should be lowercase and contain only letters, numbers, or dashes.',
      options: {
        source: "title.cs",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),



    // todo reference not repeating
    // todo cover
    defineField({
      title: 'Start Date',
      name: 'startDate',
      type: 'date',
      fieldset: "dates",
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today'
      },
      validation: (Rule) => Rule.required(),
    }),
    {
      name: 'oneDayEvent',
      title: 'One Day Event',
      type: 'boolean',
      description: 'Check this if the event is only one day long',
      fieldset: "dates",
      initialValue: false,
      options: {
        layout: 'checkbox' // or 'switch' for a toggle
      }
    },
    defineField({
      title: 'End Date',
      name: 'endDate',
      type: 'date',
      fieldset: "dates",
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today'
      },
      hidden: ({ parent }) => parent?.oneDayEvent === true,
      validation: (Rule) => Rule.custom((endDate, context) => {
        const { oneDayEvent, startDate } = context.parent;
        if (!oneDayEvent) {
          if (!endDate) {
            return 'End Date is required if it is not one day event'
          } else if (endDate <= startDate) {
            return 'End date must be later than the start date';
          }
        }
        return true;
      })
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
