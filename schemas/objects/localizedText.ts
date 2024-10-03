import { defineField, defineType } from '@sanity-typed/types'
import {i18n} from '../../languages'

export default defineType({
  name: 'localizedText',
  title: 'Localized Text',
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
      type: 'text',
      fieldset: lang.isDefault ? undefined : 'translations',
      validation: (Rule) => Rule.custom((value) => {
        return value ? true : `${lang.title} is required.`
      }),
    })
  ),
})