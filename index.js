import * as qs from 'qs';
import * as query from './lib/query';
import * as params from './lib/params';
import baseUrl from './lib/baseUrl';


export default {
    qs,
    query,
    params,
    setBaseUrl: baseUrl.set
};