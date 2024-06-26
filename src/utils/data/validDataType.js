/**
 * Check if the type of the data is a valid json data type
 */

/**
 * Expose getValidDataType function
 */

/**
 * @param {any} data
 * @returns "{
 *   isValid: is the type of the data a valid json data type
 *   data?: data after changing into a valid json type
 * }"
 */

export function getValidDataType (data) {
  // check for undefined
  if (data === undefined) {
    return {
      isValid: false
    }
  }

  // check for valid data types
  if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean' || data === null) {
    return {
      isValid: true,
      data
    }
  }
  if (data instanceof String) {
    return {
      isValid: true,
      data: data.toString()
    }
  }
  if (data instanceof Number) {
    if (Number.isFinite(data.valueOf())) {
      data = data.valueOf()
    } else {
      data = null
    }
    return {
      isValid: true,
      data
    }
  }
  if (data instanceof Boolean) {
    return {
      isValid: true,
      data: data.valueOf()
    }
  }

  if (data instanceof Set) {
    data = Array.from(data)
  }
  if (data instanceof Map) {
    data = Object.fromEntries(data)
  }

  if (Array.isArray(data)) {
    // deep clone the data
    const newData = []
    for (const i in data) {
      const validDataTypeObj = getValidDataType(data[i])
      if (!validDataTypeObj.isValid) {
        return {
          isValid: false
        }
      }
      newData[i] = validDataTypeObj.data
    }
    return {
      isValid: true,
      data: newData
    }
  }
  if (typeof data === 'object') {
    // ensuring the consistency of memory and disk json data & deep clone the data
    const newData = {}
    for (const key in data) {
      const validDataTypeObj = getValidDataType(data[key])
      if (!validDataTypeObj.isValid) {
        return {
          isValid: false
        }
      }
      newData[key] = validDataTypeObj.data
    }
    return {
      isValid: true,
      data: newData
    }
  }

  // not valid
  return {
    isValid: false
  }
}
