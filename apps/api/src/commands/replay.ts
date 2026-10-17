import { downloadMapFromOsr, readDanserLog } from '@/lib/utils'
import type { Command } from '@/types/discord'
import { SlashCommandBuilder } from 'discord.js'
import env from 'env'
import { randomUUID } from 'node:crypto'

const DANSER_CLI = 'danser/danser-cli.exe'
const MAX_FILE_SIZE = 80 * 1024 * 1024
const DOWNLOAD_TIMEOUT = 30_000
const VIDEOS_PATH = 'danser/videos'

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('replay')
    .setDescription('Render a replay!')
    .addAttachmentOption((option) =>
      option.setName('file').setDescription('The replay file to render').setRequired(true)
    ),

  execute: async (interaction) => {
    await interaction.deferReply()

    let replayTempPath: string | undefined

    try {
      const attachment = interaction.options.getAttachment('file')

      if (!attachment) throw new Error('No attachment provided.')

      if (attachment.size > MAX_FILE_SIZE) throw new Error('The replay file exceeds the 80 MB limit.')

      if (!attachment.name.toLowerCase().endsWith('.osr')) throw new Error('The file must be an osu! replay (.osr).')

      await interaction.editReply('Downloading replay...')

      const response = await fetch(attachment.url, {
        signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT),
      })

      if (!response.ok) throw new Error(`Failed to download replay (HTTP ${response.status}).`)

      const arrayBuffer = await response.arrayBuffer()

      if (arrayBuffer.byteLength > MAX_FILE_SIZE) throw new Error('The downloaded file exceeds the 80 MB limit.')

      if (arrayBuffer.byteLength === 0) throw new Error('The downloaded replay is empty.')

      const videoId = randomUUID().slice(0, 5)
      const videoFileName = `${videoId}.mp4`

      replayTempPath = `temp/${videoId}.osr`

      await Bun.write(replayTempPath, arrayBuffer)

      await interaction.editReply('Rendering replay...')

      const initDanser = async () => {
        const result = await Bun.$`"${DANSER_CLI}" "-replay=${replayTempPath}" -record "-out=${videoId}"`
          .quiet()
          .nothrow()
        if (result.exitCode !== 0) {
          console.error('[Danser]', result.stderr.toString())
          throw new Error(`Danser exited with code ${result.exitCode}\n${result.stderr.toString()}`)
        }
        return result
      }

      await initDanser()

      if ((await readDanserLog(1)).includes('Beatmap not found')) {
        await downloadMapFromOsr(replayTempPath)
        await initDanser()
      }

      if (!(await Bun.file(`${VIDEOS_PATH}/${videoFileName}`).exists())) {
        throw new Error(`Rendered video not found: ${videoFileName}`)
      }

      const videoUrl = new URL(videoFileName, `${env.PUBLIC_FUNNEL_URL.replace(/\/+$/, '')}/`).toString()

      await interaction.editReply(`Replay rendered successfully!\n${videoUrl}`)
    } catch (error) {
      console.error('[Replay command]', error)

      const message = error instanceof Error ? error.message : 'An unknown error occurred.'

      await interaction.editReply(`Failed to render replay: ${message}`)
    } finally {
      if (replayTempPath) {
        await Bun.file(replayTempPath)
          .delete()
          .catch((error) => {
            console.error('[Replay cleanup]', error)
          })
      }
    }
  },
}

export default command
