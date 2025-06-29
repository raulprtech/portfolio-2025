import type { CollectionConfig } from "payload/types"

const Skills: CollectionConfig = {
  slug: "skills",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "level", "featured"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "level",
      type: "number",
      required: true,
      min: 0,
      max: 100,
      admin: {
        description: "Skill level from 0 to 100",
      },
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Frontend", value: "frontend" },
        { label: "Backend", value: "backend" },
        { label: "Database", value: "database" },
        { label: "DevOps", value: "devops" },
        { label: "Design", value: "design" },
        { label: "Other", value: "other" },
      ],
      required: true,
    },
    {
      name: "icon",
      type: "text",
      admin: {
        description: "Icon name from Lucide React or URL to custom icon",
      },
    },
    {
      name: "color",
      type: "text",
      defaultValue: "#6366f1",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
  ],
}

export default Skills
