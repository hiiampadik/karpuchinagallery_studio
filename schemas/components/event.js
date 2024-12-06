import {defineArrayMember, defineField} from 'sanity'

export const eventFieldSets = [
  {
    name: "dates",
    title: "Dates",
    options: {
      columns: 2,
      collapsible: true,
      collapsed: true,
    },
  },
  {
    name: "persons",
    title: "Persons",
    options: {
      columns: 2
    },
  },
  {
    name: "details",
    title: "Cover + Color",
    options: {
      collapsible: true,
      collapsed: true,
      columns: 1,
    },
  },
  {
    name: "texts",
    title: "Texts",
    options: {
      collapsible: true,
      collapsed: true,
      columns: 1,
    },
  },
]

export const eventFields = [
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
    title: "Space / Place",
    name: "gallerySpace",
    type: "string",
  }),

  defineField({
    name: 'artists',
    title: 'Artists',
    type: "array",
    fieldset: 'persons',
    of: [
      defineArrayMember({
        title: "Artist",
        type: 'string',
        validation: Rule => Rule.required().min(1)
      }),
    ],
    validation: Rule => Rule.unique(),
  }),

  defineField({
    name: 'curators',
    title: 'Curators',
    type: "array",
    fieldset: 'persons',
    of: [
      defineArrayMember({
        title: "curator",
        type: 'string',
        validation: Rule => Rule.required().min(1)
      }),
    ],
    validation: Rule => Rule.unique(),
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
    title: 'Opening',
    name: 'openingDate',
    type: 'datetime',
    fieldset: "dates",
    options: {
      dateFormat: 'YYYY-MM-DD',
      calendarTodayLabel: 'Today',
    },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    title: 'From Date',
    name: 'fromDate',
    type: 'date',
    fieldset: "dates",
    options: {
      dateFormat: 'YYYY-MM-DD',
      calendarTodayLabel: 'Today'
    },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    title: 'To Date',
    name: 'toDate',
    type: 'date',
    fieldset: "dates",
    options: {
      dateFormat: 'YYYY-MM-DD',
      calendarTodayLabel: 'Today'
    },
    validation: (Rule) => Rule.required(),
  }),

  defineField({
    name: 'textAuthor',
    title: 'Text Author',
    type: 'string',
    fieldset: "texts",
  }),
  defineField({
    name: 'text',
    title: `Text`,
    type: 'localizedRichParagraph',
    fieldset: "texts",
    validation: (Rule) => Rule.required(),
  }),

  defineField({
    name: "documents",
    title: "Documents",
    type: "documentsArray",
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
    name: 'gallery',
    title: "Image Gallery",
    type: 'galleryArray',
  }),
]

export const eventPreview = {
  select: {
    title: "title.cs",
    openingDate: "openingDate",
    fromDate: "fromDate",
    toDate: "toDate",
    media: "cover",
  },
  prepare(selection) {
    const { title, fromDate, toDate, media } = selection;

    // Function to format dates as DD/MM/YYYY
    const formatDate = (dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB'); // en-GB locale formats as DD/MM/YYYY
    };

    const formattedStartDate = formatDate(fromDate);

    const dateSubtitle = toDate
      ? `${formattedStartDate} - ${formatDate(toDate)}`
      : formattedStartDate;

    return {
      title: title ?? 'Draft',
      subtitle: dateSubtitle,
      media: media,
    };
  }
}