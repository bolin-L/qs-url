import baseUrl from './baseUrl';
import qs from 'qs';

// http://www.bolin.site/user/?id=1#/user/info?name=lbl&userId=456
const URL_QUERY_RE = /([^?#]+)\??([^#]*)#?(.*)/g; // host & search & hash & params

function parseUrl(args) {

    const opts = Object.assign({
        url: typeof args[1] === 'string' ? args[1] : baseUrl.get()
    }, typeof args[1] === 'object' ? args[1] : {});

    const parts = URL_QUERY_RE.exec(opts.url);

    console.log(parts);
    return {
        url: parts[1] || '',
        query: qs.parse(parts[2], opts) || {},
        hash: parts[3]
    }
}

function getQuery(fields) {
    const urlInfo = parseUrl(arguments);

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
    const urlInfo = parseUrl(arguments);
    const target = Object.assign(urlInfo.query, queryObj || {});
    const qsStr = qs.stringify(target, arguments[1]);

    return `${urlInfo.url}${qsStr ? '?' + qsStr : ''}${urlInfo.hash ? '#' + urlInfo.hash : ''}`
}

function removeQuery(fields) {
    const urlInfo = parseUrl(arguments);

    if (!fields || fields.length === 0) {
        return `${urlInfo.url}${urlInfo.hash ? '#' + urlInfo.hash : ''}`
    }

    if (Array.isArray(fields)) {
        fields.forEach(field => {
            delete urlInfo.query[field];
        });
    } else {
        delete urlInfo.query[fields];
    }

    const qsStr = qs.stringify(urlInfo.query, arguments[1]);

    return `${urlInfo.url}${qsStr ? '?' + qsStr : ''}${urlInfo.hash ? '#' + urlInfo.hash : ''}`
}

function getPath() {
    const urlInfo = parseUrl(arguments);

    return urlInfo.url;
}

export default {
    getQuery,
    addQuery,
    removeQuery,
    replaceQuery: addQuery,
    parseUrl,
    getPath
}