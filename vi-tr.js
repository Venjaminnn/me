( () => {
    function t(e) {
        return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ,
        t(e)
    }
    function e(t, e, n, o) {
        var s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
        try {
            var r = document.location.host
              , i = "detector"
              , a = {
                posdMessageId: "PANELOS_MESSAGE",
                posdHash: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0, 22),
                type: "VIDEO_XHR_CANDIDATE",
                from: i,
                to: i.substring(0, 6),
                content: {
                    requestMethod: t,
                    url: e,
                    type: n,
                    content: o
                }
            };
            r.includes("youtube.com") && s && s[0] && s[0].length && (a.content.encodedPostBody = s[0]),
            window.postMessage(a, "*")
        } catch (t) {}
    }
    var n = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        this.requestMethod = arguments[0],
        n.apply(this, arguments)
    }
    ;
    var o = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
        var t = Object.assign(arguments, {})
          , n = this.onreadystatechange;
        return this.onreadystatechange = function() {
            var o, s;
            if (4 !== this.readyState || (o = this.responseURL,
            (s = document.querySelector("script[data-bis-config]") ? JSON.parse(document.querySelector("script[data-bis-config]").getAttribute("data-bis-config")) : null) && s.some((function(t) {
                return o.includes(t)
            }
            ))) || e(this.requestMethod, this.responseURL, this.getResponseHeader("content-type"), this.response, t),
            n)
                return n.apply(this, arguments)
        }
        ,
        o.apply(this, arguments)
    }
    ;
    var s = fetch;
    fetch = function() {
        var n = this
          , o = arguments
          , r = arguments[0]instanceof Request ? arguments[0].url : arguments[0]
          , i = arguments[0]instanceof Request ? arguments[0].method : "GET";
        return "object" === t(r) && r.href && (r = r.href),
        new Promise((function(t, a) {
            s.apply(n, o).then((function(n) {
                if (n.body instanceof ReadableStream) {
                    var o = n.json;
                    n.json = function() {
                        var t = arguments
                          , s = this;
                        return new Promise((function(a, c) {
                            o.apply(s, t).then((function(t) {
                                0 !== n.url.search(/data:application\/json;base64/) && e(i, r, n.headers.get("content-type"), JSON.stringify(t)),
                                a(t)
                            }
                            )).catch((function(t) {
                                c(t)
                            }
                            ))
                        }
                        ))
                    }
                    ;
                    var s = n.text;
                    n.text = function() {
                        var t = arguments
                          , o = this;
                        return new Promise((function(a, c) {
                            s.apply(o, t).then((function(t) {
                                0 !== n.url.search(/data:application\/json;base64/) && e(i, r, n.headers.get("content-type"), t),
                                a(t)
                            }
                            )).catch((function(t) {
                                c(t)
                            }
                            ))
                        }
                        ))
                    }
                }
                t.apply(this, arguments)
            }
            )).catch((function(t) {
                a.apply(this, arguments)
            }
            ))
        }
        ))
    }
}
)();
