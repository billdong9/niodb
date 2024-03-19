import { DataOp } from "./operation.js";
import { loadDataFromFile } from "../utils/loadData.js";

class Nio {
    #filepath;
    #isFileDatabase;
    #data;
    #isDataLoaded;
    #isUpdaterActive;

    constructor(filepath) {
        this.#filepath = filepath;
        this.#isFileDatabase = true;
        this.#data = {};
        this.#isDataLoaded = false;
        this.#isUpdaterActive = false;

        // check if it is a memory-only database
        if (this.#filepath === undefined || this.#filepath === null || !this.#filepath) {
            this.#isFileDatabase = false;
        }

        const proxy = this.#bindProxy(this, this.#data);

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

    #bindProxy(obj, dataObj) {
        const proxy = new Proxy(obj, {
            get: (target, key) => {
                if (dataObj[key] instanceof Object) return this.#bindProxy(obj[key], dataObj[key]);
                // check for Nio class methods
                if (obj === this && !(key in dataObj) && key in this) {
                    return this[key];
                }
                // check for data operation
                if (!(key in dataObj) && key in operation) {
                    return operation[key];
                }
                return dataObj[key];
            },
            set: (target, key, val, receiver) => {
                // check for valid val data type. If undefined, then delete the key.

                Reflect.set(target, key, val, receiver);
                dataObj[key] = val;
                this.#dataFileUpdater();
                return val;
            },
            deleteProperty: (target, key) => {
                Reflect.deleteProperty(target, key);
                delete dataObj[key];
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
        }).then(() => {
            // async
            console.log(332123);
            this.#isUpdaterActive = false;
        })
    }

}

export { Nio };