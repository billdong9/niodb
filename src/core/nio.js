import { DataOp } from './operation.js'
import { loadDataFromFile } from '../utils/file/loadData.js'
import { writeDataToFile } from '../utils/file/writeData.js'
import { getValidDataType } from '../utils/data/validDataType.js'

class Nio {
  #filepath
  #isFileDatabase
  #isDataLoaded
  #isUpdaterActive

  constructor (filepath) {
    this.#filepath = filepath
    this.#isFileDatabase = true
    this.#isDataLoaded = false
    this.#isUpdaterActive = false

    // check if it is a memory-only database
    if (this.#filepath === undefined || this.#filepath === null || !this.#filepath) {
      this.#isFileDatabase = false
    }

    const proxy = this.#bindProxy(this)

    if (this.#isFileDatabase) {
      return new Promise((resolve, reject) => {
        try {
          loadDataFromFile(proxy, this.#filepath).then(() => {
            this.#isDataLoaded = true
            resolve(proxy)
          })
        } catch (err) {
          reject(err)
        }
      })
    }

    this.#isDataLoaded = true
    return proxy
  }

  #bindProxy (obj) {
    const proxy = new Proxy(obj, {
      get: (target, key) => {
        key = key.toString()

        if (obj[key] instanceof Object) return this.#bindProxy(obj[key])
        // check for data operation
        if (!(key in obj) && key in operation) {
          return operation[key]
        }
        return obj[key]
      },
      set: (target, key, val, receiver) => {
        key = key.toString()

        // check for valid val data type
        const dataTypeCheckObj = getValidDataType(val)
        if (!dataTypeCheckObj.isValid) {
          throw new TypeError('Cannot set "' + key + '" to "' + val + '", because it is not a valid data type.')
        }
        val = dataTypeCheckObj.data

        Reflect.set(target, key, val, receiver)
        this.#dataFileUpdater()
        return val
      },
      deleteProperty: (target, key) => {
        key = key.toString()
        Reflect.deleteProperty(target, key)
        this.#dataFileUpdater()
        return true
      }
    })
    const operation = new DataOp(proxy)

    return proxy
  }

  #dataFileUpdater () {
    if (this.#isUpdaterActive || !this.#isFileDatabase || !this.#isDataLoaded) return
    new Promise(resolve => {
      // sync
      this.#isUpdaterActive = true
      resolve()
    }).then(async () => {
      // async
      await writeDataToFile(this, this.#filepath)
      this.#isUpdaterActive = false
    })
  }
}

export { Nio }
