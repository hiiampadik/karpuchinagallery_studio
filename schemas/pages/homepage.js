import {defineArrayMember, defineField, defineType} from '@sanity-typed/types'

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField(    {
      name: 'selectedExhibition',
      title: 'Selected Exhibition',
      type: "reference",
      to: [{type: 'exhibitions' }]
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
