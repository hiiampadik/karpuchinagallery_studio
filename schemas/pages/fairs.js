import {defineType} from 'sanity'
import {eventFields, eventFieldSets, eventPreview} from '../components/event'

export default defineType({
  name: "fairs",
  title: "Fairs",
  type: "document",

  fieldsets: eventFieldSets,
  fields: eventFields,
  preview: eventPreview
});
