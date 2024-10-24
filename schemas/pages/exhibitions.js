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
      name: 'color',
      title: 'Color',
      type: 'color',
      fieldset: 'details',
      options: {
        disableAlpha: true
      }
    }),
    defineField({
      name: "documents",
      title: "Documents",
      type: "documentsArray",
      fieldset: 'details',
    }),

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
    defineField({
      name: 'oneDayEvent',
      title: 'One Day Event',
      type: 'boolean',
      description: 'Check this if the event is only one day long',
      fieldset: "dates",
      initialValue: false,
      options: {
        layout: 'checkbox' // or 'switch' for a toggle
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

    defineField({
      name: 'artworks',
      title: 'Artworks',
      type: "array",
      of: [
        defineArrayMember({
          title: "Artwork",
          type: 'reference',
          to: [{type: 'artworks' }]
        }),
      ],
      validation: Rule => Rule.unique(),
    }),

    defineField({
      name: 'curatorsText',
      title: `Curator's Text`,
      type: 'localizedRichParagraph',
      fieldset: "texts",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'gallery',
      title: "Image Gallery",
      type: 'galleryArray',
    }),
  ],

  preview: {
    select: {
      title: "title.cs",
      startDate: "startDate",
      endDate: "endDate",
      oneDayEvent: "oneDayEvent",
      media: "cover",
    },
    prepare(selection) {
      const { title, startDate, endDate, oneDayEvent, media } = selection;

      // Function to format dates as DD/MM/YYYY
      const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // en-GB locale formats as DD/MM/YYYY
      };

      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      const dateSubtitle = oneDayEvent
        ? formattedStartDate
        : `${formattedStartDate} - ${formattedEndDate}`;

      return {
        title: title ?? 'Draft',
        subtitle: dateSubtitle,
        media: media,
      };
    }
  }
});
