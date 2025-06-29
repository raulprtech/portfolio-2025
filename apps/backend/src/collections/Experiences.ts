import type { CollectionConfig } from "payload/types"

const Experiences: CollectionConfig = {
  slug: "experiences",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "company", "startDate", "endDate", "current"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
      localized: true,
    },
    {
      name: "description",
      type: "richText",
      required: true,
      localized: true,
    },
    {
      name: "startDate",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      type: "date",
    },
    {
      name: "current",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "technologies",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "achievements",
      type: "array",
      fields: [
        {
          name: "achievement",
          type: "text",
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: "companyLogo",
      type: "upload",
      relationTo: "media",
    },
  ],
}

export default Experiences
