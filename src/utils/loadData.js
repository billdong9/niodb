import { readFile } from 'node:fs/promises';
import { DatabaseError } from './../class/error.js';

export async function loadDataFromFile(proxy, filepath) {
    try {
        const data = JSON.parse(await readFile(filepath, { encoding: 'utf8' }));
        for (let key in data) {
            proxy[key] = data[key];
        }
    } catch (err) {
        throw new DatabaseError('Reading json file ' + filepath + ' failed. ' + err.message);
    }
}