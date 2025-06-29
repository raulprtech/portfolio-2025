const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: any
  coverImage: {
    url: string
    alt: string
  }
  category: {
    name: string
    slug: string
    color: string
  }
  tags: Array<{ tag: string }>
  featured: boolean
  status: "draft" | "published"
  publishedAt: string
  author: {
    name: string
  }
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  longDescription?: any
  coverImage: {
    url: string
    alt: string
  }
  gallery?: Array<{
    image: {
      url: string
      alt: string
    }
  }>
  technologies: Array<{
    name: string
    color: string
  }>
  demoUrl?: string
  repoUrl?: string
  featured: boolean
  status: "in-progress" | "completed" | "archived"
  startDate?: string
  endDate?: string
}

export interface Skill {
  id: string
  name: string
  level: number
  category: string
  icon?: string
  color: string
  featured: boolean
  description?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location?: string
  description: any
  startDate: string
  endDate?: string
  current: boolean
  technologies: Array<{ name: string }>
  achievements: Array<{ achievement: string }>
  companyLogo?: {
    url: string
    alt: string
  }
}

export async function getPosts({
  locale = "en",
  limit,
  page = 1,
  featured,
  category,
}: {
  locale?: string
  limit?: number
  page?: number
  featured?: boolean
  category?: string
} = {}): Promise<{ docs: Post[]; totalPages: number; page: number }> {
  const params = new URLSearchParams({
    locale,
    page: page.toString(),
    ...(limit && { limit: limit.toString() }),
    ...(featured !== undefined && { "where[featured][equals]": featured.toString() }),
    ...(category && { "where[category.slug][equals]": category }),
    "where[status][equals]": "published",
    sort: "-publishedAt",
    depth: "2",
  })

  const response = await fetch(`${API_URL}/api/posts?${params}`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }

  return response.json()
}

export async function getPost(slug: string, locale = "en"): Promise<Post> {
  const params = new URLSearchParams({
    locale,
    "where[slug][equals]": slug,
    "where[status][equals]": "published",
    depth: "2",
  })

  const response = await fetch(`${API_URL}/api/posts?${params}`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch post")
  }

  const data = await response.json()
  return data.docs[0]
}

export async function getProjects({
  locale = "en",
  limit,
  featured,
}: {
  locale?: string
  limit?: number
  featured?: boolean
} = {}): Promise<Project[]> {
  const params = new URLSearchParams({
    locale,
    ...(limit && { limit: limit.toString() }),
    ...(featured !== undefined && { "where[featured][equals]": featured.toString() }),
    "where[status][equals]": "completed",
    sort: "-createdAt",
    depth: "2",
  })

  const response = await fetch(`${API_URL}/api/projects?${params}`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch projects")
  }

  const data = await response.json()
  return data.docs
}

export async function getSkills({
  locale = "en",
  featured,
}: {
  locale?: string
  featured?: boolean
} = {}): Promise<Skill[]> {
  const params = new URLSearchParams({
    locale,
    ...(featured !== undefined && { "where[featured][equals]": featured.toString() }),
    sort: "-level",
    depth: "1",
  })

  const response = await fetch(`${API_URL}/api/skills?${params}`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch skills")
  }

  const data = await response.json()
  return data.docs
}

export async function getExperiences({
  locale = "en",
}: {
  locale?: string
} = {}): Promise<Experience[]> {
  const params = new URLSearchParams({
    locale,
    sort: "-startDate",
    depth: "2",
  })

  const response = await fetch(`${API_URL}/api/experiences?${params}`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch experiences")
  }

  const data = await response.json()
  return data.docs
}
