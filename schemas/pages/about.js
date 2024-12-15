import {defineField, defineType} from 'sanity'

export default defineType({
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
  ],

  fields: [
    defineField({
      name: 'leftColumn',
      type: 'localizedRichText',
      fieldset: "info",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'rightColumn',
      type: 'localizedRichText',
      fieldset: "info",
      validation: (Rule) => Rule.required(),
    }),




    defineField({
      name: 'bio',
      type: 'localizedRichText',
      fieldset: "bio",
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      name: 'gallery',
      title: "Image Gallery",
      type: 'galleryArray',
    }),

    defineField({
      name: 'logos',
      title: "Logos",
      type: 'galleryArray',
    }),

    defineField({
      name: 'footer',
      type: 'localizedRichText',
      fieldset: "footer",
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
});
