export default {
  name: 'vehicle',
  title: 'Vehicle',
  type: 'document',
  fields: [
    {
      name: "vehicleName",
      title: "Name",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "vehicleName",
        maxLength: 96
      }
    },
    {
      name: "vehicleDescription",
      title: "Description",
      type: "string"
    },
    {
      name: "vehicleImage",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      }
    },
    {
      name: "vehicleInfoList",
      title: "Info List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "vehiclInfoItem",
              title: "Item",
              type: "string"
            },
            {
              name: "vehiclInfoItemLabel",
              title: "Label",
              type: "string"
            },
          ]
        }
      ]
    },
    {
      name: "vehicleToDoList",
      title: "To Do List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "vehiclToDoItem",
              title: "Item",
              type: "string"
            }
          ]
        }
      ]
    },
    {
      name: "vehicleSpecList",
      title: "Spec List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "vehiclSpec",
              title: "Spec",
              type: "string"
            }
          ]
        }
      ]
    },
    {
      name: "vehicleToBuyList",
      title: "To Buy List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "vehicleToBuyItem",
              title: "Item",
              type: "string"
            },
            {
              name: "vehicleToBuyItemPrice",
              title: "Price",
              type: "string"
            },
            {
              name: "vehicleToBuyItemDescription",
              title: "Description",
              type: "string"
            },
            {
              name: "vehicleToBuyItemLink",
              title: "Link",
              type: "string"
            },
            {
              name: "vehicleItemImage",
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