import qs from 'qs';

// example url: https://bolin.site/a/b/?test=lb?l12/#/image/c/d?name=lbl&age=#123&phoneSource=#ffff?
// [protocol][host][path][search][hash][params];
// protocol     -       (([a-z0-9\-_]+):\/\/)?                      任何带有:// 的协议
// host + path  -       (([a-z0-9.\-_]*)(\/[a-z0-9.\-_/]*))?        host与path的组合,以/分开
//        host  -       ([a-z0-9.\-_]*)                             host部分
//        path  -       (\/[a-z0-9.\-_/]*)                          path部分,多层路径/
// search       -       (\?(([^#]|#[^/])*))?                        search部分，key-value中可以存在?#/等任何字符，但是不能#/连字符共存
// hash         -       (#\/([^?]*)*)?                              hash部分, #/开头，不能包含？字符
// params       -       (\?(.*))?                                   params部分，hash后的参数key-value, 包含任何字符

// 匹配结果 mathes 1个匹配结果+12个子表达式
// mathes[0]    - 匹配结果
// mathes[1]    - protocol                  example: http://, https://, chrome-extension://
// mathes[2]    - protocolPure              example: http, https, chrome-extension
// mathes[3]    - host+path                 example: bolin.site/a/b/
// mathes[4]    - host                      example: bolin.site
// mathes[5]    - path                      example: /a/b/
// mathes[6]    - search                    example: ?test=lb?l12/, 带？
// mathes[7]    - searchKvPairs             example: test=lb?l12/
// mathes[8]    - search-useless            example: *,无用的子表达式
// mathes[9]    - hash                      example: #/image/c/d, 带#/
// mathes[10]   - hashPure                  example: image/c/d
// mathes[11]   - params                    example: ?name=lbl&age=#123&phoneSource=#ffff?, 带?
// mathes[12]   - paramsKvPairs             example: name=lbl&age=#123&phoneSource=#ffff?


const URL_RE = /(([a-z0-9\-_]+):\/\/)?(([a-z0-9.\-_]*)?(\/[a-z0-9.\-_/]*)?)?(\?(([^#]|#[^/])*))?(#\/([^?]*)*)?(\?(.*))?/gi;
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

        // 无论是否匹配上，matches结果都是 13; 匹配不上每个子表达式值为undefined
        const parts = URL_RE.exec(opts.url);

        // 全局正则exec必须手动把lastIndex置为0，否则多次执行时lastIndex为上一次的lastIndex
        URL_RE.lastIndex = 0;

        return {
            url: `${parts[1] || ''}${parts[3] || ''}`,
            queryStr: `${parts[7] || ''}`,
            query: qs.parse(parts[7], opts),
            hash: (parts[9] || '').replace('#/', '/'),
            hashStr: `${(parts[9] || '').replace('#/', '/')}${parts[11] || ''}`,
            paramsStr: parts[12] || '',
            params: parts[12] ? qs.parse(parts[12], opts) : {},
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
