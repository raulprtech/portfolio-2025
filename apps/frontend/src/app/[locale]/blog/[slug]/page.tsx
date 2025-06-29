import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RichTextRenderer } from "@/components/rich-text-renderer"
import { getPost, getPosts } from "@/lib/api"

interface BlogPostPageProps {
  params: {
    locale: string
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getPost(params.slug, params.locale)

    if (!post) {
      return {
        title: "Post Not Found",
      }
    }

    return {
      title: `${post.title} - Shine Kyaw Kyaw Aung`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [post.coverImage.url],
      },
    }
  } catch {
    return {
      title: "Post Not Found",
    }
  }
}

export async function generateStaticParams() {
  const { docs: posts } = await getPosts({ limit: 100 })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post

  try {
    post = await getPost(params.slug, params.locale)
  } catch {
    notFound()
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white">
      <div className="container py-32">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-8">
            <Link href={`/${params.locale}/blog`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          {/* Hero Image */}
          <div className="relative overflow-hidden rounded-xl mb-8">
            <img
              src={post.coverImage.url || "/placeholder.svg"}
              alt={post.coverImage.alt}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Post Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge
                variant="secondary"
                className="bg-zinc-800/50 text-white border-0"
                style={{ backgroundColor: post.category.color + "20", color: post.category.color }}
              >
                {post.category.name}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString(params.locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author.name}
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300">
              {post.title}
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">{post.excerpt}</p>
          </header>

          {/* Post Content */}
          <article className="prose prose-invert prose-lg max-w-none mb-12">
            <RichTextRenderer content={post.content} />
          </article>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-4 w-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-400">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-zinc-700 text-zinc-300">
                    {tag.tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="border-t border-zinc-800 pt-8">
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href={`/${params.locale}/blog`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  All Posts
                </Link>
              </Button>

              <Button asChild>
                <Link href={`/${params.locale}#contact`}>Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
