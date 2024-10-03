export default {
  name: "artists",
  title: "Artists",
  type: "document",

  fieldsets: [
    {
      name: "info",
      title: "Info",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
        columns: 2, // Defines a grid for the fields and how many columns it should have
      },
    },
    {
      name: "texts",
      title: "Texts",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
        columns: 1, // Defines a grid for the fields and how many columns it should have
      },
    },
    {
      name: "credits",
      title: "Credits",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
        columns: 2, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],

  fields: [
    {
      name: "orderRank",
      title: "Order",
      type: "string",
      hidden: true,
    },

    {
      name: "title",
      title: "Title",
      type: "object",

      fields: [
        {
          title: "Czech",
          name: "cs",
          type: "string",
        },
        {
          title: "English",
          name: "en",
          type: "string",
        },
      ],
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: "info",

      options: {
        source: "title.cs",
        maxLength: 96,
      },
    },
    {
      name: "date",
      title: "Date",
      type: "string",
      fieldset: "info",
    },
    {
      title: "Ongoing",
      name: "ongoing",
      type: "boolean",
      fieldset: "info",
    },
    {
      title: "Cover",
      name: "cover",
      type: "image",
      fieldset: "info",
    },


    {
      title: "Client",
      name: "client",
      type: 'blockCredits',
      fieldset: "credits",
    },
    {
      title: "Photographer",
      name: "photographer",
      type: 'blockCredits',
      fieldset: "credits",
    },
    {
      title: "Collaboration",
      name: "collaboration",
      type: 'blockCredits',
      fieldset: "credits",
    },
    {
      title: "Web",
      name: "web",
      type: 'blockCredits',
      fieldset: "credits",
    },


    {
      name: "text",
      title: "Text",
      type: "object",

      fields: [
        {
          title: "Czech",
          name: "cs",
          type: 'blockContent',
        },
        {
          title: "English",
          name: "en",
          type: 'blockContent',
        },
    
      ],
    },

    {
      title: "Videos",
      name: "videos",
      type: "array",
      of: [
        {
          title: "Url",
          type: "url",
        },
      ],
    },

    {
      title: "Instagram",
      name: "instagram",
      type: "array",
      of: [
        {
          title: "Url",
          type: "url",
        },
      ],
    },


    {
      title: "Gallery Array",
      name: "galleryArray",
      type: 'galleryArray',
    },

  ],

  preview: {
    select: {
      title: "title.cs",
      subtitle: "date"}
  },
};
