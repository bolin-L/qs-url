module.exports = function (r) {
    var e = {};

    function t(n) {
        if (e[n])return e[n].exports;
        var a = e[n] = {i: n, l: !1, exports: {}};
        return r[n].call(a.exports, a, a.exports, t), a.l = !0, a.exports
    }

    return t.m = r, t.c = e, t.d = function (r, e, n) {
        t.o(r, e) || Object.defineProperty(r, e, {enumerable: !0, get: n})
    }, t.r = function (r) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(r, "__esModule", {value: !0})
    }, t.t = function (r, e) {
        if (1 & e && (r = t(r)), 8 & e)return r;
        if (4 & e && "object" == typeof r && r && r.__esModule)return r;
        var n = Object.create(null);
        if (t.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: r
            }), 2 & e && "string" != typeof r)for (var a in r)t.d(n, a, function (e) {
            return r[e]
        }.bind(null, a));
        return n
    }, t.n = function (r) {
        var e = r && r.__esModule ? function () {
                return r.default
            } : function () {
                return r
            };
        return t.d(e, "a", e), e
    }, t.o = function (r, e) {
        return Object.prototype.hasOwnProperty.call(r, e)
    }, t.p = "", t(t.s = 5)
}([function (r, e, t) {
    "use strict";
    var n = t(3), a = t(4), o = t(2);
    r.exports = {formats: o, parse: a, stringify: n}
}, function (r, e, t) {
    "use strict";
    var n = Object.prototype.hasOwnProperty, a = function () {
        for (var r = [], e = 0; e < 256; ++e)r.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
        return r
    }(), o = function (r, e) {
        for (var t = e && e.plainObjects ? Object.create(null) : {}, n = 0; n < r.length; ++n)void 0 !== r[n] && (t[n] = r[n]);
        return t
    };
    r.exports = {
        arrayToObject: o, assign: function (r, e) {
            return Object.keys(e).reduce(function (r, t) {
                return r[t] = e[t], r
            }, r)
        }, compact: function (r) {
            for (var e = [{
                obj: {o: r},
                prop: "o"
            }], t = [], n = 0; n < e.length; ++n)for (var a = e[n], o = a.obj[a.prop], i = Object.keys(o), l = 0; l < i.length; ++l) {
                var s = i[l], c = o[s];
                "object" == typeof c && null !== c && -1 === t.indexOf(c) && (e.push({obj: o, prop: s}), t.push(c))
            }
            return function (r) {
                for (var e; r.length;) {
                    var t = r.pop();
                    if (e = t.obj[t.prop], Array.isArray(e)) {
                        for (var n = [], a = 0; a < e.length; ++a)void 0 !== e[a] && n.push(e[a]);
                        t.obj[t.prop] = n
                    }
                }
                return e
            }(e)
        }, decode: function (r) {
            try {
                return decodeURIComponent(r.replace(/\+/g, " "))
            } catch (e) {
                return r
            }
        }, encode: function (r) {
            if (0 === r.length)return r;
            for (var e = "string" == typeof r ? r : String(r), t = "", n = 0; n < e.length; ++n) {
                var o = e.charCodeAt(n);
                45 === o || 46 === o || 95 === o || 126 === o || o >= 48 && o <= 57 || o >= 65 && o <= 90 || o >= 97 && o <= 122 ? t += e.charAt(n) : o < 128 ? t += a[o] : o < 2048 ? t += a[192 | o >> 6] + a[128 | 63 & o] : o < 55296 || o >= 57344 ? t += a[224 | o >> 12] + a[128 | o >> 6 & 63] + a[128 | 63 & o] : (n += 1, o = 65536 + ((1023 & o) << 10 | 1023 & e.charCodeAt(n)), t += a[240 | o >> 18] + a[128 | o >> 12 & 63] + a[128 | o >> 6 & 63] + a[128 | 63 & o])
            }
            return t
        }, isBuffer: function (r) {
            return null !== r && void 0 !== r && !!(r.constructor && r.constructor.isBuffer && r.constructor.isBuffer(r))
        }, isRegExp: function (r) {
            return "[object RegExp]" === Object.prototype.toString.call(r)
        }, merge: function r(e, t, a) {
            if (!t)return e;
            if ("object" != typeof t) {
                if (Array.isArray(e)) e.push(t); else {
                    if ("object" != typeof e)return [e, t];
                    (a.plainObjects || a.allowPrototypes || !n.call(Object.prototype, t)) && (e[t] = !0)
                }
                return e
            }
            if ("object" != typeof e)return [e].concat(t);
            var i = e;
            return Array.isArray(e) && !Array.isArray(t) && (i = o(e, a)), Array.isArray(e) && Array.isArray(t) ? (t.forEach(function (t, o) {
                    n.call(e, o) ? e[o] && "object" == typeof e[o] ? e[o] = r(e[o], t, a) : e.push(t) : e[o] = t
                }), e) : Object.keys(t).reduce(function (e, o) {
                    var i = t[o];
                    return n.call(e, o) ? e[o] = r(e[o], i, a) : e[o] = i, e
                }, i)
        }
    }
}, function (r, e, t) {
    "use strict";
    var n = String.prototype.replace, a = /%20/g;
    r.exports = {
        default: "RFC3986", formatters: {
            RFC1738: function (r) {
                return n.call(r, a, "+")
            }, RFC3986: function (r) {
                return r
            }
        }, RFC1738: "RFC1738", RFC3986: "RFC3986"
    }
}, function (r, e, t) {
    "use strict";
    var n = t(1), a = t(2), o = {
        brackets: function (r) {
            return r + "[]"
        }, indices: function (r, e) {
            return r + "[" + e + "]"
        }, repeat: function (r) {
            return r
        }
    }, i = Date.prototype.toISOString, l = {
        delimiter: "&",
        encode: !0,
        encoder: n.encode,
        encodeValuesOnly: !1,
        serializeDate: function (r) {
            return i.call(r)
        },
        skipNulls: !1,
        strictNullHandling: !1
    }, s = function r(e, t, a, o, i, s, c, u, f, p, y, d) {
        var m = e;
        if ("function" == typeof c) m = c(t, m); else if (m instanceof Date) m = p(m); else if (null === m) {
            if (o)return s && !d ? s(t, l.encoder) : t;
            m = ""
        }
        if ("string" == typeof m || "number" == typeof m || "boolean" == typeof m || n.isBuffer(m))return s ? [y(d ? t : s(t, l.encoder)) + "=" + y(s(m, l.encoder))] : [y(t) + "=" + y(String(m))];
        var g, h = [];
        if (void 0 === m)return h;
        if (Array.isArray(c)) g = c; else {
            var b = Object.keys(m);
            g = u ? b.sort(u) : b
        }
        for (var v = 0; v < g.length; ++v) {
            var j = g[v];
            i && null === m[j] || (h = Array.isArray(m) ? h.concat(r(m[j], a(t, j), a, o, i, s, c, u, f, p, y, d)) : h.concat(r(m[j], t + (f ? "." + j : "[" + j + "]"), a, o, i, s, c, u, f, p, y, d)))
        }
        return h
    };
    r.exports = function (r, e) {
        var t = r, i = e ? n.assign({}, e) : {};
        if (null !== i.encoder && void 0 !== i.encoder && "function" != typeof i.encoder)throw new TypeError("Encoder has to be a function.");
        var c = void 0 === i.delimiter ? l.delimiter : i.delimiter, u = "boolean" == typeof i.strictNullHandling ? i.strictNullHandling : l.strictNullHandling, f = "boolean" == typeof i.skipNulls ? i.skipNulls : l.skipNulls, p = "boolean" == typeof i.encode ? i.encode : l.encode, y = "function" == typeof i.encoder ? i.encoder : l.encoder, d = "function" == typeof i.sort ? i.sort : null, m = void 0 !== i.allowDots && i.allowDots, g = "function" == typeof i.serializeDate ? i.serializeDate : l.serializeDate, h = "boolean" == typeof i.encodeValuesOnly ? i.encodeValuesOnly : l.encodeValuesOnly;
        if (void 0 === i.format) i.format = a.default; else if (!Object.prototype.hasOwnProperty.call(a.formatters, i.format))throw new TypeError("Unknown format option provided.");
        var b, v, j = a.formatters[i.format];
        "function" == typeof i.filter ? t = (v = i.filter)("", t) : Array.isArray(i.filter) && (b = v = i.filter);
        var O, P = [];
        if ("object" != typeof t || null === t)return "";
        O = i.arrayFormat in o ? i.arrayFormat : "indices" in i ? i.indices ? "indices" : "repeat" : "indices";
        var A = o[O];
        b || (b = Object.keys(t)), d && b.sort(d);
        for (var S = 0; S < b.length; ++S) {
            var w = b[S];
            f && null === t[w] || (P = P.concat(s(t[w], w, A, u, f, p ? y : null, v, d, m, g, j, h)))
        }
        var x = P.join(c), U = !0 === i.addQueryPrefix ? "?" : "";
        return x.length > 0 ? U + x : ""
    }
}, function (r, e, t) {
    "use strict";
    var n = t(1), a = Object.prototype.hasOwnProperty, o = {
        allowDots: !1,
        allowPrototypes: !1,
        arrayLimit: 20,
        decoder: n.decode,
        delimiter: "&",
        depth: 5,
        parameterLimit: 1e3,
        plainObjects: !1,
        strictNullHandling: !1
    }, i = function (r, e, t) {
        if (r) {
            var n = t.allowDots ? r.replace(/\.([^.[]+)/g, "[$1]") : r, o = /(\[[^[\]]*])/g, i = /(\[[^[\]]*])/.exec(n), l = i ? n.slice(0, i.index) : n, s = [];
            if (l) {
                if (!t.plainObjects && a.call(Object.prototype, l) && !t.allowPrototypes)return;
                s.push(l)
            }
            for (var c = 0; null !== (i = o.exec(n)) && c < t.depth;) {
                if (c += 1, !t.plainObjects && a.call(Object.prototype, i[1].slice(1, -1)) && !t.allowPrototypes)return;
                s.push(i[1])
            }
            return i && s.push("[" + n.slice(i.index) + "]"), function (r, e, t) {
                for (var n = e, a = r.length - 1; a >= 0; --a) {
                    var o, i = r[a];
                    if ("[]" === i) o = (o = []).concat(n); else {
                        o = t.plainObjects ? Object.create(null) : {};
                        var l = "[" === i.charAt(0) && "]" === i.charAt(i.length - 1) ? i.slice(1, -1) : i, s = parseInt(l, 10);
                        !isNaN(s) && i !== l && String(s) === l && s >= 0 && t.parseArrays && s <= t.arrayLimit ? (o = [])[s] = n : o[l] = n
                    }
                    n = o
                }
                return n
            }(s, e, t)
        }
    };
    r.exports = function (r, e) {
        var t = e ? n.assign({}, e) : {};
        if (null !== t.decoder && void 0 !== t.decoder && "function" != typeof t.decoder)throw new TypeError("Decoder has to be a function.");
        if (t.ignoreQueryPrefix = !0 === t.ignoreQueryPrefix, t.delimiter = "string" == typeof t.delimiter || n.isRegExp(t.delimiter) ? t.delimiter : o.delimiter, t.depth = "number" == typeof t.depth ? t.depth : o.depth, t.arrayLimit = "number" == typeof t.arrayLimit ? t.arrayLimit : o.arrayLimit, t.parseArrays = !1 !== t.parseArrays, t.decoder = "function" == typeof t.decoder ? t.decoder : o.decoder, t.allowDots = "boolean" == typeof t.allowDots ? t.allowDots : o.allowDots, t.plainObjects = "boolean" == typeof t.plainObjects ? t.plainObjects : o.plainObjects, t.allowPrototypes = "boolean" == typeof t.allowPrototypes ? t.allowPrototypes : o.allowPrototypes, t.parameterLimit = "number" == typeof t.parameterLimit ? t.parameterLimit : o.parameterLimit, t.strictNullHandling = "boolean" == typeof t.strictNullHandling ? t.strictNullHandling : o.strictNullHandling, "" === r || null === r || void 0 === r)return t.plainObjects ? Object.create(null) : {};
        for (var l = "string" == typeof r ? function (r, e) {
                for (var t = {}, n = e.ignoreQueryPrefix ? r.replace(/^\?/, "") : r, i = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit, l = n.split(e.delimiter, i), s = 0; s < l.length; ++s) {
                    var c, u, f = l[s], p = f.indexOf("]="), y = -1 === p ? f.indexOf("=") : p + 1;
                    -1 === y ? (c = e.decoder(f, o.decoder), u = e.strictNullHandling ? null : "") : (c = e.decoder(f.slice(0, y), o.decoder), u = e.decoder(f.slice(y + 1), o.decoder)), a.call(t, c) ? t[c] = [].concat(t[c]).concat(u) : t[c] = u
                }
                return t
            }(r, t) : r, s = t.plainObjects ? Object.create(null) : {}, c = Object.keys(l), u = 0; u < c.length; ++u) {
            var f = c[u], p = i(f, l[f], t);
            s = n.merge(s, p, t)
        }
        return n.compact(s)
    }
}, function (r, e, t) {
    "use strict";
    t.r(e);
    var n = t(0), a = t.n(n);
    const o = /([^?#]+)\??([^#]*)#?([^?]*)\??([^#]*)/g;
    let i = "";

    function l() {
        return i || ("object" == typeof window ? window.location.href : "object" == typeof weex ? weex.config.bundleUrl : "")
    }

    var s = {
        setUrl(r){
            i = r
        }, getUrl: l, parseUrl(r){
            const e = Object.assign({url: "string" == typeof r ? r : l()}, "object" == typeof r ? r : {}), t = o.exec(e.url) || [];
            return o.lastIndex = 0, {
                url: t[1] || "",
                queryStr: t[2] || "",
                query: a.a.parse(t[2], e) || {},
                hash: t[3] || "",
                hashStr: `${t[3]}${t[4] ? "?" + t[4] : ""}`,
                paramsStr: t[4] || "",
                params: t[4] ? a.a.parse(t[4], e) : {}
            }
        }
    };

    function c(r) {
        const e = s.parseUrl(arguments[1]), t = Object.assign(e.query, r || {});
        return e.queryStr = a.a.stringify(t, arguments[1]), u(e)
    }

    function u(r) {
        return `${r.url}${r.queryStr ? "?" + r.queryStr : ""}${r.hash ? "#" + r.hash : ""}${r.paramsStr ? r.hash ? "?" + r.paramsStr : "#?" + r.paramsStr : ""}`
    }

    var f = {
        getQuery: function (r) {
            const e = s.parseUrl(arguments[1]);
            if (!r || 0 === r.length)return e.query;
            if (Array.isArray(r)) {
                const t = {};
                return r.forEach(r => {
                    t[r] = e.query[r]
                }), t
            }
            return e.query[r]
        }, addQuery: c, removeQuery: function (r) {
            const e = s.parseUrl(arguments[1]);
            return r && 0 !== r.length ? (Array.isArray(r) ? r.forEach(r => {
                        delete e.query[r]
                    }) : delete e.query[r], e.queryStr = a.a.stringify(e.query, arguments[1]), u(e)) : (e.queryStr = "", u(e))
        }, replaceQuery: c, getPath: function (r) {
            return s.parseUrl(r).url
        }, getPathAndQuery: function () {
            const r = s.parseUrl(arguments[1]);
            return `${r.url}${r.queryStr ? "?" + r.queryStr : ""}`
        }, getPathAndHash: function () {
            const r = s.parseUrl(arguments[1]);
            return `${r.url}${r.hashStr ? "#" + r.hashStr : ""}`
        }
    };

    function p(r) {
        const e = s.parseUrl(arguments[1]), t = Object.assign(e.params, r || {});
        return e.paramsStr = a.a.stringify(t, arguments[1]), y(e)
    }

    function y(r) {
        return `${r.url}${r.queryStr ? "?" + r.queryStr : ""}${r.hash ? "#" + r.hash : ""}${r.paramsStr ? r.hash ? "?" + paramsStr : "#?" + paramsStr : ""}`
    }

    var d = {
        getParams: function (r) {
            const e = s.parseUrl(arguments[1]);
            if (!r || 0 === r.length)return e.params;
            if (Array.isArray(r)) {
                const t = {};
                return r.forEach(r => {
                    t[r] = e.params[r]
                }), t
            }
            return e.params[r]
        }, addParams: p, removeParams: function (r) {
            const e = s.parseUrl(arguments[1]);
            return r && 0 !== r.length ? (Array.isArray(r) ? r.forEach(r => {
                        delete e.params[r]
                    }) : delete e.params[r], e.paramsStr = a.a.stringify(e.params, arguments[1]), y(e)) : (e.paramsStr = "", y(e))
        }, replaceParams: p
    };
    e.default = {
        parse: a.a.parse,
        stringify: a.a.stringify,
        formats: a.a.formats,
        getQuery: f.getQuery,
        addQuery: f.addQuery,
        removeQuery: f.removeQuery,
        replaceQuery: f.replaceQuery,
        getPath: f.getPath,
        getPathAndQuery: f.getPathAndQuery,
        getPathAndHash: f.getPathAndHash,
        getParams: d.getParams,
        addParams: d.addParams,
        removeParams: d.removeParams,
        replaceParams: d.replaceParams,
        setBaseUrl: s.setUrl,
        getBaseUrl: s.getUrl,
        parseUrl: s.parseUrl
    }
}]);