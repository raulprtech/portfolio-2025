"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/section-heading"
import type { Post } from "@/lib/api"

interface BlogSectionProps {
  posts: Post[]
  locale: string
}

export function BlogSection({ posts, locale }: BlogSectionProps) {
  const t = useTranslations()

  if (!posts.length) return null

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container relative z-10">
        <SectionHeading title={t("blog.title")} subtitle={t("blog.subtitle")} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/${locale}/blog/${post.slug}`}>
                <div className="group relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 transition-all duration-300 hover:border-purple-500/50 h-full">
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
                      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-zinc-400 mb-4 flex-grow line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-zinc-700/50">
                        <div className="text-sm text-zinc-500">
                          {new Date(post.publishedAt).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                          <span className="text-sm font-medium mr-2">{t("blog.readMore")}</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0"
          >
            <Link href={`/${locale}/blog`}>
              {t("blog.viewAllPosts")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
