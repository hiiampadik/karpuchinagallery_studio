import {defineField} from 'sanity'

export default {
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: 'title',
      description: 'This is a localized string field, stored in an object',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About",
      };
    },
  },
};
