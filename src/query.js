import base from './base';
import qs from 'qs';

function getQuery(fields) {
    const urlInfo = base.parseUrl(arguments[1]);

    if (!fields || fields.length === 0) {
        return urlInfo.query;
    }

    if (Array.isArray(fields)) {
        const tmp = {};

        fields.forEach(field => {
            tmp[field] = urlInfo.query[field];
        });

        return tmp;
    }

    return urlInfo.query[fields];
}

function addQuery(queryObj) {
    const urlInfo = base.parseUrl(arguments[1]);
    const target = Object.assign(urlInfo.query, queryObj || {});

    urlInfo.queryStr = qs.stringify(target, arguments[1]);

    return composeUrl(urlInfo);
}

function removeQuery(fields) {
    const urlInfo = base.parseUrl(arguments[1]);

    if (!fields || fields.length === 0) {
        urlInfo.queryStr = '';

        return composeUrl(urlInfo);
    }

    if (Array.isArray(fields)) {
        fields.forEach(field => {
            delete urlInfo.query[field];
        });
    } else {
        delete urlInfo.query[fields];
    }

    urlInfo.queryStr  = qs.stringify(urlInfo.query, arguments[1]);

    return composeUrl(urlInfo);
}

function composeUrl(urlInfo) {
    return `${urlInfo.url}${urlInfo.queryStr ? '?' + urlInfo.queryStr : ''}${urlInfo.hash ? '#' + urlInfo.hash : ''}${urlInfo.paramsStr ? urlInfo.hash ? '?' + urlInfo.paramsStr : '#?' + urlInfo.paramsStr : ''}`;
}

function getPath(url) {
    const urlInfo = base.parseUrl(url);

    return urlInfo.url;
}

function getPathAndQuery() {
    const urlInfo = base.parseUrl(arguments[1]);
    return `${urlInfo.url}${urlInfo.queryStr ? '?' + urlInfo.queryStr : ''}`;
}

function getPathAndHash() {
    const urlInfo = base.parseUrl(arguments[1]);
    return `${urlInfo.url}${urlInfo.hashStr ? '#' + urlInfo.hashStr : ''}`;
}

export default {
    getQuery,
    addQuery,
    removeQuery,
    replaceQuery: addQuery,
    getPath,
    getPathAndQuery,
    getPathAndHash,
}