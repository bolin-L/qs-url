import baseUrl from './baseUrl';
import qs from 'qs';

function parseQueryAndReturn() {
    
}

function getQuery() {
    const argsLen = arguments.length;
    let url = baseUrl;
    let fields = '';

    if (argsLen === 1 && (typeof arguments[0] === 'string' || Array.isArray(arguments[0]))) {
        fields = arguments[0];
        return parseQueryAndReturn(fields);
    }

    if (argsLen === 2) {
        url = arguments[0];
        fields = arguments[1];
    }
}

export default {
    getQuery() {

    },

    addQuery() {

    },

    removeQuery() {

    },

    replaceQuery() {

    }
}