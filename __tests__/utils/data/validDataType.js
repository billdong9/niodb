'use strict'

import { getValidDataType } from '../../../src/utils/data/validDataType.js'

describe('getValidDataType(data)', () => {
  test('undefined', () => {
    expect(getValidDataType(undefined)).toStrictEqual({
      isValid: false
    })
  })

  test('null', () => {
    const data = null
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data
    })
  })

  test('string', () => {
    const data = 'hello world'
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data
    })
  })

  test('string object', () => {
    const data = new String('hello world')
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data: 'hello world'
    })
  })

  test('number', () => {
    const data = 0.0323
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data
    })
  })

  test('number object', () => {
    let data = new Number(0.0323)
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data: 0.0323
    })

    // NaN
    data = new Number(0 / 0)
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data: null
    })

    // Infinity
    data = new Number(1 / 0)
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data: null
    })
  })

  test('boolean', () => {
    const data = true
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data
    })
  })

  test('boolean object', () => {
    let data = new Boolean(0)
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data: false
    })

    data = new Boolean('string')
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data: true
    })
  })

  test('array', () => {
    const data = [1, 2, 3]
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data
    })
  })

  test('array deep clone', () => {
    class TestObj {
      a
      constructor () {
        this.a = true
      }
    }
    const data = [new TestObj()]
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data: [
        // deep clone, so not a TestObj instance
        {
          a: true
        }
      ]
    })
  })

  test('object', () => {
    const data = {
      arr: [-0.3, 2, 0.0003]
    }
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data
    })
  })

  test('null prototype object', () => {
    const data = Object.create(null)
    data.a = true
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data: {
        a: true
      }
    })
  })

  test('object deep clone', () => {
    class TestObj {
      a
      constructor () {
        this.a = [-0.3, 2, 0.0003]
      }
    }
    const data = new TestObj()
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      // deep clone, so not a TestObj instance
      data: {
        a: [-0.3, 2, 0.0003]
      }
    })
  })

  test('set', () => {
    const data = new Set([1, 2, 3])
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data: Array.from(data)
    })
  })

  test('map', () => {
    const data = new Map([
      [-1, 1], [-2, 2], [-3, 3]
    ])
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data: Object.fromEntries(data)
    })
  })

  test('not valid map', () => {
    const data = new Map([
      [-1, undefined], [-2, 2], [-3, 3]
    ])
    expect(getValidDataType(data)).toStrictEqual({
      isValid: false
    })
  })

  test('not valid set', () => {
    const data = new Set([undefined])
    expect(getValidDataType(data)).toStrictEqual({
      isValid: false
    })
  })
})
