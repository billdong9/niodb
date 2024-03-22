import * as path from 'node:path'
import { jest } from '@jest/globals'

jest.unstable_mockModule('node:fs', () => {
  return {
    existsSync: jest.fn((filepath) => {
      const pathObj = path.parse(filepath)
      switch (pathObj.base) {
        case 'data.json':
        case 'not_valid_data.json':
          return true
      }
      return false
    })
  }
})

jest.unstable_mockModule('node:fs/promises', () => ({
  readFile: jest.fn(async (filepath) => {
    const pathObj = path.parse(filepath)
    switch (pathObj.base) {
      case 'data.json':
        return JSON.stringify({
          nullVal: null,
          numberVal: -3.1415926,
          stringVal: 'Hello World',
          booleanVal: true,
          arrayVal: [{
            string1: 'Bill'
          }],
          objectVal: {
            object2: {
              array1: [1, 2, 3, 4]
            }
          }
        })
      case 'not_valid_data.json':
        return ''
    }
    throw new Error('no such file or directory')
  })
}))
