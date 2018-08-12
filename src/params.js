import qs from 'qs';
import base from './base';

function getParams(fields, options) {
    const urlInfo = base.parseUrl(options);

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

function addParams(paramsObj, options) {
    const urlInfo = base.parseUrl(options);
    const target = Object.assign(urlInfo.params, paramsObj || {});

    urlInfo.paramsStr = qs.stringify(target, options);

    return base.composeUrl(urlInfo);
}

function removeParams(fields, options) {
    const urlInfo = base.parseUrl(options);

    if (!fields || fields.length === 0) {
        urlInfo.paramsStr = '';

        return base.composeUrl(urlInfo);
    }

    if (Array.isArray(fields)) {
        fields.forEach(field => {
            delete urlInfo.params[field];
        });
    } else {
        delete urlInfo.params[fields];
    }

    urlInfo.paramsStr = qs.stringify(urlInfo.params, options);

    return base.composeUrl(urlInfo);
}

export default {
    getParams,
    addParams,
    removeParams,
    replaceParams: addParams,
};
