import express from "express"
import cors from "cors"
import payload from "payload"
import { google } from "@ai-sdk/google"
import { streamText } from "ai"

require("dotenv").config()

const app = express()

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
)

// AI Assistant endpoint
app.post("/api/ai/chat", express.json(), async (req, res) => {
  try {
    const { messages } = req.body

    const result = await streamText({
      model: google("gemini-1.5-flash"),
      messages,
      system: `You are a helpful AI assistant for content creation. You help users write blog posts, improve their content, and provide suggestions for their portfolio. Be concise and helpful.`,
    })

    // Convert the stream to a readable format for the frontend
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.textStream) {
          controller.enqueue(new TextEncoder().encode(chunk))
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error("AI Chat error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  const port = process.env.PORT || 3001

  app.listen(port, async () => {
    payload.logger.info(`Server listening on port ${port}`)
  })
}

start()
