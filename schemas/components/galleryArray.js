import {defineType} from 'sanity'

export default defineType({
  title: "Gallery",
  name: "galleryArray",
  type: "array",
  of: [
    {
      type: 'object',
      title: 'Image',
      fields: [
        {
          name: 'image',
          type: 'image',
          title: 'File',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      preview: {
        select: {
          title: "alt",
          media: "image"
        },
        prepare(selection) {
          const {title, media} = selection;
          return {
            title: title ?? 'Draft',
            media: media
          };
        }
      },
    }
  ],
});
