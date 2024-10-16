import {defineType} from 'sanity'

export default defineType({
  name: 'soloExhibitions',
  type: 'array',
  title: 'Selection of Solo Exhibitions',
  fieldset: 'additionalInfo',
  of: [
    {
      type: 'object',
      title: 'Solo Exhibition',
      fields: [
        {
          name: 'year',
          type: 'number',
          title: 'Year',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'localizedRichParagraph',
        },
      ],
      preview: {
        select: {
          title: 'title',
          year: 'year'
        },
        prepare(value) {
          const {title, year} = value
          const block = (title.cs || []).find(block => block._type === 'block')
          return {
            title: block
              ? year + ' - ' + block.children
              .filter(child => child._type === 'span')
              .map(span => span.text)
              .join('')
              : 'No title'
          }
        }
      }
    }
  ]
})