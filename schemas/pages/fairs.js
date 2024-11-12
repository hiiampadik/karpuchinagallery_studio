import {defineType} from 'sanity'
import {eventFields, eventFieldSets, eventPreview} from '../components/event'

export default defineType({
  name: "fairs",
  title: "Fairs",
  type: "document",

  orderings: [
    {
      title: 'NEW First',
      name: 'openingDateDesc',
      by: [{field: 'openingDate', direction: 'desc'}],
    },
    {
      title: 'OLD First',
      name: 'openingDateAsc',
      by: [{field: 'openingDate', direction: 'asc'}],
    },
  ],

  fieldsets: eventFieldSets,
  fields: eventFields,
  preview: eventPreview
});
