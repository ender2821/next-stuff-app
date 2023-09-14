import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'life',
  title: 'Life',
  type: 'document',
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string"
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string"
    }),
    defineField({
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
    }),
    defineField({
      name: "toBuyList",
      title: "To Buy",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "item",
              title: "Item",
              type: "string"
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string"
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string"
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "string"
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              }
            }),
          ]
        }
      ]
    }),
    defineField({
      name: "ownedList",
      title: "Owned",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "item",
              title: "Item",
              type: "string"
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string"
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string"
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "string"
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              }
            }),
          ]
        }
      ]
    }),
  ]
});