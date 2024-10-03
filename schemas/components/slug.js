export default {
    title: 'Slug',
    name: 'slug',
    type: 'slug',
    validation: (Rule) => Rule.required(),
    options: {
      source: 'title',
      maxLength: 200, // will be ignored if slugify is set
      slugify: input => input
                           .toLowerCase()
                           .replace(/\s+/g, '-')
                           .slice(0, 200)
    }
  }