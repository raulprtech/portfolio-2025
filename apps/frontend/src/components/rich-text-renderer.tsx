"use client"

import type React from "react"
import { InlineMath, BlockMath } from "react-katex"
import "katex/dist/katex.min.css"

interface RichTextRendererProps {
  content: any[]
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node) return null

    switch (node.type) {
      case "paragraph":
        return (
          <p key={index} className="mb-4 text-zinc-300 leading-relaxed">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </p>
        )

      case "heading":
        const HeadingTag = `h${node.level}` as keyof JSX.IntrinsicElements
        const headingClasses = {
          1: "text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300",
          2: "text-3xl font-bold mb-5 text-white",
          3: "text-2xl font-semibold mb-4 text-white",
          4: "text-xl font-semibold mb-3 text-white",
          5: "text-lg font-semibold mb-2 text-white",
          6: "text-base font-semibold mb-2 text-white",
        }

        return (
          <HeadingTag key={index} className={headingClasses[node.level as keyof typeof headingClasses]}>
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </HeadingTag>
        )

      case "list":
        const ListTag = node.listType === "ordered" ? "ol" : "ul"
        const listClasses =
          node.listType === "ordered"
            ? "list-decimal list-inside mb-4 space-y-2 text-zinc-300"
            : "list-disc list-inside mb-4 space-y-2 text-zinc-300"

        return (
          <ListTag key={index} className={listClasses}>
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </ListTag>
        )

      case "listItem":
        return (
          <li key={index} className="text-zinc-300">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </li>
        )

      case "quote":
        return (
          <blockquote key={index} className="border-l-4 border-purple-500 pl-6 py-4 mb-6 bg-zinc-800/50 rounded-r-lg">
            <div className="text-zinc-300 italic">
              {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
            </div>
          </blockquote>
        )

      case "code":
        return (
          <pre key={index} className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <code className="text-sm text-zinc-300 font-mono">
              {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
            </code>
          </pre>
        )

      case "link":
        return (
          <a
            key={index}
            href={node.url}
            target={node.newTab ? "_blank" : undefined}
            rel={node.newTab ? "noopener noreferrer" : undefined}
            className="text-purple-400 hover:text-purple-300 underline transition-colors"
          >
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </a>
        )

      case "text":
        let textElement = node.text

        if (node.bold) {
          textElement = <strong>{textElement}</strong>
        }
        if (node.italic) {
          textElement = <em>{textElement}</em>
        }
        if (node.underline) {
          textElement = <u>{textElement}</u>
        }
        if (node.strikethrough) {
          textElement = <s>{textElement}</s>
        }
        if (node.code) {
          textElement = (
            <code className="bg-zinc-800 px-2 py-1 rounded text-sm font-mono text-purple-300">{textElement}</code>
          )
        }

        // Handle LaTeX math expressions
        if (typeof node.text === "string") {
          // Inline math: $...$
          if (node.text.includes("$") && !node.text.includes("$$")) {
            const parts = node.text.split(/(\$[^$]+\$)/g)
            return parts.map((part, partIndex) => {
              if (part.startsWith("$") && part.endsWith("$")) {
                const math = part.slice(1, -1)
                return <InlineMath key={partIndex} math={math} />
              }
              return part
            })
          }

          // Block math: $$...$$
          if (node.text.includes("$$")) {
            const parts = node.text.split(/(\$\$[^$]+\$\$)/g)
            return parts.map((part, partIndex) => {
              if (part.startsWith("$$") && part.endsWith("$$")) {
                const math = part.slice(2, -2)
                return (
                  <div key={partIndex} className="my-4 text-center">
                    <BlockMath math={math} />
                  </div>
                )
              }
              return part
            })
          }
        }

        return textElement

      default:
        return null
    }
  }

  return <div className="prose prose-invert max-w-none">{content?.map((node, index) => renderNode(node, index))}</div>
}
