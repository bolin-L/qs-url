import qs from 'qs';
import base from './base';

function composeUrl(urlInfo) {
    const query = urlInfo.queryStr ? `?${urlInfo.queryStr}` : '';
    const hash = urlInfo.hash ? `#${urlInfo.hash}` : '';
    let params = '';

    if (urlInfo.hash) {
        params = urlInfo.paramsStr ? `?${urlInfo.paramsStr}` : '';
    } else {
        params = urlInfo.paramsStr ? `#?${urlInfo.paramsStr}` : '';
    }

    return `${urlInfo.url}${query}${hash}${params}`;
}

function getQuery(fields, options) {
    options = base.formatOptions(options);

    const urlInfo = base.parseUrl(options);

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

function addQuery(queryObj, options) {
    options = base.formatOptions(options);

    const urlInfo = base.parseUrl(options);
    const target = Object.assign(urlInfo.query, queryObj || {});

    urlInfo.queryStr = qs.stringify(target, options);

    return composeUrl(urlInfo);
}

function removeQuery(fields, options) {
    options = base.formatOptions(options);

    const urlInfo = base.parseUrl(options);

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

    urlInfo.queryStr = qs.stringify(urlInfo.query, options);

    return composeUrl(urlInfo);
}


function getPath(url) {
    const urlInfo = base.parseUrl(url);

    return urlInfo.url;
}

function getPathAndQuery(url) {
    const urlInfo = base.parseUrl(url);
    return `${urlInfo.url}${urlInfo.queryStr ? `?${urlInfo.queryStr}` : ''}`;
}

function getPathAndHash(url) {
    const urlInfo = base.parseUrl(url);
    return `${urlInfo.url}${urlInfo.hashStr ? `#${urlInfo.hashStr}` : ''}`;
}

export default {
    getQuery,
    addQuery,
    removeQuery,
    replaceQuery: addQuery,
    getPath,
    getPathAndQuery,
    getPathAndHash,
};
