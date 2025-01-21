import {defineField, defineType} from 'sanity'

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField(    {
      name: 'onDisplay',
      title: 'On Display',
      type: "reference",
      options: {
        sort: [{ field: 'openingDate', direction: 'desc' }] // SORTING REFERENCE FIELDS SEARCH
      },
      description: "ALERT! If the event name, cover image or date is changed, the homepage needs to be republished to show changes.",
      to: [{type: 'exhibitions' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField(    {
      name: 'upcoming',
      title: 'Upcoming',
      type: "reference",
      options: {
        sort: [{ field: 'openingDate', direction: 'desc' }] // SORTING REFERENCE FIELDS SEARCH
      },
      description: "ALERT! If the event name, cover image or date is changed, the homepage needs to be republished to show changes.",
      to: [{type: 'exhibitions' }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Homepage",
      };
    },
  },
});
