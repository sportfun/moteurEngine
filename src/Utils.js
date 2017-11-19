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

export function isValidNumber(value) {
    if (typeof value === 'undefined' || value === null || isNaN(value))
        return (false);
    return (true);
}

export function isValidType(value, type) {
    if (typeof value === 'undefined' || value === null || value.constructor.name !== type)
        return (false);
    return (true);
}
