import type { SearchBeatmapFromMd5 } from '@/types/hinamizawa'
import env from 'env'
import { resolve } from 'node:path'
import { ScoreDecoder } from 'osu-parsers'

const decoder = new ScoreDecoder()

export const downloadMapFromOsr = async (replay: string) => {
  const score = await decoder.decodeFromPath(replay)

  const md5 = score.info.beatmapHashMD5

  const searchByMd5Res = await fetch(`https://mirror.hinamizawa.ai/v3/osu/beatmaps/md5/${md5}`)

  if (!searchByMd5Res.ok) {
    throw new Error(`Map not found on mirror by MD5 or API error: ${md5}`)
  }

  const data = (await searchByMd5Res.json()) as SearchBeatmapFromMd5

  const downloadRes = await fetch(`https://mirror.hinamizawa.ai/d/${data.beatmapset_id}?redirect=true`)

  if (!downloadRes.ok) {
    throw new Error(`Failed to download map: ${data.beatmapset_id}`)
  }

  await Bun.write(resolve(env.OSU_SONGS_PATH, `${data.beatmapset_id}.osz`), downloadRes.body!)
}

export const readDanserLog = async (lastLines: number) => {
  const file = await Bun.file('danser/danser.log').text()
  return file
    .split('\n')
    .slice(-lastLines - 1)
    .join('\n')
}
