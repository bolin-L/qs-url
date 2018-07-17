import qs from 'qs';
import query from './lib/query';
import params from './lib/params';
import baseUrl from 'baseUrl';


export default {
    ...qs,
    ...query,
    ...params,
    setBaseUrl(url) {
        baseUrl = url;
    }
};