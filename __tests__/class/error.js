'use strict'

import { DatabaseError } from '../../src/class/error.js'

describe('new DatabaseError(...args)', () => {
  test('testing error', () => {
    const error = new DatabaseError('message')
    expect(error).toBeInstanceOf(Error)
    expect(error.name).toBe('DatabaseError')
    expect(error.message).toBe('message')
  })
})
