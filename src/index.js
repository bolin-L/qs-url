import qs from 'qs';
import query from './query';
import params from './params';
import base from './base';


export default {
    parse: qs.parse,
    stringify: qs.stringify,
    formats: qs.formats,
    getQuery: query.getQuery,
    addQuery: query.addQuery,
    removeQuery: query.removeQuery,
    replaceQuery: query.replaceQuery,
    getPath: query.getPath,
    getPathAndQuery: query.getPathAndQuery,
    getPathAndHash: query.getPathAndHash,
    getParams: params.getParams,
    addParams: params.addParams,
    removeParams: params.removeParams,
    replaceParams: params.replaceParams,
    setBaseUrl: base.setUrl,
    getBaseUrl: base.getUrl,
    parseUrl: base.parseUrl,
};