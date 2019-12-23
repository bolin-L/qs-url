import qs from 'qs';

// example url: https://bolin.site:80/a/b/?test=lb?l12/#/image/c/d?name=lbl&age=#123&phoneSource=#ffff?
// [protocol][host][port][path][search][hash][params];
// protocol     -       (([a-z0-9\-_]+):\/\/)?                                  任何带有:// 的协议
// host + path  -       (([a-z0-9.\-_]*)?(:(\w+))?(\/[a-z0-9.\-_/]*))?          host与port与path的组合,以/分开
//        host  -       ([a-z0-9.\-_]*)                                         host部分
//        port  -       (:(\w+))                                                port部分
//        path  -       (\/[a-z0-9.\-_/]*)                                      path部分,多层路径/
// search       -       (\?(([^#]|#[^/])*))?                                    search部分，key-value中可以存在?#/等任何字符，但是不能#/连字符共存
// hash         -       (#\/([^?]*)*)?                                          hash部分, #/开头，不能包含？字符
// params       -       (\?(.*))?                                               params部分，hash后的参数key-value, 包含任何字符

// 匹配结果 mathes 1个匹配结果+12个子表达式
// mathes[0]    - 匹配结果
// mathes[1]    - protocol                  example: http://, https://, chrome-extension://
// mathes[2]    - protocolPure              example: http, https, chrome-extension
// mathes[3]    - host+port+path            example: bolin.site:80/a/b/
// mathes[4]    - host                      example: bolin.site
// mathes[5]    - port                      example: :80
// mathes[6]    - portPure                  example: 80
// mathes[7]    - path                      example: /a/b/
// mathes[8]    - search                    example: ?test=lb?l12/, 带？
// mathes[9]    - searchKvPairs             example: test=lb?l12/
// mathes[10]   - search-useless            example: *,无用的子表达式
// mathes[11]   - hash                      example: #/image/c/d, 带#/
// mathes[12]   - hashPure                  example: image/c/d
// mathes[13]   - params                    example: ?name=lbl&age=#123&phoneSource=#ffff?, 带?
// mathes[14]   - paramsKvPairs             example: name=lbl&age=#123&phoneSource=#ffff?


const URL_RE = /(([a-z0-9\-_]+):\/\/)?(([a-z0-9.\-_]*)?(:(\w+))?(\/[a-z0-9.\-_/]*)?)?(\?(([^#]|#[^/])*))?(#\/([^?]*)*)?(\?(.*))?/gi;
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
    }, typeof options === 'string' ? {} : options);

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

        // 无论是否匹配上，matches结果都是 15; 匹配不上每个子表达式值为undefined
        const parts = URL_RE.exec(opts.url);

        // 全局正则exec必须手动把lastIndex置为0，否则多次执行时lastIndex为上一次的lastIndex
        URL_RE.lastIndex = 0;

        return {
            url: `${parts[1] || ''}${parts[3] || ''}`,
            queryStr: `${parts[9] || ''}`,
            query: qs.parse(parts[9], opts),
            hash: (parts[11] || '').replace('#/', '/'),
            hashStr: `${(parts[11] || '').replace('#/', '/')}${parts[13] || ''}`,
            paramsStr: parts[14] || '',
            params: parts[14] ? qs.parse(parts[14], opts) : {},
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
    parseUrl2(options) {
        const opts = formatOptions(options);

        // 无论是否匹配上，matches结果都是 15; 匹配不上每个子表达式值为undefined
        const parts = URL_RE.exec(opts.url);

        // 全局正则exec必须手动把lastIndex置为0，否则多次执行时lastIndex为上一次的lastIndex
        URL_RE.lastIndex = 0;

        return {
            protocol: parts[1],
            protocolPure: parts[2],
            hostPortPath: parts[3],
            host: parts[4],
            port: parts[5],
            portPure: parts[6],
            path: parts[7],
            search: parts[8],
            searchKvPairs: parts[9],
            hash: parts[11],
            hashPure: parts[12],
            params: parts[13],
            paramsKvPairs: parts[14],
        };
    },
};
