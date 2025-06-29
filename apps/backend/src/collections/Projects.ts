import type { CollectionConfig } from "payload/types"

const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "featured", "createdAt"],
  },
  fields: [
    {
      name: "title",
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
      required: true,
      localized: true,
    },
    {
      name: "longDescription",
      type: "richText",
      localized: true,
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
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
        {
          name: "color",
          type: "text",
          defaultValue: "#6366f1",
        },
      ],
    },
    {
      name: "demoUrl",
      type: "text",
      admin: {
        placeholder: "https://example.com",
      },
    },
    {
      name: "repoUrl",
      type: "text",
      admin: {
        placeholder: "https://github.com/username/repo",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "In Progress", value: "in-progress" },
        { label: "Completed", value: "completed" },
        { label: "Archived", value: "archived" },
      ],
      defaultValue: "completed",
    },
    {
      name: "startDate",
      type: "date",
    },
    {
      name: "endDate",
      type: "date",
    },
  ],
}

export default Projects
