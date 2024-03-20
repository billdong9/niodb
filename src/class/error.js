export class DatabaseError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'DatabaseError'
  }
}
