import { jest } from '@jest/globals'

const files = {
  'not_valid_data.json': '',
  'data.json': JSON.stringify({
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
}

jest.unstable_mockModule('node:fs', () => {
  return {
    existsSync: jest.fn((filepath) => {
      return filepath in files
    })
  }
})

jest.unstable_mockModule('node:fs/promises', () => ({
  readFile: jest.fn(async (filepath) => {
    if (typeof filepath !== 'string') {
      throw new Error('The "path" argument must be of type string')
    }
    if (filepath in files) {
      return files[filepath]
    }
    throw new Error('no such file or directory')
  }),
  writeFile: jest.fn(async (filepath, data) => {
    if (typeof filepath !== 'string') {
      throw new Error('The "path" argument must be of type string')
    }
    if (typeof data !== 'string') {
      throw new Error('The "data" argument must be of type string')
    }
    files[filepath] = data
  }),
  rename: jest.fn(async (filepath, newFilepath) => {
    if (typeof filepath !== 'string') {
      throw new Error('The "path" argument must be of type string')
    }
    files[newFilepath] = files[filepath]
    delete files[filepath]
  })
}))

export function getFiles (filepath) {
  return files[filepath]
}

export function hasFiles (filepath) {
  return filepath in files
}
