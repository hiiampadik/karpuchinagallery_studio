import {defineField, defineType} from 'sanity'

import {i18n} from '../../languages'

export default defineType({
  name: 'localizedRichParagraph',
  title: 'Localized Rich Paragraph',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: i18n.languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'blockRichParagraph',
      fieldset: lang.isDefault ? undefined : 'translations',
      validation: (Rule) => Rule.custom((value: any) => {
        return value ? true : `${lang.title} is required.`
      }),
    })
  ),
})