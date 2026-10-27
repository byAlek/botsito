import extract from 'extract-zip'
import { resolve } from 'node:path'

const downloadLink = `https://github.com/Wieku/danser-go/releases/download/0.12.1/danser-0.12.1-${process.platform === 'win32' ? 'win' : 'linux'}.zip`
const zipPath = 'danser.zip'
const extractDir = 'danser'

if (await Bun.file(`${extractDir}/danser-cli.exe`).exists()) {
  console.log('Danser already downloaded')
} else {
  console.log('Downloading danser...')

  const response = await fetch(downloadLink)

  if (!response.ok) {
    throw new Error(`Failed to download: ${response.statusText}`)
  }

  const arrayBuffer = await response.arrayBuffer()

  await Bun.write(zipPath, arrayBuffer)

  console.log('Downloaded danser:', (arrayBuffer.byteLength / 1024 / 1024).toFixed(2), 'MB')
  try {
    console.log('Extracting danser...')
    await extract(zipPath, { dir: resolve(extractDir) })
    console.log('Danser extracted successfully')
  } catch (error) {
    console.error('Failed to extract danser:', error)
    throw error
  } finally {
    await Bun.file(zipPath).delete()
  }
}
