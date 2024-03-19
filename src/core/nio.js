import { DataOp } from "./operation.js";
import { loadDataFromFile } from "../utils/file/loadData.js";
import { writeDataToFile } from "../utils/file/writeData.js";
import { getValidDataType } from "../utils/data/validDataType.js";

class Nio {
    #filepath;
    #isFileDatabase;
    #isDataLoaded;
    #isUpdaterActive;

    constructor(filepath) {
        this.#filepath = filepath;
        this.#isFileDatabase = true;
        this.#isDataLoaded = false;
        this.#isUpdaterActive = false;

        // check if it is a memory-only database
        if (this.#filepath === undefined || this.#filepath === null || !this.#filepath) {
            this.#isFileDatabase = false;
        }

        const proxy = this.#bindProxy(this);

        if (this.#isFileDatabase) {
            return new Promise(async (res, rej) => {
                try {
                    await loadDataFromFile(proxy, this.#filepath);
                    this.#isDataLoaded = true;
                    res(proxy);
                } catch (err) {
                    rej(err);
                }
            })
        }

        this.#isDataLoaded = true;
        return proxy;
    }

    #bindProxy(obj) {
        const proxy = new Proxy(obj, {
            get: (target, key) => {
                if (obj[key] instanceof Object) return this.#bindProxy(obj[key]);
                // check for data operation
                if (!(key in obj) && key in operation) {
                    return operation[key];
                }
                return obj[key];
            },
            set: (target, key, val, receiver) => {
                // check for valid val data type. If undefined, then delete the key.
                const dataTypeCheckObj = getValidDataType(val);
                if (!dataTypeCheckObj.isValid) {
                    throw new TypeError('Cannot set "' + key + '" to "' + val + '", because it is not a valid data type.');
                }
                val = dataTypeCheckObj.data;

                Reflect.set(target, key, val, receiver);
                this.#dataFileUpdater();
                return val;
            },
            deleteProperty: (target, key) => {
                Reflect.deleteProperty(target, key);
                this.#dataFileUpdater();
                return true;
            }
        }),
            operation = new DataOp(proxy);

        return proxy;
    }

    #dataFileUpdater() {
        if (this.#isUpdaterActive || !this.#isFileDatabase || !this.#isDataLoaded) return;
        new Promise(res => {
            // sync
            this.#isUpdaterActive = true;
            res();
        }).then(async () => {
            // async
            await writeDataToFile(this, this.#filepath);
            this.#isUpdaterActive = false;
        })
    }

}

export { Nio };