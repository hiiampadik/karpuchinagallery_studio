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
          validation: (Rule) => Rule.required().custom((file) => {
            if (file && file.asset && file.asset._ref) {
              const fileSizeInBytes = parseInt(file.asset._ref.split('-')[1], 10); // Extract size from _ref
              const maxFileSizeInBytes = 10 * 1024 * 1024; // 10 MB
              return fileSizeInBytes <= maxFileSizeInBytes || 'File must be smaller than 10 MB';
            }
            return true;
          }),
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
