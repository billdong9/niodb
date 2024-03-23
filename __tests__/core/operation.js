'use strict'

import { jest } from '@jest/globals'
import { DataOp } from '../../src/core/operation.js'

let proxy,
  operation

describe('dataOp.$get(key)', () => {
  beforeEach(() => {
    proxy = {
      a: 'hello nio'
    }
    operation = new DataOp(proxy)
  })

  test('undefined key', () => {
    expect(operation.$get()).toBe(undefined)
  })

  test('get undefined value', () => {
    expect(operation.$get('b')).toBe(undefined)
  })

  test('get defined value', () => {
    expect(operation.$get('a')).toBe('hello nio')
  })
})

describe('dataOp.$set(key, val)', () => {
  beforeEach(() => {
    proxy = {}
    operation = new DataOp(proxy)
  })

  test('undefined key', () => {
    expect(operation.$set(undefined, 1)).toStrictEqual({
      undefined: 1
    })
  })

  test('string key', () => {
    const key = 'hello nio'
    expect(operation.$set(key, true)[key]).toBe(true)
  })

  test('number key', () => {
    const key = -9.10
    expect(operation.$set(key, true)[key]).toBe(true)
  })

  test('null key', () => {
    const key = null
    expect(operation.$set(key, true)[key]).toBe(true)
  })

  test('boolean key', () => {
    const key = true
    expect(operation.$set(key, true)[key]).toBe(true)
  })

  test('array key', () => {
    const key = ['hello nio']
    expect(operation.$set(key, true)[key]).toBe(true)
  })

  test('object key', () => {
    const key = { a: 'hello nio' }
    expect(operation.$set(key, true)[key]).toBe(true)
  })
})

describe('dataOp.$delete(key)', () => {
  beforeEach(() => {
    proxy = {
      a: 'hello nio'
    }
    operation = new DataOp(proxy)
  })

  test('delete undefined key', () => {
    expect(operation.$delete('b')).toStrictEqual({
      a: 'hello nio'
    })
  })

  test('delete key', () => {
    expect(operation.$delete('a')).toStrictEqual({})
  })
})

describe('dataOp.$exists(key)', () => {
  beforeEach(() => {
    proxy = {
      a: 'hello nio'
    }
    operation = new DataOp(proxy)
  })

  test('undefined key', () => {
    expect(operation.$exists(undefined)).toBe(false)
  })

  test('null key', () => {
    expect(operation.$exists(null)).toBe(false)
  })

  test('key does not exist', () => {
    expect(operation.$exists('b')).toBe(false)
  })

  test('key exists', () => {
    expect(operation.$exists('a')).toBe(true)
  })
})

describe('dataOp.$randomKey()', () => {
  beforeEach(() => {
    proxy = {
      a: 1,
      b: 2
    }
    operation = new DataOp(proxy)
    jest.spyOn(global.Math, 'random').mockReturnValue(0.7)
  })

  test('get a random key', () => {
    expect(operation.$randomKey()).toBe('b')
  })

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })
})

describe('dataOp.$rename(key, newKey)', () => {
  beforeEach(() => {
    proxy = {
      a: 1,
      b: 2
    }
    operation = new DataOp(proxy)
  })

  test('rename a valid key', () => {
    expect(operation.$rename('a', 'b')).toStrictEqual({
      b: 1
    })
  })

  test('rename a key that does not exist', () => {
    expect(operation.$rename(undefined, 'b')).toStrictEqual({
      a: 1,
      b: 2
    })
  })
})

describe('dataOp.$type(key)', () => {
  beforeEach(() => {
    proxy = {
      a: 1,
      b: true,
      c: '',
      d: null,
      e: [],
      f: {}
    }
    operation = new DataOp(proxy)
  })

  test('get number', () => {
    expect(operation.$type('a')).toBe('number')
  })

  test('get boolean', () => {
    expect(operation.$type('b')).toBe('boolean')
  })

  test('get string', () => {
    expect(operation.$type('c')).toBe('string')
  })

  test('get null', () => {
    expect(operation.$type('d')).toBe('null')
  })

  test('get array', () => {
    expect(operation.$type('e')).toBe('array')
  })

  test('get object', () => {
    expect(operation.$type('f')).toBe('object')
  })
})
