import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/section-heading"
import { getPosts } from "@/lib/api"

export const metadata: Metadata = {
  title: "Blog - Shine Kyaw Kyaw Aung",
  description: "Latest articles and insights about web development, technology, and more.",
}

export default async function BlogPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: { page?: string; category?: string }
}) {
  const t = await getTranslations()
  const page = Number.parseInt(searchParams.page || "1")
  const category = searchParams.category

  const { docs: posts, totalPages } = await getPosts({
    locale,
    page,
    category,
    limit: 9,
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white">
      <div className="container py-32">
        <SectionHeading title={t("blog.title")} subtitle={t("blog.subtitle")} />

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-lg">No posts found.</p>
            <Button asChild className="mt-4">
              <Link href={`/${locale}`}>Back to Home</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {posts.map((post) => (
                <Link key={post.id} href={`/${locale}/blog/${post.slug}`}>
                  <article className="group relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 transition-all duration-300 hover:border-purple-500/50 h-full">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                    <div className="relative h-full flex flex-col">
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={post.coverImage.url || "/placeholder.svg"}
                          alt={post.coverImage.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge
                            variant="secondary"
                            className="bg-zinc-900/80 text-white border-0"
                            style={{ backgroundColor: post.category.color + "20", color: post.category.color }}
                          >
                            {post.category.name}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <h2 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-zinc-400 mb-4 flex-grow">{post.excerpt}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-zinc-700/50">
                          <div className="flex items-center gap-4 text-sm text-zinc-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(post.publishedAt).toLocaleDateString(locale, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {post.author.name}
                            </div>
                          </div>
                          <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                {page > 1 && (
                  <Button variant="outline" asChild>
                    <Link href={`/${locale}/blog?page=${page - 1}${category ? `&category=${category}` : ""}`}>
                      Previous
                    </Link>
                  </Button>
                )}

                <span className="text-zinc-400">
                  Page {page} of {totalPages}
                </span>

                {page < totalPages && (
                  <Button variant="outline" asChild>
                    <Link href={`/${locale}/blog?page=${page + 1}${category ? `&category=${category}` : ""}`}>
                      Next
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
