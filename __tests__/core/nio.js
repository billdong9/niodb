'use strict'

// import static modules
import { jest } from '@jest/globals'
import { DatabaseError } from '../../src/class/error'
import { getFiles } from '../../test_helpers/mockFile.js'

// import tested modules
const { Nio } = await import('../../src/core/nio.js')

describe('new Nio(filepath)', () => {
  test('filepath is defined', async () => {
    await expect(new Nio('data.json')).toBeInstanceOf(Promise)
    await expect(await new Nio('data.json')).toEqual({
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

  test('filepath is undefined', async () => {
    await expect(new Nio()).toBeInstanceOf(Nio)
  })

  test('config is an empty object', async () => {
    await expect(new Nio(undefined, {})).toBeInstanceOf(Nio)
  })

  test('file is not in json format', async () => {
    await expect(new Nio('not_valid_data.json')).rejects.toThrow(DatabaseError)
  })

  test('add values to the file that does not exist', async () => {
    const db = await new Nio('not_exist.json', {
      transactionUpdated () {
        expect(getFiles('not_exist.json')).toBe(JSON.stringify({
          a: true
        }))
      }
    })
    db.a = true
    expect(db).toEqual({
      a: true
    })
  })

  test('update values in the file', async () => {
    const db = await new Nio('data.json', {
      transactionUpdated () {
        expect(getFiles('data.json')).toBe(JSON.stringify({
          numberVal: -3.1415926,
          stringVal: 'Hello World',
          booleanVal: false,
          arrayVal: [{
            string1: 'Bill'
          }],
          objectVal: {
            object2: {
              array1: [1, 2, 3, 4]
            }
          }
        }))
      }
    })
    // set
    db.booleanVal = false
    // delete
    delete db.nullVal
  })

  test('get value', async () => {
    const db = await new Nio('data.json')
    db.newVal = 'this is a test value'
    expect(db.newVal).toBe('this is a test value')
  })

  test('get undefined key', async () => {
    const db = await new Nio('data.json')
    expect(db.undefinedVal).toBe(undefined)
  })

  test('set invalid data', async () => {
    const db = await new Nio()
    expect(() => {
      db.a = undefined
    }).toThrow(TypeError)
  })

  test('set null prototype object', async () => {
    const db = await new Nio()
    const data = Object.create(null)
    data.a = true
    db.data = data
    expect(db).toEqual({
      data: {
        a: true
      }
    })
  })

  test('delete undefined key', async () => {
    const db = await new Nio()
    db.a = 1
    delete db.b
    expect(db).toEqual({
      a: 1
    })
  })

  test('get and update the data in objects', async () => {
    const db = await new Nio()
    db.a = {
      b: 1,
      c: [1, 2, 3]
    }
    delete db.a.b
    db.a.c.reverse()
    db.a.c[0] = 4
    expect('a' in db).toBe(true)
    expect(db).toEqual({
      a: {
        c: [4, 2, 1]
      }
    })
  })

  test('wrapper methods', async () => {
    const db = await new Nio()
    db.a = {
      b: 1,
      c: [1, 2, 3]
    }
    db.e = 6
    db.a.$delete('b')
    db.a.$get('c').reverse()
    db.a.$get('c')[0] = 4
    db.$set('d', 5)
    db.$rename('d', 'e')
    expect(db.$type('e')).toBe('number')
    expect(db.$exists('a')).toBe(true)

    jest.spyOn(global.Math, 'random').mockReturnValue(0.75)
    expect(db.$randomKey()).toBe('e')
    jest.spyOn(global.Math, 'random').mockRestore()

    expect(db).toEqual({
      a: {
        c: [4, 2, 1]
      },
      e: 5
    })
  })
})
