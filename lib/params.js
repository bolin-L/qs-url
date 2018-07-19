import base from './base';
import qs from 'qs';


function getParams(fields) {
    const urlInfo = base.parseUrl(arguments[1]);

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
    const urlInfo = base.parseUrl(arguments[1]);
    const target = Object.assign(urlInfo.params, paramsObj || {});

    urlInfo.paramsStr = qs.stringify(target, arguments[1]);

    return composeUrl(urlInfo);
}

function removeParams(fields) {
    const urlInfo = base.parseUrl(arguments[1]);

    if (!fields || fields.length === 0) {
       urlInfo.paramsStr = '';

        return composeUrl(urlInfo);
    }

    if (Array.isArray(fields)) {
        fields.forEach(field => {
            delete urlInfo.params[field];
        });
    } else {
        delete urlInfo.params[fields];
    }

    urlInfo.paramsStr = qs.stringify(urlInfo.params, arguments[1]);

    return composeUrl(urlInfo);
}

function composeUrl(urlInfo) {
    return `${urlInfo.url}${urlInfo.queryStr ? '?' + urlInfo.queryStr : ''}${urlInfo.hash ? '#' + urlInfo.hash : ''}${urlInfo.paramsStr ? urlInfo.hash ? '?' + paramsStr : '#?' + paramsStr : ''}`;
}

export default {
    getParams,
    addParams,
    removeParams,
    replaceParams: addParams,
}