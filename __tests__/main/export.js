'use strict'

import { Nio, DatabaseError } from '../../src/main.js'

describe('import niodb', () => {
  test('testing exports', () => {
    expect(Nio).toBeDefined()
    expect(DatabaseError).toBeDefined()
  })
})
