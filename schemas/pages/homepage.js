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
      to: [{type: 'exhibitions' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField(    {
      name: 'upcoming',
      title: 'Upcoming',
      type: "reference",
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
