/**
 * DatabaseError class, an error that could be thrown by Nio applications.
 */

/**
 * Expose DatabaseError class.
 */

export class DatabaseError extends Error {
  /**
   * Initialize a DatabaseError.
   *
   * @api public
   */

  /**
   * @param {...any} args Any parameters of Error class
   */
  constructor (...args) {
    super(...args)
    this.name = 'DatabaseError'
  }
}
