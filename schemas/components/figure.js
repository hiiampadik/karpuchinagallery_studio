import {defineType} from 'sanity'

export default defineType({
        title: 'Figure',
        name: 'figure',
        type: 'image',

        fields: [
          {
            name: 'caption',
            type: 'string', 
            title: 'Caption',
          },
          {
            // Editing this field will be hidden behind an "Edit"-button
            name: 'alt',
            type: 'string',
            title: 'Alt',
          }
        ]
      })