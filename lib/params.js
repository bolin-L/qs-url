import baseUrl from './baseUrl';
import qs from 'qs';

// http://bolin.site/active/xxx/om.html/?name=111#/user/info?id=111
const URL_PARAMS_RE = /([^?#]+)\??([^#]*)#?([^?]*)\??([^#]*)/g; // host & search & hash & params

function parseUrl(args) {

    const opts = Object.assign({
        url: typeof args[1] === 'string' ? args[1] : baseUrl
    }, args[1] || {});

    const parts = opts.url.match(URL_PARAMS_RE);

    return {
        url: parts[0],
        query: parts[1],
        hash: parts[2],
        params: parts[2] && parts[3] ? qs.parse(parts[3], opts) : {},
    }
}

function getParams(fields) {
    const urlInfo = parseUrl(arguments);

    if (!fields || fields.length === 0) {
        return urlInfo.params;
    }

    if (Array.isArray(fields)) {
        const tmp = {};

        fields.forEach(field => {
            tmp[field] = urlInfo.params[field];
        });

        return tmp;
    }

    return urlInfo.params[fields];
}

function addParams(paramsObj) {
    const urlInfo = parseUrl(arguments);
    const target = Object.assign(urlInfo.params, paramsObj || {});
    const paramsStr = qs.stringify(target, arguments[1]);

    return `${urlInfo.url}${urlInfo.query ? '?' + urlInfo.query : ''}${urlInfo.hash ? '#' + urlInfo.hash : ''}${urlInfo.hash && paramsStr ? '?' + paramsStr : ''}`;
}

function removeParams(fields) {
    const urlInfo = parseUrl(arguments);

    if (!fields || fields.length === 0) {
        return `${urlInfo.url}${urlInfo.query ? '?' + urlInfo.query : ''}${urlInfo.hash ? '#' + urlInfo.hash : ''}`;
    }

    if (Array.isArray(fields)) {
        fields.forEach(field => {
            delete urlInfo.params[field];
        });
    } else {
        delete urlInfo.params[fields];
    }

    const paramsStr = qs.stringify(urlInfo.params, arguments[1]);

    return `${urlInfo.url}${urlInfo.query ? '?' + urlInfo.query : ''}${urlInfo.hash ? '#' + urlInfo.hash : ''}${paramsStr ? '?' + paramsStr : ''}`;
}


function getPathAndSearch() {
    const urlInfo = parseUrl(arguments);
    return `${urlInfo.url}${urlInfo.query ? '?' + urlInfo.query : ''}`;
}

export default {
    getParams,
    addParams,
    removeParams,
    replaceParams: addParams,
    getPathAndSearch
}