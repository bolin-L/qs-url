let baseUrl = '';

if (typeof window === 'object') {
    url = window.location.href;
} else if (typeof weex === 'object') {
    url = weex.config.bundleUrl;
}

export default {
    set(url) {
        baseUrl = url;
    },

    get() {
        return baseUrl;
    }
};