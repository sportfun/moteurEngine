'use strict';

export function log(string) {
    if (process.env.NODE_ENV !== 'test') {
        console.log(string);
    }
}

export function logError(string) {
    if (process.env.NODE_ENV !== 'test') {
        console.error(string);
    }
}
