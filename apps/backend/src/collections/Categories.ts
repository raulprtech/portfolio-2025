import type { CollectionConfig } from "payload/types"

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "color",
      type: "text",
      defaultValue: "#6366f1",
    },
  ],
}

export default Categories
