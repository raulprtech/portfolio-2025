"use client"

import { useRouter, usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "es" : "en"
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      className="text-zinc-400 hover:text-white hover:bg-zinc-700/50"
    >
      <Globe className="h-4 w-4 mr-2" />
      {locale === "en" ? "ES" : "EN"}
    </Button>
  )
}
