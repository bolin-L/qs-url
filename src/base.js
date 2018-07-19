import qs from 'qs';

// http://www.bolin.site/user/?id=1#/user/info?name=lbl&userId=456
const URL_RE = /([^?#]+)\??([^#]*)#?([^?]*)\??([^#]*)/g; // host & search & hash & params
let baseUrl = '';

function getEnvBaseUrl() {
    return typeof window === 'object' ? window.location.href : typeof weex === 'object' ? weex.config.bundleUrl : '';
}

function getUrl() {
    return baseUrl ? baseUrl : getEnvBaseUrl()
}

export default {
    setUrl(url) {
        baseUrl = url;
    },

    getUrl,

    parseUrl(options) {
        const opts = Object.assign({
            url: typeof options === 'string' ? options : getUrl()
        }, typeof options === 'object' ? options : {});

        const parts = URL_RE.exec(opts.url) || [];

        // 全局正则exec必须手动把lastIndex置为0，否则多次执行时lastIndex为上一次的lastIndex
        URL_RE.lastIndex = 0;

        return {
            url: parts[1] || '',
            queryStr: parts[2] || '',
            query: qs.parse(parts[2], opts) || {},
            hash: parts[3] || '',
            hashStr: `${parts[3]}${parts[4] ? '?'+parts[4] : '' }`,
            paramsStr: parts[4] || '',
            params: parts[4] ? qs.parse(parts[4], opts) : {},
        }
    }
};