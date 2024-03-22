import * as path from 'node:path'
import { writeFile, rename as renameFile } from 'node:fs/promises'
import { DatabaseError } from '../../class/error.js'

export async function writeDataToFile (proxy, filepath) {
  try {
    const data = JSON.stringify(proxy)
    const tempFilePath = path.format({
      ...path.parse(filepath),
      base: undefined,
      ext: '.nio.tmp'
    })
    await writeFile(tempFilePath, data)
    await renameFile(tempFilePath, filepath)
  } catch (err) {
    throw new DatabaseError('Writing file ' + filepath + ' failed. ' + err.message)
  }
}
