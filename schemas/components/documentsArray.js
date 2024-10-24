import {defineType} from 'sanity'

export default defineType({
  title: "Documents",
  name: "documentsArray",
  type: "array",
  of: [
    {
      type: 'object',
      title: 'Document',
      fields: [
        {
          name: 'file',
          type: "file",
          title: 'File',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'documentCover',
          title: 'Document Cover',
          type: 'image',
          validation: (Rule) => Rule.required(),
        },
      ],
      preview: {
        select: {
          title: "alt",
          media: "documentCover"
        },
        prepare(selection) {
          const {title, media} = selection;
          return {
            title: title ?? 'Draft Document',
            media: media
          };
        }
      },
    }
  ],
});
