export default {
  name: 'vehicle',
  title: 'Vehicle',
  type: 'document',
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96
      }
    },
    {
      name: "description",
      title: "Description",
      type: "string"
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      }
    },
    {
      name: "infoList",
      title: "Info",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string"
            },
            {
              name: "item",
              title: "Item",
              type: "string"
            },
          ]
        }
      ]
    },
    {
      name: "toDoList",
      title: "To Do",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "item",
              title: "Item",
              type: "string"
            }
          ]
        }
      ]
    },
    {
      name: "specList",
      title: "Specs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "item",
              title: "Item",
              type: "string"
            }
          ]
        }
      ]
    },
    {
      name: "toBuyList",
      title: "To Buy",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "item",
              title: "Item",
              type: "string"
            },
            {
              name: "price",
              title: "Price",
              type: "string"
            },
            {
              name: "description",
              title: "Description",
              type: "string"
            },
            {
              name: "link",
              title: "Link",
              type: "string"
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              }
            },
          ]
        }
      ]
    },
  ]
}