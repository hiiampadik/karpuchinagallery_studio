import {defineArrayMember, defineType} from 'sanity'

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
