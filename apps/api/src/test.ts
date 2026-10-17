// import { ScoreDecoder } from 'osu-parsers'
// import { downloadMissingMapFromReplay } from './lib/utils'

import { downloadMapFromOsr } from './lib/utils'

// const path = 'temp/alek_-_Aika_-_Sakura_Trip_Electric_Pink_2026-10-08_Osu.osr'

// const decoder = new ScoreDecoder()

// const file = await Bun.file(path).arrayBuffer()
// const score = await decoder.decodeFromBuffer(file, false)

// console.log(score.info)
// downloadMissingMapFromReplay(file)

const isBeatmapNotFound = async (lines: number) => {
  const log = (await Bun.file('danser/danser.log').text())
    .split('\n')
    .slice(-lines - 1)
    .join('\n')
  return log.includes('Beatmap not found')
}

// console.log(await isBeatmapNotFound(1))
downloadMapFromOsr(await Bun.file('temp/alek_-_Aika_-_Sakura_Trip_Electric_Pink_2026-10-08_Osu.osr').arrayBuffer())
