! function(c) {
    "function" == typeof define && define.amd ? define(["jquery"], c) : "undefined" != typeof exports ? module.exports = c(require("jquery")) : c(jQuery)
}(function(c) {
    var d = window.EasyWheel || {};
    (d = function() {
        return function(a, b) {
            this.defaults = {
                items: [{
                    name: "Win",
                    color: "#3498db"
                }, {
                    name: "Lose",
                    color: "#ffc107"
                }],
                width: 400,
                fontSize: 14,
                textOffset: 8,
                textLine: "h",
                textArc: !1,
                letterSpacing: 0,
                textColor: "#fff",
                centerWidth: 45,
                shadow: "#000",
                shadowOpacity: 3,
                centerLineWidth: 5,
                centerLineColor: "#fff",
                centerBackground: "#8e44ad",
                sliceLineWidth: 5,
                sliceLineColor: "#fff",
                selectedSliceColor: "#333",
                outerLineColor: "#fff",
                outerLineWidth: 5,
                centerImage: "",
                centerHtml: "",
                centerHtmlWidth: 45,
                centerImageWidth: 45,
                rotateCenter: !1,
                centerClass: "",
                button: "",
                easing: "easyWheel",
                markerAnimation: !0,
                markerColor: "#CC3333",
                selected: !1,
                type: "spin",
                duration: 8E3,
                rotates: 8,
                max: 0,
                frame: 6,
                ajax: null,
                onStart: function(a, b, c) {},
                onStep: function(a, b, c) {},
                onProgress: function(a, b, c) {},
                onComplete: function(a, b, c) {},
                onFail: function(a, b, c) {}
            };
            var l = c(a).data("easyWheel") || {};
            this.o = c.extend({}, this.defaults, b, l);
            this.initials = {
                slice: {
                    id: null,
                    results: null
                },
                currentSliceData: {
                    id: null,
                    results: null
                },
                winner: 0,
                rotates: parseInt(this.o.rotates),
                spinCount: 0,
                counter: 0,
                now: 0,
                resetCount: 0,
                currentSlice: 0,
                currentStep: 0,
                lastStep: 0,
                slicePercent: 0,
                circlePercent: 0,
                items: this.o.items,
                spinning: !1,
                inProgress: !1,
                nonce: null,
                $wheel: c(a)
            };
            c.extend(this, this.initials);
            c.extend(c.easing, {
                easyWheel: function(a, b, c, l, d) {
                    return -l * ((b = b / d - 1) * b * b * b - 1) + c
                }
            });
            c.extend(c.easing, {
                easeOutQuad: function(a,
                    b, c, l, d) {
                    return -l * (b /= d) * (b - 2) + c
                }
            });
            c.extend(c.easing, {
                MarkerEasing: function(a) {
                    a = 1 - Math.pow(1 - 6 * a, 2);
                    return 0 > a && (a = 0), a
                }
            });
            this.instanceUid = "ew" + this.guid();
            this.validate();
            this.init()
        }
    }()).prototype.validate = function(a) {
        1 > this.rotates && (this.rotates = 1, console.log("warning", 'Min number of rotates is "1"'));
        10 < parseInt(this.o.sliceLineWidth) && (this.o.sliceLineWidth = 10, console.log("warning", 'Max sliceLineWidth is "10"'));
        10 < parseInt(this.o.centerLineWidth) && (this.o.centerLineWidth = 10, console.log("warning",
            'Max centerLineWidth is "10"'));
        10 < parseInt(this.o.outerLineWidth) && (this.o.outerLineWidth = 10, console.log("warning", 'Max outerLineWidth is "10"'));
        void 0 === c.easing[c.trim(this.o.easing)] && (this.o.easing = "easyWheel")
    };
    d.prototype.destroy = function(a) {
        this.spinning && this.spinning.finish();
        "boolean" == typeof a && !0 === a && this.$wheel.html("").removeClass(this.instanceUid);
        c.extend(this.o, this.defaults);
        c.extend(this, this.initials);
        c(document).off("click." + this.instanceUid);
        c(document).off("resize." + this.instanceUid)
    };
    d.prototype.option = function(a, b) {
        -1 === c.inArray(typeof b, ["undefined", "function"]) && -1 === c.inArray(typeof this.o[a], ["undefined", "function"]) && -1 != c.inArray(a, ["easing", "type", "duration", "rotates", "max"]) && (this.o[a] = b)
    };
    d.prototype.finish = function() {
        this.spinning && this.spinning.finish()
    };
    d.prototype.init = function() {
        this.initialize();
        this.execute()
    };
    d.prototype.initialize = function() {
        var a = this;
        a.$wheel.addClass("easyWheel " + a.instanceUid);
        var b = 360 / a.totalSlices(),
            l = 0,
            m = 0;
        a.$wheel.html("");
        var d =
            c("<div/>").addClass("eWheel-wrapper").appendTo(a.$wheel),
            e = c("<div/>").addClass("eWheel-inner").appendTo(d),
            f = c("<div/>").addClass("eWheel").prependTo(e),
            g = c("<div/>").addClass("eWheel-bg-layer").appendTo(f),
            n = c(a.SVG("svg", {
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                x: "0px",
                y: "0px",
                viewBox: "0 0 200 200",
                "xml:space": "preserve",
                style: "enable-background:new 0 0 200 200;"
            }));
        n.appendTo(g);
        var r = c("<g/>"),
            t = c("<g/>");
        if (r.appendTo(n), "string" == typeof a.o.shadow &&
            "" !== c.trim(a.o.shadow)) {
            var h = c(a.SVG("radialGradient", {
                    id: "SVGID_1_",
                    cx: "50%",
                    cy: "50%",
                    r: "50%",
                    gradientUnits: "userSpaceOnUse"
                })).appendTo(n),
                v = a.SVG("stop", {
                    offset: "0.1676",
                    style: "stop-color:" + a.o.shadow + ";stop-opacity:1"
                }).outerHTML + a.SVG("stop", {
                    offset: "0.5551",
                    style: "stop-color:" + a.o.shadow + ";stop-opacity:1"
                }).outerHTML + a.SVG("stop", {
                    offset: "0.6189",
                    style: "stop-color:" + a.o.shadow + ";stop-opacity:1"
                }).outerHTML + a.SVG("stop", {
                    offset: "1",
                    style: "stop-color:" + a.o.shadow + ";stop-opacity:0"
                }).outerHTML;
            c(v).appendTo(h);
            c(a.SVG("circle", {
                cx: "50%",
                cy: "50%",
                r: "50%",
                "stroke-width": "0",
                "fill-opacity": 9 > parseInt(a.o.shadowOpacity) ? "0." + parseInt(a.o.shadowOpacity) : 1,
                fill: "url(#SVGID_1_)"
            })).appendTo(n)
        }
        if (t.appendTo(n), "v" === a.o.textLine || "vertical" === a.o.textLine) {
            h = c("<div/>");
            h.addClass("eWheel-txt-wrap");
            h.appendTo(f);
            var p = c("<div/>");
            p.addClass("eWheel-txt");
            p.css({
                transform: "rotate(" + (-360 / a.totalSlices() / 2 + a.getDegree()) + "deg)"
            });
            p.appendTo(h)
        } else {
            var q = c("<g/>"),
                u = c("<defs/>");
            u.appendTo(n);
            q.appendTo(n)
        }
        h = c("<div/>");
        if (h.addClass("eWheel-center"), h.addClass(a.o.centerClass), h.appendTo(!0 === a.o.rotateCenter || "true" === a.o.rotateCenter ? f : e), "string" == typeof a.o.centerHtml && "" === c.trim(a.o.centerHtml) && "string" == typeof a.o.centerImage && "" !== c.trim(a.o.centerImage)) e = c("<img />"), parseInt(a.o.centerImageWidth) || (a.o.centerImageWidth = parseInt(a.o.centerWidth)), e.css("width", parseInt(a.o.centerImageWidth) + "%"), e.attr("src", a.o.centerImage), e.appendTo(h), h.append('<div class="ew-center-empty" style="width:' +
            parseInt(a.o.centerImageWidth) + "%; height:" + parseInt(a.o.centerImageWidth) + '%" />');
        "string" == typeof a.o.centerHtml && "" !== c.trim(a.o.centerHtml) && (e = c('<div class="ew-center-html">' + a.o.centerHtml + "</div>"), parseInt(a.o.centerHtmlWidth) || (a.o.centerHtmlWidth = parseInt(a.o.centerWidth)), e.css({
            width: parseInt(a.o.centerHtmlWidth) + "%",
            height: parseInt(a.o.centerHtmlWidth) + "%"
        }), e.appendTo(h));
        "color" !== c.trim(a.o.type) && c("<div/>").addClass("eWheel-marker").appendTo(d).append('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 80 115" style="enable-background:new 0 0 80 115;" xml:space="preserve"><g><path fill="' +
            a.o.markerColor + '" d="M40,0C17.9,0,0,17.7,0,39.4S40,115,40,115s40-53.9,40-75.6S62.1,0,40,0z M40,52.5c-7,0-12.6-5.6-12.6-12.4 S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"/><path fill="rgba(0, 0, 0, 0.3)" d="M40,19.2c-11.7,0-21.2,9.3-21.2,20.8S28.3,60.8,40,60.8S61.2,51.5,61.2,40S51.7,19.2,40,19.2z M40,52.5 c-7,0-12.6-5.6-12.6-12.4S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"/></g></svg>');
        c.each(a.items, function(d, e) {
            var g = 360 / a.totalSlices() * d;
            m += b;
            var f = a.annularSector({
                centerX: 100,
                centerY: 100,
                startDegrees: l,
                endDegrees: m,
                innerRadius: parseInt(a.o.centerWidth),
                outerRadius: 100.5 - parseInt(a.o.outerLineWidth)
            });
            r.append(a.SVG("path", {
                "stroke-width": 0,
                fill: e.color,
                "data-fill": e.color,
                d: f
            }));
            t.append(a.SVG("path", {
                "stroke-width": 0,
                fill: a.o.sliceLineColor,
                d: a.annularSector({
                    centerX: 100,
                    centerY: 100,
                    startDegrees: m + .2,
                    endDegrees: m - .2,
                    innerRadius: parseInt(a.o.centerWidth),
                    outerRadius: 100.5 - parseInt(a.o.outerLineWidth)
                }, !0)
            }));
            var h = "auto" !== c.trim(a.o.textColor) ? c.trim(a.o.textColor) : a.brightness(e.color);
            if ("v" === a.o.textLine || "vertical" === a.o.textLine) {
                var k = c("<div/>");
                k.addClass("eWheel-title");
                k.html(e.name);
                k.css({
                    paddingRight: parseInt(a.o.textOffset) + "%",
                    transform: "rotate(" + g + "deg) translate(0px, -50%)",
                    color: h
                });
                k.appendTo(p);
                0 < a.toNumber(a.o.letterSpacing) && p.css("letter-spacing", a.toNumber(a.o.letterSpacing))
            } else g = '<text stroke-width="0" fill="' + h + '" dy="' + a.toNumber(a.o.textOffset) + '%"><textPath xlink:href="#ew-text-' + d + '" startOffset="50%" style="text-anchor: middle;">' + e.name + "</textPath></text>",
                q.css("font-size", parseInt(a.o.fontSize) / 2), 0 < parseInt(a.o.letterSpacing) && q.css("letter-spacing", parseInt(a.o.letterSpacing)), q.append(g), f = /(^.+?)L/.exec(f)[1], !0 !== a.o.textArc && (g = /(^.+?)A/.exec(f), g = f.replace(g[0], ""), h = /(^.+?),/.exec(g), h = g.replace(h[1], 0), f = f.replace(g, h)), u.append(a.SVG("path", {
                    "stroke-width": 0,
                    fill: "none",
                    id: "ew-text-" + d,
                    d: f
                }));
            f = c("<div/>");
            f.html(e);
            f.appendTo(k);
            l += b
        });
        d = parseInt(a.o.sliceLineWidth);
        if ("v" !== a.o.textLine || a.o.textLine, parseInt(a.o.centerWidth) > d) d = a.SVG("circle", {
            "class": "centerCircle",
            cx: "100",
            cy: "100",
            r: parseInt(a.o.centerWidth) + 1,
            stroke: a.o.centerLineColor,
            "stroke-width": parseInt(a.o.centerLineWidth),
            fill: a.o.centerBackground
        }), c(d).appendTo(n);
        d = a.SVG("circle", {
            cx: "100",
            cy: "100",
            r: 100 - parseInt(a.o.outerLineWidth) / 2,
            stroke: a.o.outerLineColor,
            "stroke-width": parseInt(a.o.outerLineWidth),
            "fill-opacity": 0,
            fill: "#fff0"
        });
        c(d).appendTo(n);
        g.html(g.html())
    };
    d.prototype.toNumber = function(a) {
        return Number(a)
    };
    d.prototype.SVG = function(a, b) {
        var c = document.createElementNS("http://www.w3.org/2000/svg",
                a),
            d;
        for (d in b) c.setAttribute(d, b[d]);
        return c
    };
    d.prototype.annularSector = function(a, b) {
        var c = parseInt(this.o.sliceLineWidth),
            d = this.oWithDefaults(a),
            k = [
                [d.cx + d.r2 * Math.cos((a.startDegrees + c / 4) * Math.PI / 180), d.cy + d.r2 * Math.sin((a.startDegrees + c / 4) * Math.PI / 180)],
                [d.cx + d.r2 * Math.cos((a.endDegrees - c / 4) * Math.PI / 180), d.cy + d.r2 * Math.sin((a.endDegrees - c / 4) * Math.PI / 180)],
                [d.cx + d.r1 * Math.cos((a.endDegrees - c) * Math.PI / 180), d.cy + d.r1 * Math.sin((a.endDegrees - c) * Math.PI / 180)],
                [d.cx + d.r1 * Math.cos((a.startDegrees +
                    c) * Math.PI / 180), d.cy + d.r1 * Math.sin((a.startDegrees + c) * Math.PI / 180)]
            ],
            e = (d.closeRadians - d.startRadians) % (2 * Math.PI) > Math.PI ? 1 : 0,
            f = 1,
            g = 0;
        !0 === b && c >= parseInt(this.o.centerWidth) ? (f = 0, g = 1) : !0 !== b && c >= parseInt(this.o.centerWidth) && (f = 1, g = 1);
        c = [];
        return c.push("M" + k[0].join()), c.push("A" + [d.r2, d.r2, 0, e, f, k[1]].join()), c.push("L" + k[2].join()), c.push("A" + [d.r1, d.r1, 0, e, g, k[3]].join()), c.push("z"), c.join(" ")
    };
    d.prototype.oWithDefaults = function(a) {
        var b = {
                cx: a.centerX || 0,
                cy: a.centerY || 0,
                startRadians: (a.startDegrees ||
                    0) * Math.PI / 180,
                closeRadians: (a.endDegrees || 0) * Math.PI / 180
            },
            c = void 0 !== a.thickness ? a.thickness : 100;
        return void 0 !== a.innerRadius ? b.r1 = a.innerRadius : void 0 !== a.outerRadius ? b.r1 = a.outerRadius - c : b.r1 = 200 - c, void 0 !== a.outerRadius ? b.r2 = a.outerRadius : b.r2 = b.r1 + c, 0 > b.r1 && (b.r1 = 0), 0 > b.r2 && (b.r2 = 0), b
    };
    d.prototype.brightness = function(a) {
        var b, c, d, k;
        return a.match(/^rgb/) ? (b = (a = (a = a.match(/rgba?\(([^)]+)\)/)[1]).split(/ *, */).map(Number))[0], c = a[1], d = a[2]) : "#" == a[0] && 7 == a.length ? (b = parseInt(a.slice(1, 3), 16),
            c = parseInt(a.slice(3, 5), 16), d = parseInt(a.slice(5, 7), 16)) : "#" == a[0] && 4 == a.length && (b = parseInt(a[1] + a[1], 16), c = parseInt(a[2] + a[2], 16), d = parseInt(a[3] + a[3], 16)), k = (299 * b + 587 * c + 114 * d) / 1E3, 125 > k ? "#fff" : "#333"
    };
    d.prototype.guid = function(a) {
        var b = "";
        a || (a = 8);
        for (var c = 0; c < a; c++) b += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(52 * Math.random()));
        return b
    };
    d.prototype.randomColor = function() {
        for (var a = "#", b = 0; 6 > b; b++) a += "0123456789ABCDEF" [Math.floor(16 * Math.random())];
        return a
    };
    d.prototype.FontScale =
        function(a) {
            a = 1 + (this.$wheel.width() - parseInt(this.o.width)) / parseInt(this.o.width);
            4 < a ? a = 4 : .1 > a && (a = .1);
            this.$wheel.find(".eWheel-wrapper").css("font-size", 100 * a + "%")
        };
    d.prototype.numberToArray = function(a) {
        var b, c = [];
        for (b = 0; b < a; b++) c[b] = b;
        return c
    };
    d.prototype.totalSlices = function() {
        return this.items.length
    };
    d.prototype.getDegree = function(a) {
        return 360 / this.totalSlices()
    };
    d.prototype.selectedSliceID = function(a) {
        if (this.selected = this.o.selected, "object" === c.type(this.selected)) {
            if (void 0 !== this.selected[0] &&
                void 0 !== this.selected[0].selectedIndex) return this.selected[0].selectedIndex
        } else if ("array" === c.type(this.selected)) this.selected = this.selected[a];
        else {
            if ("string" === c.type(this.selected) && "random" === c.trim(this.selected)) return this.getRandomInt(0, this.totalSlices() - 1);
            if ("number" !== c.type(this.selected)) return
        }
        return this.selected
    };
    d.prototype.degStart = function(a) {
        return 360 - this.getDegree() * a
    };
    d.prototype.degEnd = function(a) {
        return 360 - (this.getDegree() * a + this.getDegree())
    };
    d.prototype.getRandomInt =
        function(a, b) {
            return Math.floor(Math.random() * (b - a + 1) + a)
        };
    d.prototype.calcSliceSize = function(a) {
        var b = this.degStart(a) - (parseInt(this.o.sliceLineWidth) + 2);
        a = this.degEnd(a) + (parseInt(this.o.sliceLineWidth) + 2);
        var c = [];
        return c.start = b, c.end = a, c
    };
    d.prototype.toObject = function(a) {
        for (var b = {}, c = 0; c < a.length; ++c) void 0 !== a[c] && (b[c] = a[c]);
        return b
    };
    d.prototype.ajax = function(a) {
        var b = this;
        a.dataType = "json";
        a.cache = !1;
        void 0 === a.data && (a.data = {});
        !0 === a.nonce && (a.data.nonce = b.guid(8), b.nonce = a.data.nonce);
        0 !== b.counter ? a.data.lastWinner = b.slice.results : a.data.lastWinner = !1;
        c.ajax(a).done(function(a) {
            c.isArray(a) && (a = b.toObject(a));
            b.nonce && ("string" != typeof a.nonce && console.log("error", "Nonce Type Incorrect try to use POST Methode with nonce id"), a.nonce !== b.nonce) ? b.o.onFail.call(b.$wheel, b.slice.results, b.spinCount, b.now) : b.run(parseInt(a.id))
        })
    };
    d.prototype.start = function() {
        c.isPlainObject(this.o.ajax) && !c.isEmptyObject(this.o.ajax) ? this.ajax(this.o.ajax) : this.run()
    };
    d.prototype.run = function(a) {
        var b =
            this;
        if (!b.inProgress) {
            if (b.inProgress = !0, a) b.slice.id = a;
            else {
                if (0 !== b.o.max && b.counter >= b.o.max) return;
                "object" == typeof b.o.selected ? b.slice.id = b.selectedSliceID(b.resetCount) : b.slice.id = b.getRandomInt(0, b.totalSlices() - 1)
            }
            if (b.totalSlices() <= b.resetCount && (b.resetCount = 0), void 0 !== b.items[b.slice.id]) {
                b.slice.results = b.items[b.slice.id];
                b.slice.length = b.slice.id;
                b.o.onStart.call(b.$wheel, b.slice.results, b.spinCount, b.now);
                a = b.calcSliceSize(b.slice.id);
                a = b.getRandomInt(a.start, a.end);
                a = 360 * parseInt(b.rotates) +
                    a;
                b.lastStep = -1;
                b.currentStep = 0;
                var d = !1,
                    m = b.numberToArray(b.totalSlices()).reverse();
                if (0 !== parseInt(b.o.frame)) {
                    var k = c.fx.interval;
                    c.fx.interval = parseInt(b.o.frame)
                }
                b.spinning = c({
                    deg: b.now
                }).animate({
                    deg: a
                }, {
                    duration: parseInt(b.o.duration),
                    easing: c.trim(b.o.easing),
                    step: function(a, f) {
                        0 !== parseInt(b.o.frame) && (c.fx.interval = parseInt(b.o.frame));
                        b.now = a % 360;
                        "color" !== c.trim(b.o.type) && b.$wheel.find(".eWheel").css({
                            transform: "rotate(" + b.now + "deg)"
                        });
                        b.currentStep = Math.floor(a / (360 / b.totalSlices()));
                        b.currentSlice = m[b.currentStep % b.totalSlices()];
                        var g = 1600 / b.totalSlices(),
                            e = 1600 / 360 * b.now / 1600 * 100;
                        if (b.slicePercent = ((b.currentSlice + 1) * g - (1600 - 1600 / 360 * b.now)) / g * 100, b.circlePercent = e, b.o.onProgress.call(b.$wheel, b.slicePercent, b.circlePercent), b.lastStep !== b.currentStep) {
                            if (b.lastStep = b.currentStep, !0 === b.o.markerAnimation && -1 === c.inArray(c.trim(b.o.easing), "easeInElastic easeInBack easeInBounce easeOutElastic easeOutBack easeOutBounce easeInOutElastic easeInOutBack easeInOutBounce".split(" "))) g =
                                parseInt(b.o.duration) / b.totalSlices(), d && d.stop(), d = c({
                                    deg: 0
                                }).animate({
                                    deg: -38
                                }, {
                                    easing: "MarkerEasing",
                                    duration: g / 2,
                                    step: function(a) {
                                        c(".eWheel-marker").css({
                                            transform: "rotate(" + a + "deg)"
                                        })
                                    }
                                });
                            "color" === c.trim(b.o.type) ? (b.$wheel.find("svg>path").each(function(a) {
                                    c(this).attr("class", "").attr("fill", c(this).attr("data-fill"))
                                }), b.$wheel.find("svg>path").eq(b.currentSlice).attr("class", "ew-ccurrent").attr("fill", b.o.selectedSliceColor), b.$wheel.find(".eWheel-txt>.eWheel-title").removeClass("ew-ccurrent"),
                                b.$wheel.find(".eWheel-txt>.eWheel-title").eq(b.currentSlice).addClass("ew-ccurrent")) : (b.$wheel.find("svg>path").attr("class", ""), b.$wheel.find("svg>path").eq(b.currentSlice).attr("class", "ew-current"), b.$wheel.find(".eWheel-txt>.eWheel-title").removeClass("ew-current"), b.$wheel.find(".eWheel-txt>.eWheel-title").eq(b.currentSlice).addClass("ew-current"));
                            b.currentSliceData.id = b.currentSlice;
                            b.currentSliceData.results = b.items[b.currentSliceData.id];
                            b.currentSliceData.results.length = b.currentSliceData.id;
                            b.o.onStep.call(b.$wheel, b.currentSliceData.results, b.slicePercent, b.circlePercent)
                        }
                        0 !== parseInt(b.o.frame) && (c.fx.interval = k)
                    },
                    fail: function(a, c, d) {
                        b.inProgress = !1;
                        b.o.onFail.call(b.$wheel, b.slice.results, b.spinCount, b.now)
                    },
                    complete: function(a, c, d) {
                        b.inProgress = !1;
                        b.o.onComplete.call(b.$wheel, b.slice.results, b.spinCount, b.now)
                    }
                });
                b.counter++;
                b.spinCount++;
                b.resetCount++
            }
        }
    };
    d.prototype.execute = function() {
        var a = this;
        a.currentSlice = a.totalSlices() - 1;
        "string" == typeof a.o.button && "" !== c.trim(a.o.button) &&
            c(document).on("click." + a.instanceUid, a.o.button, function(b) {
                b.preventDefault();
                a.start()
            });
        a.$wheel.css("font-size", parseInt(a.o.fontSize));
        a.$wheel.width(parseInt(a.o.width));
        a.$wheel.height(a.$wheel.width());
        a.$wheel.find(".eWheel-wrapper").width(a.$wheel.width());
        a.$wheel.find(".eWheel-wrapper").height(a.$wheel.width());
        a.FontScale();
        c(window).on("resize." + a.instanceUid, function() {
            a.$wheel.height(a.$wheel.width());
            a.$wheel.find(".eWheel-wrapper").width(a.$wheel.width());
            a.$wheel.find(".eWheel-wrapper").height(a.$wheel.width());
            a.FontScale()
        })
    };
    c.fn.easyWheel = function() {
        var a, b, l = arguments[0],
            m = Array.prototype.slice.call(arguments, 1),
            k = Array.prototype.slice.call(arguments, 2),
            e = this.length,
            f = ["destroy", "start", "finish", "option"];
        for (a = 0; a < e; a++)
            if ("object" == typeof l || void 0 === l ? this[a].easyWheel = new d(this[a], l) : -1 !== c.inArray(c.trim(l), f) && (b = "option" === c.trim(l) ? this[a].easyWheel[l].apply(this[a].easyWheel, m, k) : this[a].easyWheel[l].apply(this[a].easyWheel, m)), void 0 !== b) return b;
        return this
    }
});