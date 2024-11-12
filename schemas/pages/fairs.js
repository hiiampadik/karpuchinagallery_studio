import {defineType} from 'sanity'
import {eventFields, eventFieldSets, eventPreview} from '../components/event'
// todo seradit podle roku
export default defineType({
  name: "fairs",
  title: "Fairs",
  type: "document",

  fieldsets: eventFieldSets,
  fields: eventFields,
  preview: eventPreview
});
