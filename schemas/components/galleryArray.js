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
          options: {
            metadata: ['originalFilename'] // Request original filename metadata
          }
        },
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      preview: {
        select: {
          title: "alt",
          media: "image",
          filename: "image.asset.originalFilename"
        },
        prepare(selection) {
          const {media, filename} = selection;
          return {
            title: filename,
            media: media
          };
        }
      },
    }
  ],
});
