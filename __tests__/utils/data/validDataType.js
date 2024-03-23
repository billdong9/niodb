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

  test('number', () => {
    const data = 0.0323
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data
    })
  })

  test('boolean', () => {
    const data = true
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data
    })
  })

  test('array', () => {
    const data = [1, 2, 3]
    expect(getValidDataType(data)).toStrictEqual({
      isValid: true,
      data
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
