import qs from 'qs';

// http://www.bolin.site/user/?id=1#/user/info?name=lbl&userId=456
const URL_RE = /([^?#]+)\??([^#]*)#?([^?]*)\??([^#]*)/g; // host & search & hash & params
let baseUrl = '';

function getEnvBaseUrl() {
    /* istanbul ignore next  */
    const url = typeof window === 'object' ? window.location.href : '';
    /* istanbul ignore next  */
    return typeof weex === 'object' ? weex.config.bundleUrl : url;
}

function getUrl() {
    return baseUrl || getEnvBaseUrl();
}

function formatOptions(options) {
    const opts = Object.assign({
        url: typeof options === 'string' ? options : getUrl(),
    }, options || {});

    opts.url = opts.url ? opts.url : getUrl();

    return opts;
}

export default {
    setUrl(url) {
        baseUrl = url;
    },

    getUrl,

    formatOptions,

    parseUrl(options) {
        const opts = formatOptions(options);

        const parts = URL_RE.exec(opts.url) || [];

        // 全局正则exec必须手动把lastIndex置为0，否则多次执行时lastIndex为上一次的lastIndex
        URL_RE.lastIndex = 0;

        return {
            url: parts[1] || '',
            queryStr: parts[2] || '',
            query: qs.parse(parts[2], opts),
            hash: parts[3] || '',
            hashStr: parts[4] ? `${parts[3]}?${parts[4]}` : parts[3] || '',
            paramsStr: parts[4] || '',
            params: parts[4] ? qs.parse(parts[4], opts) : {},
        };
    },
    composeUrl(urlInfo) {
        const query = urlInfo.queryStr ? `?${urlInfo.queryStr}` : '';
        const hash = urlInfo.hash ? `#${urlInfo.hash}` : '';
        let params = '';

        if (urlInfo.hash) {
            params = urlInfo.paramsStr ? `?${urlInfo.paramsStr}` : '';
        } else {
            params = urlInfo.paramsStr ? `#?${urlInfo.paramsStr}` : '';
        }

        return `${urlInfo.url}${query}${hash}${params}`;
    },
};
