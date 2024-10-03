
/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: "Gallery",
  name: "galleryArray",
  type: "array",
  of: [
    {
      title: "Image",
      type: "image",
    },
  ],
};
