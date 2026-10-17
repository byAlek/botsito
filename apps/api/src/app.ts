import '@/scripts/download-danser'
import 'env'

import commands from '@/commands'
import { client } from '@/config/discord'
import { Events } from 'discord.js'
import env from 'env'
import { basename, extname } from 'node:path'
import { handleInteractionCreate } from './interactionCreate'

const server = Bun.serve({
  port: env.PORT,
  hostname: env.HOSTNAME,
  async fetch(req) {
    const url = new URL(req.url)
    const fileName = decodeURIComponent(url.pathname.slice(1))

    // Aceita apenas nomes de arquivos, sem caminhos de diretórios.
    if (!fileName || basename(fileName) !== fileName) {
      return new Response('Not Found', { status: 404 })
    }

    const videosDir = 'danser/videos/'

    const file = Bun.file(videosDir + fileName)

    if (!(await file.exists())) {
      return new Response('Not Found', { status: 404 })
    }

    if (extname(fileName).toLowerCase() !== '.mp4') {
      return new Response('Unsupported file type', { status: 403 })
    }

    return new Response(file, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'inline',
      },
    })
  },
})

console.log(`Server running at ${server.url}`)

client.on(Events.InteractionCreate, handleInteractionCreate(commands))
