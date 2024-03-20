export class DataOp {
  proxy

  constructor (proxy) {
    this.proxy = proxy
  }

  /**
   * Return the value of a key
   */
  $get (key) {
    return this.proxy[key]
  }

  /**
   * Set a key to a value
   */
  $set (key, val) {
    this.proxy[key] = val
    return this.proxy
  }

  /**
   * Delete a key
   */
  $delete (key) {
    delete this.proxy[key]
    return this.proxy
  }

  /**
   * If the key exists
   */
  $exists (key) {
    return key in this.proxy
  }

  /**
   * Return a random key
   */
  $randomKey () {
    const keys = Object.keys(this.proxy)
    return keys[parseInt(Math.random() * keys.length)]
  }

  /**
   * Rename a key to a new key
   */
  $rename (key, newKey) {
    if (this.$exists(key)) {
      this.$set(newKey, this.$get(key)).$delete(key)
    }
    return this.proxy
  }

  /**
   * Return the type of a key
   * Possible values: string, number, boolean, object, array, null, undefined
   */
  $type (key) {
    const data = this.proxy[key]
    if (Array.isArray(data)) return 'array'
    if (data === null) return 'null'
    return typeof data
  }
}
