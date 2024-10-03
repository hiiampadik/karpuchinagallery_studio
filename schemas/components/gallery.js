import Figure from './figure'

export default {
    title: 'Gallery',
    name: 'gallery',
    type: 'object',
    fields: [
        {
          name: 'images',
          type: 'array',
          of: [Figure]
        }
      ]
}