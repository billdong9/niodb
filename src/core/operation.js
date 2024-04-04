/**
 * DataOp, wrapper methods of the database
 */

/**
 * Expose DataOp class
 */

export class DataOp {
  proxy

  /**
   * Initialize a new object of wrapper methods.
   */

  /**
   * @param {Proxy} proxy Object that needs the wrapper methods
   */
  constructor (proxy) {
    this.proxy = proxy
  }

  /**
   * Return the value of a key
   */

  /**
   * @param {string} key
   * @returns value
   */
  $get (key) {
    return this.proxy[key]
  }

  /**
   * Set a key to hold a value
   */

  /**
   * @param {string} key
   * @param {any} val
   * @returns Proxy
   */
  $set (key, val) {
    this.proxy[key] = val
    return this.proxy
  }

  /**
   * Delete a key
   */

  /**
   * @param {string} key
   * @returns Proxy
   */
  $delete (key) {
    delete this.proxy[key]
    return this.proxy
  }

  /**
   * If the key exists
   */

  /**
   * @param {string} key
   * @returns If key exists
   */
  $exists (key) {
    return key in this.proxy
  }

  /**
   * Return a random key
   */

  /**
   * @returns a random key
   */
  $randomKey () {
    const keys = Object.keys(this.proxy)
    return keys[parseInt(Math.random() * keys.length)]
  }

  /**
   * Rename a key to a new key
   */

  /**
   * @param {string} key
   * @param {string} newKey
   * @returns Proxy
   */
  $rename (key, newKey) {
    if (this.$exists(key)) {
      this.$set(newKey, this.$get(key))
      this.$delete(key)
    }
    return this.proxy
  }

  /**
   * Return the type of the value stored in a key
   * Possible values: string, number, boolean, object, array, null, undefined
   */

  /**
   * @param {string} key
   * @returns type of the value stored in a key
   */
  $type (key) {
    const data = this.proxy[key]
    if (Array.isArray(data)) return 'array'
    if (data === null) return 'null'
    return typeof data
  }
}
