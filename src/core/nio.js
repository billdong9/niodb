/**
 * Import dependencies.
 */

import { DataOp } from './operation.js'
import { loadDataFromFile } from '../utils/file/loadData.js'
import { writeDataToFile } from '../utils/file/writeData.js'
import { getValidDataType } from '../utils/data/validDataType.js'

/**
 * Nio class, handling basic logic of the database
 */

/**
 * Expose Nio class
 */

export class Nio {
  #filepath
  #config
  #isFileDatabase
  #isDataLoaded
  #isUpdaterActive

  /**
   * Initialize a new Nio database.
   *
   * @api public
   */

  /**
   * @param {string} filepath Path of a json file
   * @param {object} config Database config
   * @param {function} config.transactionUpdated Callback function when the data file has been updated
   * @returns {Promise, Nio} Returns a Promise object when filepath is defined, otherwise returns a Nio instance
   */
  constructor (filepath, config) {
    this.#filepath = filepath
    this.#config = config
    this.#isFileDatabase = true
    this.#isDataLoaded = false
    this.#isUpdaterActive = false

    // check if it is a memory-only database
    if (this.#filepath === undefined || this.#filepath === null || !this.#filepath) {
      this.#isFileDatabase = false
    }
    if (typeof config !== 'object') {
      this.#config = {}
    }

    const proxy = this.#bindProxy(this)
    if (this.#isFileDatabase) {
      return new Promise((resolve, reject) => {
        // load data from the file into memory
        loadDataFromFile(proxy, this.#filepath).then(() => {
          this.#isDataLoaded = true
          resolve(proxy)
        }).catch((err) => {
          reject(err)
        })
      })
    }

    this.#isDataLoaded = true
    return proxy
  }

  /**
   * Create a proxy for Nio instance and objects within the instance.
   */

  /**
   * @param {object} obj Object that wants to proxy
   * @returns Proxy of the object
   */
  #bindProxy (obj) {
    const proxy = new Proxy(obj, {
      get: (target, key) => {
        key = key.toString()

        if (obj[key] instanceof Object) return this.#bindProxy(obj[key])
        // check for wrapper methods
        if (!(key in obj) && key in operation) {
          return operation[key]
        }
        return obj[key]
      },
      set: (target, key, val, receiver) => {
        key = key.toString()

        // check the data type of the value
        const dataTypeCheckObj = getValidDataType(val)
        if (!dataTypeCheckObj.isValid) {
          throw new TypeError('Cannot set "' + key + '" to "' + val + '", because it is not a valid data type.')
        }
        val = dataTypeCheckObj.data

        Reflect.set(target, key, val, receiver)

        // active file updater
        this.#dataFileUpdater()
        return true
      },
      deleteProperty: (target, key) => {
        key = key.toString()
        Reflect.deleteProperty(target, key)

        // active file updater
        this.#dataFileUpdater()
        return true
      }
    })
    const operation = new DataOp(proxy)

    return proxy
  }

  /**
   * Store data in memory to the file asynchronously
   */
  #dataFileUpdater () {
    if (this.#isUpdaterActive || !this.#isFileDatabase || !this.#isDataLoaded) return
    new Promise(resolve => {
      // sync
      this.#isUpdaterActive = true
      resolve()
    }).then(async () => {
      // async
      await writeDataToFile(this, this.#filepath)
      if (typeof this.#config.transactionUpdated === 'function') {
        this.#config.transactionUpdated()
      }
      this.#isUpdaterActive = false
    })
  }
}
