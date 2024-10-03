import {defineField} from 'sanity'

export default {
  name: "about",
  title: "About",
  type: "document",

  fieldsets: [
    {
      name: "info",
      title: "Info",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
        columns: 2, // Defines a grid for the fields and how many columns it should have
      },
    },
    {
      name: "bio",
      title: "Bio",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
        columns: 1, // Defines a grid for the fields and how many columns it should have
      },
    },

    {
      name: "footer",
      title: "Footer",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
        columns: 1, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],

  fields: [
    defineField({
      name: 'Contact',
      type: 'localizedRichParagraph',
      fieldset: "info",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Address',
      type: 'localizedRichParagraph',
      fieldset: "info",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Open',
      type: 'localizedRichParagraph',
      fieldset: "info",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Connect',
      type: 'localizedRichParagraph',
      fieldset: "info",
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      name: 'Bio',
      type: 'localizedRichText',
      fieldset: "bio",
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      name: 'Footer',
      type: 'localizedRichText',
      fieldset: "footer",
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      title: "Logos",
      name: 'logos',
      type: 'galleryArray',
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
