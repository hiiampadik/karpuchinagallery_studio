import { defineType, defineArrayMember } from '@sanity-typed/types'

export default defineType({
  title: "Gallery",
  name: "galleryArray",
  type: "array",
  of: [
    defineArrayMember({
      title: "Image",
      type: "image",
    }),
  ],
});
