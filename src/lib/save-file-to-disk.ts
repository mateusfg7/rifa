import { appendFile } from 'fs'

export async function saveFileToDisk(file: File, name: string) {
  const completeFilePath = `/tmp/${name}.${file.type.split('/')[1]}`

  const buffer = Buffer.from(await file.arrayBuffer())

  appendFile(completeFilePath, buffer, {}, () => {
    console.log('saved')
  })

  return completeFilePath
}
