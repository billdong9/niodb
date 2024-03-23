'use strict'

// import static modules
import { DatabaseError } from '../../../src/class/error'
import { getFiles, hasFiles } from '../../../test_helpers/mockFile.js'

// import tested modules
const { writeDataToFile } = await import('../../../src/utils/file/writeData')

describe('writeDataToFile(proxy, filepath)', () => {
  test('data is not defined', async () => {
    await expect(writeDataToFile(undefined, 'data2.json')).rejects.toThrow(DatabaseError)
  })

  test('filepath is not defined', async () => {
    await expect(writeDataToFile({})).rejects.toThrow(DatabaseError)
  })

  test('write a file with valid data', async () => {
    const proxy = {
      a: 3,
      b: 'Hello World',
      c: [{
        d: -3.9,
        e: {
          f: true
        }
      }, null]
    }
    await writeDataToFile(proxy, 'data2.json')
    expect(getFiles('data2.json')).toBe(JSON.stringify(proxy))
    expect(hasFiles('data2.nio.tmp')).toBe(false)
  })
})
