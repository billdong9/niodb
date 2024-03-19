export function getValidDataType(data) {
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

    if (data instanceof Set) {
        data = Array.from(data);
    }
    if (data instanceof Map) {
        data = Object.fromEntries(data);
    }

    if (Array.isArray(data)) {
        for (let i in data) {
            const validDataTypeObj = getValidDataType(data[i]);
            if (!validDataTypeObj.isValid) {
                return {
                    isValid: false
                }
            }
        }
        return {
            isValid: true,
            data
        }
    }
    if (data instanceof Object) {
        for (let key in data) {
            const validDataTypeObj = getValidDataType(data[key]);
            if (!validDataTypeObj.isValid) {
                return {
                    isValid: false
                }
            }
        }
        return {
            isValid: true,
            data
        }
    }

    // not valid
    return {
        isValid: false
    }
}