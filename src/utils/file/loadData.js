/**
 * Import dependencies
 */

import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { DatabaseError } from '../../class/error.js'

/**
 * Load data from the file
 */

/**
 * Expose loadDataFromFile function
 */

/**
 * @param {object} proxy The object into which the data will be loaded
 * @param {string} filepath
 */

export async function loadDataFromFile (proxy, filepath) {
  try {
    if (existsSync(filepath)) {
      const data = JSON.parse(await readFile(filepath, { encoding: 'utf8' }))
      for (const key in data) {
        proxy[key] = data[key]
      }
    }
  } catch (err) {
    throw new DatabaseError('Reading and parsing file ' + filepath + ' failed. ' + err.message)
  }
}
