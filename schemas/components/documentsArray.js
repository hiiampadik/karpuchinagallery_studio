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
          validation: (rule) =>
            rule.custom(async (value, { getClient }) => {
              if (!value) {
                return "File is required";
              }

              if (value?.asset?._ref) {
                const client = getClient({ apiVersion: `2025-01-01` });
                const size = await client.fetch(`*[_id == $id][0].size`, {
                  id: value.asset._ref,
                });
                if (size > 10000000) {
                  return "File size must be less than 10MB";
                }
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
