"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { RichTextRenderer } from "@/components/rich-text-renderer"
import type { Experience } from "@/lib/api"

interface TimelineProps {
  experiences: Experience[]
}

export function Timeline({ experiences }: TimelineProps) {
  const isMobile = useMobile()

  const formatDate = (dateString: string, current: boolean, locale = "en") => {
    if (current) return locale === "es" ? "Presente" : "Present"
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
    })
  }

  return (
    <div
      className={`space-y-12 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <div
          key={experience.id}
          className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <motion.div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-purple-500/50">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold">{experience.title}</h3>
                    <div className="text-purple-400 font-medium">{experience.company}</div>
                    {experience.location && <div className="text-zinc-500 text-sm">{experience.location}</div>}
                  </div>
                  {experience.companyLogo && (
                    <img
                      src={experience.companyLogo.url || "/placeholder.svg"}
                      alt={experience.companyLogo.alt}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                </div>

                <div className="text-zinc-400 mb-4">
                  {formatDate(experience.startDate, false)} -{" "}
                  {experience.current ? formatDate("", true) : formatDate(experience.endDate!, false)}
                </div>

                <div className="mb-4">
                  <RichTextRenderer content={experience.description} />
                </div>

                {experience.technologies.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-zinc-400 mb-2">Technologies:</div>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 text-xs bg-zinc-700/50 text-zinc-300 rounded-md">
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {experience.achievements.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-zinc-400 mb-2">Key Achievements:</div>
                    <ul className="list-disc list-inside space-y-1 text-zinc-300 text-sm">
                      {experience.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement.achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
