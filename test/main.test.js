const { Nio, DatabaseError } = require('../dist/main.cjs')

test('all exports', () => {
  expect(typeof Nio).toBe('function')
  expect(typeof DatabaseError).toBe('function')
})
