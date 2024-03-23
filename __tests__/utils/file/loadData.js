'use strict'

// import static modules
import { DatabaseError } from '../../../src/class/error'
import '../../../test_helpers/mockFile.js'

// import tested modules
const { loadDataFromFile } = await import('../../../src/utils/file/loadData')

describe('loadDataFromFile(proxy, filepath)', () => {
  test('load a file that does not exist', async () => {
    await expect(loadDataFromFile({}, './not_exist_file.json')).resolves.not.toThrow(DatabaseError)
  })

  test('filepath is not defiend', async () => {
    await expect(loadDataFromFile({})).resolves.not.toThrow(DatabaseError)
  })

  test('filepath is a valid json file', async () => {
    const proxy = {}
    await loadDataFromFile(proxy, 'data.json')
    expect(proxy).toStrictEqual({
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
  })

  test('filepath is a valid file but the data is not in json format', async () => {
    await expect(loadDataFromFile({}, 'not_valid_data.json')).rejects.toThrow(DatabaseError)
  })
})
