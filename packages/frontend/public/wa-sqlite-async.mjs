var Module = (() => {
  var _scriptDir = import.meta.url;

  return function (moduleArg = {}) {
    var d = moduleArg,
      aa,
      ba;
    d.ready = new Promise((a, b) => {
      aa = a;
      ba = b;
    });
    var ca = Object.assign({}, d),
      da = "./this.program",
      ea = (a, b) => {
        throw b;
      },
      fa = "object" == typeof window,
      ha = "function" == typeof importScripts,
      g = "",
      ia;
    if (fa || ha)
      ha
        ? (g = self.location.href)
        : "undefined" != typeof document &&
          document.currentScript &&
          (g = document.currentScript.src),
        _scriptDir && (g = _scriptDir),
        0 !== g.indexOf("blob:")
          ? (g = g.substr(0, g.replace(/[?#].*/, "").lastIndexOf("/") + 1))
          : (g = ""),
        ha &&
          (ia = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, !1);
            b.responseType = "arraybuffer";
            b.send(null);
            return new Uint8Array(b.response);
          });
    var ja = d.print || console.log.bind(console),
      r = d.printErr || console.error.bind(console);
    Object.assign(d, ca);
    ca = null;
    d.thisProgram && (da = d.thisProgram);
    d.quit && (ea = d.quit);
    var la;
    d.wasmBinary && (la = d.wasmBinary);
    "object" != typeof WebAssembly && u("no native wasm support detected");
    var ma,
      v = !1,
      na,
      w,
      x,
      z,
      oa,
      A,
      C,
      pa,
      qa;
    function ra() {
      var a = ma.buffer;
      d.HEAP8 = w = new Int8Array(a);
      d.HEAP16 = z = new Int16Array(a);
      d.HEAPU8 = x = new Uint8Array(a);
      d.HEAPU16 = oa = new Uint16Array(a);
      d.HEAP32 = A = new Int32Array(a);
      d.HEAPU32 = C = new Uint32Array(a);
      d.HEAPF32 = pa = new Float32Array(a);
      d.HEAPF64 = qa = new Float64Array(a);
    }
    var sa = [],
      ta = [],
      ua = [],
      va = [];
    function wa() {
      var a = d.preRun.shift();
      sa.unshift(a);
    }
    var xa = 0,
      ya = null,
      za = null;
    function u(a) {
      if (d.onAbort) d.onAbort(a);
      a = "Aborted(" + a + ")";
      r(a);
      v = !0;
      na = 1;
      a = new WebAssembly.RuntimeError(
        a + ". Build with -sASSERTIONS for more info.",
      );
      ba(a);
      throw a;
    }
    var Aa = (a) => a.startsWith("data:application/octet-stream;base64,"),
      Ba;
    if (d.locateFile) {
      if (((Ba = "wa-sqlite-async.wasm"), !Aa(Ba))) {
        var Ca = Ba;
        Ba = d.locateFile ? d.locateFile(Ca, g) : g + Ca;
      }
    } else Ba = new URL("wa-sqlite-async.wasm", import.meta.url).href;
    function Da(a) {
      if (a == Ba && la) return new Uint8Array(la);
      if (ia) return ia(a);
      throw "both async and sync fetching of the wasm failed";
    }
    function Ea(a) {
      return la || (!fa && !ha) || "function" != typeof fetch
        ? Promise.resolve().then(() => Da(a))
        : fetch(a, { credentials: "same-origin" })
            .then((b) => {
              if (!b.ok) throw "failed to load wasm binary file at '" + a + "'";
              return b.arrayBuffer();
            })
            .catch(() => Da(a));
    }
    function Fa(a, b, c) {
      return Ea(a)
        .then((e) => WebAssembly.instantiate(e, b))
        .then((e) => e)
        .then(c, (e) => {
          r(`failed to asynchronously prepare wasm: ${e}`);
          u(e);
        });
    }
    function Ga(a, b) {
      var c = Ba;
      return la ||
        "function" != typeof WebAssembly.instantiateStreaming ||
        Aa(c) ||
        "function" != typeof fetch
        ? Fa(c, a, b)
        : fetch(c, { credentials: "same-origin" }).then((e) =>
            WebAssembly.instantiateStreaming(e, a).then(b, function (f) {
              r(`wasm streaming compile failed: ${f}`);
              r("falling back to ArrayBuffer instantiation");
              return Fa(c, a, b);
            }),
          );
    }
    var D, F;
    function Ha(a) {
      this.name = "ExitStatus";
      this.message = `Program terminated with exit(${a})`;
      this.status = a;
    }
    var Ia = (a) => {
      for (; 0 < a.length; ) a.shift()(d);
    };
    function H(a, b = "i8") {
      b.endsWith("*") && (b = "*");
      switch (b) {
        case "i1":
          return w[a >> 0];
        case "i8":
          return w[a >> 0];
        case "i16":
          return z[a >> 1];
        case "i32":
          return A[a >> 2];
        case "i64":
          u("to do getValue(i64) use WASM_BIGINT");
        case "float":
          return pa[a >> 2];
        case "double":
          return qa[a >> 3];
        case "*":
          return C[a >> 2];
        default:
          u(`invalid type for getValue: ${b}`);
      }
    }
    var Ja = d.noExitRuntime || !0;
    function J(a, b, c = "i8") {
      c.endsWith("*") && (c = "*");
      switch (c) {
        case "i1":
          w[a >> 0] = b;
          break;
        case "i8":
          w[a >> 0] = b;
          break;
        case "i16":
          z[a >> 1] = b;
          break;
        case "i32":
          A[a >> 2] = b;
          break;
        case "i64":
          u("to do setValue(i64) use WASM_BIGINT");
        case "float":
          pa[a >> 2] = b;
          break;
        case "double":
          qa[a >> 3] = b;
          break;
        case "*":
          C[a >> 2] = b;
          break;
        default:
          u(`invalid type for setValue: ${c}`);
      }
    }
    var Ka =
        "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0,
      K = (a, b, c) => {
        var e = b + c;
        for (c = b; a[c] && !(c >= e); ) ++c;
        if (16 < c - b && a.buffer && Ka) return Ka.decode(a.subarray(b, c));
        for (e = ""; b < c; ) {
          var f = a[b++];
          if (f & 128) {
            var h = a[b++] & 63;
            if (192 == (f & 224)) e += String.fromCharCode(((f & 31) << 6) | h);
            else {
              var k = a[b++] & 63;
              f =
                224 == (f & 240)
                  ? ((f & 15) << 12) | (h << 6) | k
                  : ((f & 7) << 18) | (h << 12) | (k << 6) | (a[b++] & 63);
              65536 > f
                ? (e += String.fromCharCode(f))
                : ((f -= 65536),
                  (e += String.fromCharCode(
                    55296 | (f >> 10),
                    56320 | (f & 1023),
                  )));
            }
          } else e += String.fromCharCode(f);
        }
        return e;
      },
      La = (a, b) => {
        for (var c = 0, e = a.length - 1; 0 <= e; e--) {
          var f = a[e];
          "." === f
            ? a.splice(e, 1)
            : ".." === f
              ? (a.splice(e, 1), c++)
              : c && (a.splice(e, 1), c--);
        }
        if (b) for (; c; c--) a.unshift("..");
        return a;
      },
      M = (a) => {
        var b = "/" === a.charAt(0),
          c = "/" === a.substr(-1);
        (a = La(
          a.split("/").filter((e) => !!e),
          !b,
        ).join("/")) ||
          b ||
          (a = ".");
        a && c && (a += "/");
        return (b ? "/" : "") + a;
      },
      Ma = (a) => {
        var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
          .exec(a)
          .slice(1);
        a = b[0];
        b = b[1];
        if (!a && !b) return ".";
        b && (b = b.substr(0, b.length - 1));
        return a + b;
      },
      Na = (a) => {
        if ("/" === a) return "/";
        a = M(a);
        a = a.replace(/\/$/, "");
        var b = a.lastIndexOf("/");
        return -1 === b ? a : a.substr(b + 1);
      },
      Oa = () => {
        if (
          "object" == typeof crypto &&
          "function" == typeof crypto.getRandomValues
        )
          return (a) => crypto.getRandomValues(a);
        u("initRandomDevice");
      },
      Pa = (a) => (Pa = Oa())(a);
    function Qa() {
      for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
        b = 0 <= c ? arguments[c] : "/";
        if ("string" != typeof b)
          throw new TypeError("Arguments to path.resolve must be strings");
        if (!b) return "";
        a = b + "/" + a;
        b = "/" === b.charAt(0);
      }
      a = La(
        a.split("/").filter((e) => !!e),
        !b,
      ).join("/");
      return (b ? "/" : "") + a || ".";
    }
    var Ra = [],
      Sa = (a) => {
        for (var b = 0, c = 0; c < a.length; ++c) {
          var e = a.charCodeAt(c);
          127 >= e
            ? b++
            : 2047 >= e
              ? (b += 2)
              : 55296 <= e && 57343 >= e
                ? ((b += 4), ++c)
                : (b += 3);
        }
        return b;
      },
      Ta = (a, b, c, e) => {
        if (!(0 < e)) return 0;
        var f = c;
        e = c + e - 1;
        for (var h = 0; h < a.length; ++h) {
          var k = a.charCodeAt(h);
          if (55296 <= k && 57343 >= k) {
            var n = a.charCodeAt(++h);
            k = (65536 + ((k & 1023) << 10)) | (n & 1023);
          }
          if (127 >= k) {
            if (c >= e) break;
            b[c++] = k;
          } else {
            if (2047 >= k) {
              if (c + 1 >= e) break;
              b[c++] = 192 | (k >> 6);
            } else {
              if (65535 >= k) {
                if (c + 2 >= e) break;
                b[c++] = 224 | (k >> 12);
              } else {
                if (c + 3 >= e) break;
                b[c++] = 240 | (k >> 18);
                b[c++] = 128 | ((k >> 12) & 63);
              }
              b[c++] = 128 | ((k >> 6) & 63);
            }
            b[c++] = 128 | (k & 63);
          }
        }
        b[c] = 0;
        return c - f;
      };
    function Ua(a, b, c) {
      c = Array(0 < c ? c : Sa(a) + 1);
      a = Ta(a, c, 0, c.length);
      b && (c.length = a);
      return c;
    }
    var Va = [];
    function Wa(a, b) {
      Va[a] = { input: [], Cf: [], Nf: b };
      Xa(a, Ya);
    }
    var Ya = {
        open(a) {
          var b = Va[a.node.Qf];
          if (!b) throw new N(43);
          a.Df = b;
          a.seekable = !1;
        },
        close(a) {
          a.Df.Nf.Sf(a.Df);
        },
        Sf(a) {
          a.Df.Nf.Sf(a.Df);
        },
        read(a, b, c, e) {
          if (!a.Df || !a.Df.Nf.hg) throw new N(60);
          for (var f = 0, h = 0; h < e; h++) {
            try {
              var k = a.Df.Nf.hg(a.Df);
            } catch (n) {
              throw new N(29);
            }
            if (void 0 === k && 0 === f) throw new N(6);
            if (null === k || void 0 === k) break;
            f++;
            b[c + h] = k;
          }
          f && (a.node.timestamp = Date.now());
          return f;
        },
        write(a, b, c, e) {
          if (!a.Df || !a.Df.Nf.bg) throw new N(60);
          try {
            for (var f = 0; f < e; f++) a.Df.Nf.bg(a.Df, b[c + f]);
          } catch (h) {
            throw new N(29);
          }
          e && (a.node.timestamp = Date.now());
          return f;
        },
      },
      Za = {
        hg() {
          a: {
            if (!Ra.length) {
              var a = null;
              "undefined" != typeof window && "function" == typeof window.prompt
                ? ((a = window.prompt("Input: ")), null !== a && (a += "\n"))
                : "function" == typeof readline &&
                  ((a = readline()), null !== a && (a += "\n"));
              if (!a) {
                a = null;
                break a;
              }
              Ra = Ua(a, !0);
            }
            a = Ra.shift();
          }
          return a;
        },
        bg(a, b) {
          null === b || 10 === b
            ? (ja(K(a.Cf, 0)), (a.Cf = []))
            : 0 != b && a.Cf.push(b);
        },
        Sf(a) {
          a.Cf && 0 < a.Cf.length && (ja(K(a.Cf, 0)), (a.Cf = []));
        },
        Ig() {
          return {
            Eg: 25856,
            Gg: 5,
            Dg: 191,
            Fg: 35387,
            Cg: [
              3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
          };
        },
        Jg() {
          return 0;
        },
        Kg() {
          return [24, 80];
        },
      },
      $a = {
        bg(a, b) {
          null === b || 10 === b
            ? (r(K(a.Cf, 0)), (a.Cf = []))
            : 0 != b && a.Cf.push(b);
        },
        Sf(a) {
          a.Cf && 0 < a.Cf.length && (r(K(a.Cf, 0)), (a.Cf = []));
        },
      };
    function ab(a, b) {
      var c = a.yf ? a.yf.length : 0;
      c >= b ||
        ((b = Math.max(b, (c * (1048576 > c ? 2 : 1.125)) >>> 0)),
        0 != c && (b = Math.max(b, 256)),
        (c = a.yf),
        (a.yf = new Uint8Array(b)),
        0 < a.Af && a.yf.set(c.subarray(0, a.Af), 0));
    }
    var O = {
        Gf: null,
        Ff() {
          return O.createNode(null, "/", 16895, 0);
        },
        createNode(a, b, c, e) {
          if (24576 === (c & 61440) || 4096 === (c & 61440)) throw new N(63);
          O.Gf ||
            (O.Gf = {
              dir: {
                node: {
                  Ef: O.wf.Ef,
                  Bf: O.wf.Bf,
                  Of: O.wf.Of,
                  Tf: O.wf.Tf,
                  lg: O.wf.lg,
                  Yf: O.wf.Yf,
                  Wf: O.wf.Wf,
                  kg: O.wf.kg,
                  Xf: O.wf.Xf,
                },
                stream: { Kf: O.xf.Kf },
              },
              file: {
                node: { Ef: O.wf.Ef, Bf: O.wf.Bf },
                stream: {
                  Kf: O.xf.Kf,
                  read: O.xf.read,
                  write: O.xf.write,
                  eg: O.xf.eg,
                  Uf: O.xf.Uf,
                  Vf: O.xf.Vf,
                },
              },
              link: {
                node: { Ef: O.wf.Ef, Bf: O.wf.Bf, Rf: O.wf.Rf },
                stream: {},
              },
              fg: { node: { Ef: O.wf.Ef, Bf: O.wf.Bf }, stream: bb },
            });
          c = cb(a, b, c, e);
          P(c.mode)
            ? ((c.wf = O.Gf.dir.node), (c.xf = O.Gf.dir.stream), (c.yf = {}))
            : 32768 === (c.mode & 61440)
              ? ((c.wf = O.Gf.file.node),
                (c.xf = O.Gf.file.stream),
                (c.Af = 0),
                (c.yf = null))
              : 40960 === (c.mode & 61440)
                ? ((c.wf = O.Gf.link.node), (c.xf = O.Gf.link.stream))
                : 8192 === (c.mode & 61440) &&
                  ((c.wf = O.Gf.fg.node), (c.xf = O.Gf.fg.stream));
          c.timestamp = Date.now();
          a && ((a.yf[b] = c), (a.timestamp = c.timestamp));
          return c;
        },
        Hg(a) {
          return a.yf
            ? a.yf.subarray
              ? a.yf.subarray(0, a.Af)
              : new Uint8Array(a.yf)
            : new Uint8Array(0);
        },
        wf: {
          Ef(a) {
            var b = {};
            b.rg = 8192 === (a.mode & 61440) ? a.id : 1;
            b.ig = a.id;
            b.mode = a.mode;
            b.xg = 1;
            b.uid = 0;
            b.ug = 0;
            b.Qf = a.Qf;
            P(a.mode)
              ? (b.size = 4096)
              : 32768 === (a.mode & 61440)
                ? (b.size = a.Af)
                : 40960 === (a.mode & 61440)
                  ? (b.size = a.link.length)
                  : (b.size = 0);
            b.ng = new Date(a.timestamp);
            b.wg = new Date(a.timestamp);
            b.qg = new Date(a.timestamp);
            b.og = 4096;
            b.pg = Math.ceil(b.size / b.og);
            return b;
          },
          Bf(a, b) {
            void 0 !== b.mode && (a.mode = b.mode);
            void 0 !== b.timestamp && (a.timestamp = b.timestamp);
            if (void 0 !== b.size && ((b = b.size), a.Af != b))
              if (0 == b) (a.yf = null), (a.Af = 0);
              else {
                var c = a.yf;
                a.yf = new Uint8Array(b);
                c && a.yf.set(c.subarray(0, Math.min(b, a.Af)));
                a.Af = b;
              }
          },
          Of() {
            throw db[44];
          },
          Tf(a, b, c, e) {
            return O.createNode(a, b, c, e);
          },
          lg(a, b, c) {
            if (P(a.mode)) {
              try {
                var e = eb(b, c);
              } catch (h) {}
              if (e) for (var f in e.yf) throw new N(55);
            }
            delete a.parent.yf[a.name];
            a.parent.timestamp = Date.now();
            a.name = c;
            b.yf[c] = a;
            b.timestamp = a.parent.timestamp;
            a.parent = b;
          },
          Yf(a, b) {
            delete a.yf[b];
            a.timestamp = Date.now();
          },
          Wf(a, b) {
            var c = eb(a, b),
              e;
            for (e in c.yf) throw new N(55);
            delete a.yf[b];
            a.timestamp = Date.now();
          },
          kg(a) {
            var b = [".", ".."],
              c;
            for (c in a.yf) a.yf.hasOwnProperty(c) && b.push(c);
            return b;
          },
          Xf(a, b, c) {
            a = O.createNode(a, b, 41471, 0);
            a.link = c;
            return a;
          },
          Rf(a) {
            if (40960 !== (a.mode & 61440)) throw new N(28);
            return a.link;
          },
        },
        xf: {
          read(a, b, c, e, f) {
            var h = a.node.yf;
            if (f >= a.node.Af) return 0;
            a = Math.min(a.node.Af - f, e);
            if (8 < a && h.subarray) b.set(h.subarray(f, f + a), c);
            else for (e = 0; e < a; e++) b[c + e] = h[f + e];
            return a;
          },
          write(a, b, c, e, f, h) {
            b.buffer === w.buffer && (h = !1);
            if (!e) return 0;
            a = a.node;
            a.timestamp = Date.now();
            if (b.subarray && (!a.yf || a.yf.subarray)) {
              if (h) return (a.yf = b.subarray(c, c + e)), (a.Af = e);
              if (0 === a.Af && 0 === f)
                return (a.yf = b.slice(c, c + e)), (a.Af = e);
              if (f + e <= a.Af) return a.yf.set(b.subarray(c, c + e), f), e;
            }
            ab(a, f + e);
            if (a.yf.subarray && b.subarray) a.yf.set(b.subarray(c, c + e), f);
            else for (h = 0; h < e; h++) a.yf[f + h] = b[c + h];
            a.Af = Math.max(a.Af, f + e);
            return e;
          },
          Kf(a, b, c) {
            1 === c
              ? (b += a.position)
              : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Af);
            if (0 > b) throw new N(28);
            return b;
          },
          eg(a, b, c) {
            ab(a.node, b + c);
            a.node.Af = Math.max(a.node.Af, b + c);
          },
          Uf(a, b, c, e, f) {
            if (32768 !== (a.node.mode & 61440)) throw new N(43);
            a = a.node.yf;
            if (f & 2 || a.buffer !== w.buffer) {
              if (0 < c || c + b < a.length)
                a.subarray
                  ? (a = a.subarray(c, c + b))
                  : (a = Array.prototype.slice.call(a, c, c + b));
              c = !0;
              b = 65536 * Math.ceil(b / 65536);
              (f = fb(65536, b)) ? (x.fill(0, f, f + b), (b = f)) : (b = 0);
              if (!b) throw new N(48);
              w.set(a, b);
            } else (c = !1), (b = a.byteOffset);
            return { yg: b, mg: c };
          },
          Vf(a, b, c, e) {
            O.xf.write(a, b, 0, e, c, !1);
            return 0;
          },
        },
      },
      gb = (a, b) => {
        var c = 0;
        a && (c |= 365);
        b && (c |= 146);
        return c;
      },
      hb = null,
      ib = {},
      jb = [],
      kb = 1,
      Q = null,
      lb = !0,
      N = null,
      db = {};
    function R(a, b = {}) {
      a = Qa(a);
      if (!a) return { path: "", node: null };
      b = Object.assign({ gg: !0, cg: 0 }, b);
      if (8 < b.cg) throw new N(32);
      a = a.split("/").filter((k) => !!k);
      for (var c = hb, e = "/", f = 0; f < a.length; f++) {
        var h = f === a.length - 1;
        if (h && b.parent) break;
        c = eb(c, a[f]);
        e = M(e + "/" + a[f]);
        c.Lf && (!h || (h && b.gg)) && (c = c.Lf.root);
        if (!h || b.Jf)
          for (h = 0; 40960 === (c.mode & 61440); )
            if (
              ((c = mb(e)),
              (e = Qa(Ma(e), c)),
              (c = R(e, { cg: b.cg + 1 }).node),
              40 < h++)
            )
              throw new N(32);
      }
      return { path: e, node: c };
    }
    function nb(a) {
      for (var b; ; ) {
        if (a === a.parent)
          return (
            (a = a.Ff.jg),
            b ? ("/" !== a[a.length - 1] ? `${a}/${b}` : a + b) : a
          );
        b = b ? `${a.name}/${b}` : a.name;
        a = a.parent;
      }
    }
    function ob(a, b) {
      for (var c = 0, e = 0; e < b.length; e++)
        c = ((c << 5) - c + b.charCodeAt(e)) | 0;
      return ((a + c) >>> 0) % Q.length;
    }
    function pb(a) {
      var b = ob(a.parent.id, a.name);
      if (Q[b] === a) Q[b] = a.Mf;
      else
        for (b = Q[b]; b; ) {
          if (b.Mf === a) {
            b.Mf = a.Mf;
            break;
          }
          b = b.Mf;
        }
    }
    function eb(a, b) {
      var c;
      if ((c = (c = qb(a, "x")) ? c : a.wf.Of ? 0 : 2)) throw new N(c, a);
      for (c = Q[ob(a.id, b)]; c; c = c.Mf) {
        var e = c.name;
        if (c.parent.id === a.id && e === b) return c;
      }
      return a.wf.Of(a, b);
    }
    function cb(a, b, c, e) {
      a = new rb(a, b, c, e);
      b = ob(a.parent.id, a.name);
      a.Mf = Q[b];
      return (Q[b] = a);
    }
    function P(a) {
      return 16384 === (a & 61440);
    }
    function sb(a) {
      var b = ["r", "w", "rw"][a & 3];
      a & 512 && (b += "w");
      return b;
    }
    function qb(a, b) {
      if (lb) return 0;
      if (!b.includes("r") || a.mode & 292) {
        if (
          (b.includes("w") && !(a.mode & 146)) ||
          (b.includes("x") && !(a.mode & 73))
        )
          return 2;
      } else return 2;
      return 0;
    }
    function tb(a, b) {
      try {
        return eb(a, b), 20;
      } catch (c) {}
      return qb(a, "wx");
    }
    function ub(a, b, c) {
      try {
        var e = eb(a, b);
      } catch (f) {
        return f.zf;
      }
      if ((a = qb(a, "wx"))) return a;
      if (c) {
        if (!P(e.mode)) return 54;
        if (e === e.parent || "/" === nb(e)) return 10;
      } else if (P(e.mode)) return 31;
      return 0;
    }
    function vb() {
      for (var a = 0; 4096 >= a; a++) if (!jb[a]) return a;
      throw new N(33);
    }
    function S(a) {
      a = jb[a];
      if (!a) throw new N(8);
      return a;
    }
    function wb(a, b = -1) {
      xb ||
        ((xb = function () {
          this.Zf = {};
        }),
        (xb.prototype = {}),
        Object.defineProperties(xb.prototype, {
          object: {
            get() {
              return this.node;
            },
            set(c) {
              this.node = c;
            },
          },
          flags: {
            get() {
              return this.Zf.flags;
            },
            set(c) {
              this.Zf.flags = c;
            },
          },
          position: {
            get() {
              return this.Zf.position;
            },
            set(c) {
              this.Zf.position = c;
            },
          },
        }));
      a = Object.assign(new xb(), a);
      -1 == b && (b = vb());
      a.Hf = b;
      return (jb[b] = a);
    }
    var bb = {
      open(a) {
        a.xf = ib[a.node.Qf].xf;
        a.xf.open && a.xf.open(a);
      },
      Kf() {
        throw new N(70);
      },
    };
    function Xa(a, b) {
      ib[a] = { xf: b };
    }
    function yb(a, b) {
      var c = "/" === b,
        e = !b;
      if (c && hb) throw new N(10);
      if (!c && !e) {
        var f = R(b, { gg: !1 });
        b = f.path;
        f = f.node;
        if (f.Lf) throw new N(10);
        if (!P(f.mode)) throw new N(54);
      }
      b = { type: a, Mg: {}, jg: b, vg: [] };
      a = a.Ff(b);
      a.Ff = b;
      b.root = a;
      c ? (hb = a) : f && ((f.Lf = b), f.Ff && f.Ff.vg.push(b));
    }
    function zb(a, b, c) {
      var e = R(a, { parent: !0 }).node;
      a = Na(a);
      if (!a || "." === a || ".." === a) throw new N(28);
      var f = tb(e, a);
      if (f) throw new N(f);
      if (!e.wf.Tf) throw new N(63);
      return e.wf.Tf(e, a, b, c);
    }
    function T(a, b) {
      return zb(a, ((void 0 !== b ? b : 511) & 1023) | 16384, 0);
    }
    function Ab(a, b, c) {
      "undefined" == typeof c && ((c = b), (b = 438));
      zb(a, b | 8192, c);
    }
    function Bb(a, b) {
      if (!Qa(a)) throw new N(44);
      var c = R(b, { parent: !0 }).node;
      if (!c) throw new N(44);
      b = Na(b);
      var e = tb(c, b);
      if (e) throw new N(e);
      if (!c.wf.Xf) throw new N(63);
      c.wf.Xf(c, b, a);
    }
    function Cb(a) {
      var b = R(a, { parent: !0 }).node;
      a = Na(a);
      var c = eb(b, a),
        e = ub(b, a, !0);
      if (e) throw new N(e);
      if (!b.wf.Wf) throw new N(63);
      if (c.Lf) throw new N(10);
      b.wf.Wf(b, a);
      pb(c);
    }
    function mb(a) {
      a = R(a).node;
      if (!a) throw new N(44);
      if (!a.wf.Rf) throw new N(28);
      return Qa(nb(a.parent), a.wf.Rf(a));
    }
    function Db(a, b) {
      a = R(a, { Jf: !b }).node;
      if (!a) throw new N(44);
      if (!a.wf.Ef) throw new N(63);
      return a.wf.Ef(a);
    }
    function Eb(a) {
      return Db(a, !0);
    }
    function Fb(a, b) {
      a = "string" == typeof a ? R(a, { Jf: !0 }).node : a;
      if (!a.wf.Bf) throw new N(63);
      a.wf.Bf(a, {
        mode: (b & 4095) | (a.mode & -4096),
        timestamp: Date.now(),
      });
    }
    function Gb(a, b) {
      if (0 > b) throw new N(28);
      a = "string" == typeof a ? R(a, { Jf: !0 }).node : a;
      if (!a.wf.Bf) throw new N(63);
      if (P(a.mode)) throw new N(31);
      if (32768 !== (a.mode & 61440)) throw new N(28);
      var c = qb(a, "w");
      if (c) throw new N(c);
      a.wf.Bf(a, { size: b, timestamp: Date.now() });
    }
    function Hb(a, b, c) {
      if ("" === a) throw new N(44);
      if ("string" == typeof b) {
        var e = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[b];
        if ("undefined" == typeof e)
          throw Error(`Unknown file open mode: ${b}`);
        b = e;
      }
      c = b & 64 ? (("undefined" == typeof c ? 438 : c) & 4095) | 32768 : 0;
      if ("object" == typeof a) var f = a;
      else {
        a = M(a);
        try {
          f = R(a, { Jf: !(b & 131072) }).node;
        } catch (h) {}
      }
      e = !1;
      if (b & 64)
        if (f) {
          if (b & 128) throw new N(20);
        } else (f = zb(a, c, 0)), (e = !0);
      if (!f) throw new N(44);
      8192 === (f.mode & 61440) && (b &= -513);
      if (b & 65536 && !P(f.mode)) throw new N(54);
      if (
        !e &&
        (c = f
          ? 40960 === (f.mode & 61440)
            ? 32
            : P(f.mode) && ("r" !== sb(b) || b & 512)
              ? 31
              : qb(f, sb(b))
          : 44)
      )
        throw new N(c);
      b & 512 && !e && Gb(f, 0);
      b &= -131713;
      f = wb({
        node: f,
        path: nb(f),
        flags: b,
        seekable: !0,
        position: 0,
        xf: f.xf,
        Bg: [],
        error: !1,
      });
      f.xf.open && f.xf.open(f);
      !d.logReadFiles || b & 1 || (Ib || (Ib = {}), a in Ib || (Ib[a] = 1));
      return f;
    }
    function Jb(a, b, c) {
      if (null === a.Hf) throw new N(8);
      if (!a.seekable || !a.xf.Kf) throw new N(70);
      if (0 != c && 1 != c && 2 != c) throw new N(28);
      a.position = a.xf.Kf(a, b, c);
      a.Bg = [];
    }
    function Kb() {
      N ||
        ((N = function (a, b) {
          this.name = "ErrnoError";
          this.node = b;
          this.zg = function (c) {
            this.zf = c;
          };
          this.zg(a);
          this.message = "FS error";
        }),
        (N.prototype = Error()),
        (N.prototype.constructor = N),
        [44].forEach((a) => {
          db[a] = new N(a);
          db[a].stack = "<generic error, no stack>";
        }));
    }
    var Lb;
    function Mb(a, b, c) {
      a = M("/dev/" + a);
      var e = gb(!!b, !!c);
      Nb || (Nb = 64);
      var f = (Nb++ << 8) | 0;
      Xa(f, {
        open(h) {
          h.seekable = !1;
        },
        close() {
          c && c.buffer && c.buffer.length && c(10);
        },
        read(h, k, n, l) {
          for (var m = 0, q = 0; q < l; q++) {
            try {
              var p = b();
            } catch (t) {
              throw new N(29);
            }
            if (void 0 === p && 0 === m) throw new N(6);
            if (null === p || void 0 === p) break;
            m++;
            k[n + q] = p;
          }
          m && (h.node.timestamp = Date.now());
          return m;
        },
        write(h, k, n, l) {
          for (var m = 0; m < l; m++)
            try {
              c(k[n + m]);
            } catch (q) {
              throw new N(29);
            }
          l && (h.node.timestamp = Date.now());
          return m;
        },
      });
      Ab(a, e, f);
    }
    var Nb,
      U = {},
      xb,
      Ib;
    function Ob(a, b, c) {
      if ("/" === b.charAt(0)) return b;
      a = -100 === a ? "/" : S(a).path;
      if (0 == b.length) {
        if (!c) throw new N(44);
        return a;
      }
      return M(a + "/" + b);
    }
    function Pb(a, b, c) {
      try {
        var e = a(b);
      } catch (h) {
        if (h && h.node && M(b) !== M(nb(h.node))) return -54;
        throw h;
      }
      A[c >> 2] = e.rg;
      A[(c + 4) >> 2] = e.mode;
      C[(c + 8) >> 2] = e.xg;
      A[(c + 12) >> 2] = e.uid;
      A[(c + 16) >> 2] = e.ug;
      A[(c + 20) >> 2] = e.Qf;
      F = [
        e.size >>> 0,
        ((D = e.size),
        1 <= +Math.abs(D)
          ? 0 < D
            ? +Math.floor(D / 4294967296) >>> 0
            : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0
          : 0),
      ];
      A[(c + 24) >> 2] = F[0];
      A[(c + 28) >> 2] = F[1];
      A[(c + 32) >> 2] = 4096;
      A[(c + 36) >> 2] = e.pg;
      a = e.ng.getTime();
      b = e.wg.getTime();
      var f = e.qg.getTime();
      F = [
        Math.floor(a / 1e3) >>> 0,
        ((D = Math.floor(a / 1e3)),
        1 <= +Math.abs(D)
          ? 0 < D
            ? +Math.floor(D / 4294967296) >>> 0
            : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0
          : 0),
      ];
      A[(c + 40) >> 2] = F[0];
      A[(c + 44) >> 2] = F[1];
      C[(c + 48) >> 2] = (a % 1e3) * 1e3;
      F = [
        Math.floor(b / 1e3) >>> 0,
        ((D = Math.floor(b / 1e3)),
        1 <= +Math.abs(D)
          ? 0 < D
            ? +Math.floor(D / 4294967296) >>> 0
            : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0
          : 0),
      ];
      A[(c + 56) >> 2] = F[0];
      A[(c + 60) >> 2] = F[1];
      C[(c + 64) >> 2] = (b % 1e3) * 1e3;
      F = [
        Math.floor(f / 1e3) >>> 0,
        ((D = Math.floor(f / 1e3)),
        1 <= +Math.abs(D)
          ? 0 < D
            ? +Math.floor(D / 4294967296) >>> 0
            : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0
          : 0),
      ];
      A[(c + 72) >> 2] = F[0];
      A[(c + 76) >> 2] = F[1];
      C[(c + 80) >> 2] = (f % 1e3) * 1e3;
      F = [
        e.ig >>> 0,
        ((D = e.ig),
        1 <= +Math.abs(D)
          ? 0 < D
            ? +Math.floor(D / 4294967296) >>> 0
            : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0
          : 0),
      ];
      A[(c + 88) >> 2] = F[0];
      A[(c + 92) >> 2] = F[1];
      return 0;
    }
    var Qb = void 0;
    function Rb() {
      var a = A[+Qb >> 2];
      Qb += 4;
      return a;
    }
    var Sb = (a, b) =>
        (b + 2097152) >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN,
      Tb = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
      Ub = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
      Wb = (a) => {
        var b = Sa(a) + 1,
          c = Vb(b);
        c && Ta(a, x, c, b);
        return c;
      },
      Xb = {},
      Zb = () => {
        if (!Yb) {
          var a = {
              USER: "web_user",
              LOGNAME: "web_user",
              PATH: "/",
              PWD: "/",
              HOME: "/home/web_user",
              LANG:
                (
                  ("object" == typeof navigator &&
                    navigator.languages &&
                    navigator.languages[0]) ||
                  "C"
                ).replace("-", "_") + ".UTF-8",
              _: da || "./this.program",
            },
            b;
          for (b in Xb) void 0 === Xb[b] ? delete a[b] : (a[b] = Xb[b]);
          var c = [];
          for (b in a) c.push(`${b}=${a[b]}`);
          Yb = c;
        }
        return Yb;
      },
      Yb;
    function $b() {}
    function ac() {}
    function bc() {}
    function cc() {}
    function dc() {}
    function ec() {}
    function fc() {}
    function gc() {}
    function hc() {}
    function ic() {}
    function jc() {}
    function kc() {}
    function lc() {}
    function mc() {}
    function nc() {}
    function oc() {}
    function pc() {}
    function qc() {}
    function rc() {}
    function sc() {}
    function tc() {}
    function uc() {}
    function vc() {}
    function wc() {}
    function xc() {}
    function yc() {}
    function zc() {}
    function Ac() {}
    function Bc() {}
    function Cc() {}
    function Dc() {}
    function Ec() {}
    function Fc() {}
    function Gc() {}
    function Hc() {}
    function Ic() {}
    function Jc() {}
    function Kc() {}
    function Lc() {}
    var Mc = 0,
      Nc = (a) => {
        na = a;
        if (!(Ja || 0 < Mc)) {
          if (d.onExit) d.onExit(a);
          v = !0;
        }
        ea(a, new Ha(a));
      },
      Oc = (a) => {
        a instanceof Ha || "unwind" == a || ea(1, a);
      },
      Pc = (a) => {
        try {
          a();
        } catch (b) {
          u(b);
        }
      };
    function Qc() {
      var a = V,
        b = {},
        c;
      for (c in a)
        (function (e) {
          var f = a[e];
          b[e] =
            "function" == typeof f
              ? function () {
                  Rc.push(e);
                  try {
                    return f.apply(null, arguments);
                  } finally {
                    v ||
                      (Rc.pop() === e || u(),
                      W &&
                        1 === Y &&
                        0 === Rc.length &&
                        ((Y = 0),
                        Pc(Sc),
                        "undefined" != typeof Fibers && Fibers.Ng()));
                  }
                }
              : f;
        })(c);
      return b;
    }
    var Y = 0,
      W = null,
      Tc = 0,
      Rc = [],
      Uc = {},
      Vc = {},
      Wc = 0,
      Xc = null,
      Yc = [];
    function Zc() {
      return new Promise((a, b) => {
        Xc = { resolve: a, reject: b };
      });
    }
    function $c() {
      var a = Vb(16396),
        b = a + 12;
      C[a >> 2] = b;
      C[(a + 4) >> 2] = b + 16384;
      b = Rc[0];
      var c = Uc[b];
      void 0 === c && ((c = Wc++), (Uc[b] = c), (Vc[c] = b));
      A[(a + 8) >> 2] = c;
      return a;
    }
    function ad(a) {
      if (!v) {
        if (0 === Y) {
          var b = !1,
            c = !1;
          a((e = 0) => {
            if (!v && ((Tc = e), (b = !0), c)) {
              Y = 2;
              Pc(() => bd(W));
              "undefined" != typeof Browser &&
                Browser.ag.tg &&
                Browser.ag.resume();
              e = !1;
              try {
                var f = (0, V[Vc[A[(W + 8) >> 2]]])();
              } catch (n) {
                (f = n), (e = !0);
              }
              var h = !1;
              if (!W) {
                var k = Xc;
                k && ((Xc = null), (e ? k.reject : k.resolve)(f), (h = !0));
              }
              if (e && !h) throw f;
            }
          });
          c = !0;
          b ||
            ((Y = 1),
            (W = $c()),
            "undefined" != typeof Browser &&
              Browser.ag.tg &&
              Browser.ag.pause(),
            Pc(() => cd(W)));
        } else
          2 === Y
            ? ((Y = 0),
              Pc(dd),
              ed(W),
              (W = null),
              Yc.forEach((e) => {
                if (!v)
                  try {
                    if ((e(), !(Ja || 0 < Mc)))
                      try {
                        (na = e = na), Nc(e);
                      } catch (f) {
                        Oc(f);
                      }
                  } catch (f) {
                    Oc(f);
                  }
              }))
            : u(`invalid state: ${Y}`);
        return Tc;
      }
    }
    function fd(a) {
      return ad((b) => {
        a().then(b);
      });
    }
    var gd = {},
      hd,
      jd,
      kd = [],
      Z = (a, b, c, e, f) => {
        function h(p) {
          --Mc;
          0 !== l && ld(l);
          return "string" === b
            ? p
              ? K(x, p)
              : ""
            : "boolean" === b
              ? !!p
              : p;
        }
        var k = {
          string: (p) => {
            var t = 0;
            if (null !== p && void 0 !== p && 0 !== p) {
              t = Sa(p) + 1;
              var y = md(t);
              Ta(p, x, y, t);
              t = y;
            }
            return t;
          },
          array: (p) => {
            var t = md(p.length);
            w.set(p, t);
            return t;
          },
        };
        a = d["_" + a];
        var n = [],
          l = 0;
        if (e)
          for (var m = 0; m < e.length; m++) {
            var q = k[c[m]];
            q ? (0 === l && (l = nd()), (n[m] = q(e[m]))) : (n[m] = e[m]);
          }
        c = W;
        e = a.apply(null, n);
        f = f && f.async;
        Mc += 1;
        if (W != c) return Zc().then(h);
        e = h(e);
        return f ? Promise.resolve(e) : e;
      },
      od =
        "undefined" != typeof TextDecoder
          ? new TextDecoder("utf-16le")
          : void 0;
    function rb(a, b, c, e) {
      a || (a = this);
      this.parent = a;
      this.Ff = a.Ff;
      this.Lf = null;
      this.id = kb++;
      this.name = b;
      this.mode = c;
      this.wf = {};
      this.xf = {};
      this.Qf = e;
    }
    Object.defineProperties(rb.prototype, {
      read: {
        get: function () {
          return 365 === (this.mode & 365);
        },
        set: function (a) {
          a ? (this.mode |= 365) : (this.mode &= -366);
        },
      },
      write: {
        get: function () {
          return 146 === (this.mode & 146);
        },
        set: function (a) {
          a ? (this.mode |= 146) : (this.mode &= -147);
        },
      },
    });
    Kb();
    Q = Array(4096);
    yb(O, "/");
    T("/tmp");
    T("/home");
    T("/home/web_user");
    (function () {
      T("/dev");
      Xa(259, { read: () => 0, write: (e, f, h, k) => k });
      Ab("/dev/null", 259);
      Wa(1280, Za);
      Wa(1536, $a);
      Ab("/dev/tty", 1280);
      Ab("/dev/tty1", 1536);
      var a = new Uint8Array(1024),
        b = 0,
        c = () => {
          0 === b && (b = Pa(a).byteLength);
          return a[--b];
        };
      Mb("random", c);
      Mb("urandom", c);
      T("/dev/shm");
      T("/dev/shm/tmp");
    })();
    (function () {
      T("/proc");
      var a = T("/proc/self");
      T("/proc/self/fd");
      yb(
        {
          Ff() {
            var b = cb(a, "fd", 16895, 73);
            b.wf = {
              Of(c, e) {
                var f = S(+e);
                c = {
                  parent: null,
                  Ff: { jg: "fake" },
                  wf: { Rf: () => f.path },
                };
                return (c.parent = c);
              },
            };
            return b;
          },
        },
        "/proc/self/fd",
      );
    })();
    (function () {
      const a = new Map();
      d.setAuthorizer = function (b, c, e) {
        c ? a.set(b, { f: c, dg: e }) : a.delete(b);
        return Z("set_authorizer", "number", ["number"], [b]);
      };
      $b = function (b, c, e, f, h, k) {
        if (a.has(b)) {
          const { f: n, dg: l } = a.get(b);
          return n(
            l,
            c,
            e ? (e ? K(x, e) : "") : null,
            f ? (f ? K(x, f) : "") : null,
            h ? (h ? K(x, h) : "") : null,
            k ? (k ? K(x, k) : "") : null,
          );
        }
        return 0;
      };
    })();
    (function () {
      const a = new Map(),
        b = new Map();
      d.createFunction = function (c, e, f, h, k, n) {
        const l = a.size;
        a.set(l, { f: n, If: k });
        return Z(
          "create_function",
          "number",
          "number string number number number number".split(" "),
          [c, e, f, h, l, 0],
        );
      };
      d.createAggregate = function (c, e, f, h, k, n, l) {
        const m = a.size;
        a.set(m, { step: n, sg: l, If: k });
        return Z(
          "create_function",
          "number",
          "number string number number number number".split(" "),
          [c, e, f, h, m, 1],
        );
      };
      d.getFunctionUserData = function (c) {
        return b.get(c);
      };
      bc = function (c, e, f, h) {
        c = a.get(c);
        b.set(e, c.If);
        c.f(e, new Uint32Array(x.buffer, h, f));
        b.delete(e);
      };
      dc = function (c, e, f, h) {
        c = a.get(c);
        b.set(e, c.If);
        c.step(e, new Uint32Array(x.buffer, h, f));
        b.delete(e);
      };
      ac = function (c, e) {
        c = a.get(c);
        b.set(e, c.If);
        c.sg(e);
        b.delete(e);
      };
    })();
    (function () {
      const a = new Map();
      d.progressHandler = function (b, c, e, f) {
        e ? a.set(b, { f: e, dg: f }) : a.delete(b);
        return Z("progress_handler", null, ["number", "number"], [b, c]);
      };
      cc = function (b) {
        if (a.has(b)) {
          const { f: c, dg: e } = a.get(b);
          return c(e);
        }
        return 0;
      };
    })();
    (function () {
      function a(l, m) {
        const q = `get${l}`,
          p = `set${l}`;
        return new Proxy(new DataView(x.buffer, m, "Int32" === l ? 4 : 8), {
          get(t, y) {
            if (y === q)
              return function (B, G) {
                if (!G) throw Error("must be little endian");
                return t[y](B, G);
              };
            if (y === p)
              return function (B, G, E) {
                if (!E) throw Error("must be little endian");
                return t[y](B, G, E);
              };
            if ("string" === typeof y && y.match(/^(get)|(set)/))
              throw Error("invalid type");
            return t[y];
          },
        });
      }
      const b = "object" === typeof gd,
        c = new Map(),
        e = new Map(),
        f = new Map(),
        h = b ? new Set() : null,
        k = b ? new Set() : null,
        n = new Map();
      uc = function (l, m, q, p) {
        n.set(l ? K(x, l) : "", {
          size: m,
          Pf: Array.from(new Uint32Array(x.buffer, p, q)),
        });
      };
      d.createModule = function (l, m, q, p) {
        b && (q.handleAsync = fd);
        const t = c.size;
        c.set(t, { module: q, If: p });
        p = 0;
        q.xCreate && (p |= 1);
        q.xConnect && (p |= 2);
        q.xBestIndex && (p |= 4);
        q.xDisconnect && (p |= 8);
        q.xDestroy && (p |= 16);
        q.xOpen && (p |= 32);
        q.xClose && (p |= 64);
        q.xFilter && (p |= 128);
        q.xNext && (p |= 256);
        q.xEof && (p |= 512);
        q.xColumn && (p |= 1024);
        q.xRowid && (p |= 2048);
        q.xUpdate && (p |= 4096);
        q.xBegin && (p |= 8192);
        q.xSync && (p |= 16384);
        q.xCommit && (p |= 32768);
        q.xRollback && (p |= 65536);
        q.xFindFunction && (p |= 131072);
        q.xRename && (p |= 262144);
        return Z(
          "create_module",
          "number",
          ["number", "string", "number", "number"],
          [l, m, t, p],
        );
      };
      kc = function (l, m, q, p, t, y) {
        m = c.get(m);
        e.set(t, m);
        if (b) {
          h.delete(t);
          for (const B of h) e.delete(B);
        }
        p = Array.from(new Uint32Array(x.buffer, p, q)).map((B) =>
          B ? K(x, B) : "",
        );
        return m.module.xCreate(l, m.If, p, t, a("Int32", y));
      };
      jc = function (l, m, q, p, t, y) {
        m = c.get(m);
        e.set(t, m);
        if (b) {
          h.delete(t);
          for (const B of h) e.delete(B);
        }
        p = Array.from(new Uint32Array(x.buffer, p, q)).map((B) =>
          B ? K(x, B) : "",
        );
        return m.module.xConnect(l, m.If, p, t, a("Int32", y));
      };
      fc = function (l, m) {
        var q = e.get(l),
          p = n.get("sqlite3_index_info").Pf;
        const t = {};
        t.nConstraint = H(m + p[0], "i32");
        t.aConstraint = [];
        var y = H(m + p[1], "*"),
          B = n.get("sqlite3_index_constraint").size;
        for (var G = 0; G < t.nConstraint; ++G) {
          var E = t.aConstraint,
            L = E.push,
            I = y + G * B,
            ka = n.get("sqlite3_index_constraint").Pf,
            X = {};
          X.iColumn = H(I + ka[0], "i32");
          X.op = H(I + ka[1], "i8");
          X.usable = !!H(I + ka[2], "i8");
          L.call(E, X);
        }
        t.nOrderBy = H(m + p[2], "i32");
        t.aOrderBy = [];
        y = H(m + p[3], "*");
        B = n.get("sqlite3_index_orderby").size;
        for (G = 0; G < t.nOrderBy; ++G)
          (E = t.aOrderBy),
            (L = E.push),
            (I = y + G * B),
            (ka = n.get("sqlite3_index_orderby").Pf),
            (X = {}),
            (X.iColumn = H(I + ka[0], "i32")),
            (X.desc = !!H(I + ka[1], "i8")),
            L.call(E, X);
        t.aConstraintUsage = [];
        for (y = 0; y < t.nConstraint; ++y)
          t.aConstraintUsage.push({ argvIndex: 0, omit: !1 });
        t.idxNum = H(m + p[5], "i32");
        t.idxStr = null;
        t.orderByConsumed = !!H(m + p[8], "i8");
        t.estimatedCost = H(m + p[9], "double");
        t.estimatedRows = H(m + p[10], "i32");
        t.idxFlags = H(m + p[11], "i32");
        t.colUsed = H(m + p[12], "i32");
        l = q.module.xBestIndex(l, t);
        q = n.get("sqlite3_index_info").Pf;
        p = H(m + q[4], "*");
        y = n.get("sqlite3_index_constraint_usage").size;
        for (L = 0; L < t.nConstraint; ++L)
          (B = p + L * y),
            (E = t.aConstraintUsage[L]),
            (I = n.get("sqlite3_index_constraint_usage").Pf),
            J(B + I[0], E.argvIndex, "i32"),
            J(B + I[1], E.omit ? 1 : 0, "i8");
        J(m + q[5], t.idxNum, "i32");
        "string" === typeof t.idxStr &&
          ((p = Sa(t.idxStr)),
          (y = Z("sqlite3_malloc", "number", ["number"], [p + 1])),
          Ta(t.idxStr, x, y, p + 1),
          J(m + q[6], y, "*"),
          J(m + q[7], 1, "i32"));
        J(m + q[8], t.orderByConsumed, "i32");
        J(m + q[9], t.estimatedCost, "double");
        J(m + q[10], t.estimatedRows, "i32");
        J(m + q[11], t.idxFlags, "i32");
        return l;
      };
      mc = function (l) {
        const m = e.get(l);
        b ? h.add(l) : e.delete(l);
        return m.module.xDisconnect(l);
      };
      lc = function (l) {
        const m = e.get(l);
        b ? h.add(l) : e.delete(l);
        return m.module.xDestroy(l);
      };
      qc = function (l, m) {
        const q = e.get(l);
        f.set(m, q);
        if (b) {
          k.delete(m);
          for (const p of k) f.delete(p);
        }
        return q.module.xOpen(l, m);
      };
      gc = function (l) {
        const m = f.get(l);
        b ? k.add(l) : f.delete(l);
        return m.module.xClose(l);
      };
      nc = function (l) {
        return f.get(l).module.xEof(l) ? 1 : 0;
      };
      oc = function (l, m, q, p, t) {
        const y = f.get(l);
        q = q ? (q ? K(x, q) : "") : null;
        t = new Uint32Array(x.buffer, t, p);
        return y.module.xFilter(l, m, q, t);
      };
      pc = function (l) {
        return f.get(l).module.xNext(l);
      };
      hc = function (l, m, q) {
        return f.get(l).module.xColumn(l, m, q);
      };
      tc = function (l, m) {
        return f.get(l).module.xRowid(l, a("BigInt64", m));
      };
      wc = function (l, m, q, p) {
        const t = e.get(l);
        q = new Uint32Array(x.buffer, q, m);
        return t.module.xUpdate(l, q, a("BigInt64", p));
      };
      ec = function (l) {
        return e.get(l).module.xBegin(l);
      };
      vc = function (l) {
        return e.get(l).module.xSync(l);
      };
      ic = function (l) {
        return e.get(l).module.xCommit(l);
      };
      sc = function (l) {
        return e.get(l).module.xRollback(l);
      };
      rc = function (l, m) {
        const q = e.get(l);
        m = m ? K(x, m) : "";
        return q.module.xRename(l, m);
      };
    })();
    (function () {
      function a(h, k) {
        const n = `get${h}`,
          l = `set${h}`;
        return new Proxy(new DataView(x.buffer, k, "Int32" === h ? 4 : 8), {
          get(m, q) {
            if (q === n)
              return function (p, t) {
                if (!t) throw Error("must be little endian");
                return m[q](p, t);
              };
            if (q === l)
              return function (p, t, y) {
                if (!y) throw Error("must be little endian");
                return m[q](p, t, y);
              };
            if ("string" === typeof q && q.match(/^(get)|(set)/))
              throw Error("invalid type");
            return m[q];
          },
        });
      }
      const b = "object" === typeof gd;
      b && (d.handleAsync = fd);
      const c = new Map(),
        e = new Map();
      d.registerVFS = function (h, k) {
        if (Z("sqlite3_vfs_find", "number", ["string"], [h.name]))
          throw Error(`VFS '${h.name}' already registered`);
        b && (h.handleAsync = fd);
        var n = h.Lg ?? 64;
        const l = d._malloc(4);
        k = Z(
          "register_vfs",
          "number",
          ["string", "number", "number", "number"],
          [h.name, n, k ? 1 : 0, l],
        );
        k || ((n = H(l, "*")), c.set(n, h));
        d._free(l);
        return k;
      };
      const f = b ? new Set() : null;
      zc = function (h) {
        const k = e.get(h);
        b ? f.add(h) : e.delete(h);
        return k.xClose(h);
      };
      Gc = function (h, k, n, l, m) {
        return e
          .get(h)
          .xRead(
            h,
            x.subarray(k, k + n),
            4294967296 * m + l + (0 > l ? 2 ** 32 : 0),
          );
      };
      Lc = function (h, k, n, l, m) {
        return e
          .get(h)
          .xWrite(
            h,
            x.subarray(k, k + n),
            4294967296 * m + l + (0 > l ? 2 ** 32 : 0),
          );
      };
      Jc = function (h, k, n) {
        return e
          .get(h)
          .xTruncate(h, 4294967296 * n + k + (0 > k ? 2 ** 32 : 0));
      };
      Ic = function (h, k) {
        return e.get(h).xSync(h, k);
      };
      Dc = function (h, k) {
        const n = e.get(h);
        k = a("BigInt64", k);
        return n.xFileSize(h, k);
      };
      Ec = function (h, k) {
        return e.get(h).xLock(h, k);
      };
      Kc = function (h, k) {
        return e.get(h).xUnlock(h, k);
      };
      yc = function (h, k) {
        const n = e.get(h);
        k = a("Int32", k);
        return n.xCheckReservedLock(h, k);
      };
      Cc = function (h, k, n) {
        const l = e.get(h);
        n = new DataView(x.buffer, n);
        return l.xFileControl(h, k, n);
      };
      Hc = function (h) {
        return e.get(h).xSectorSize(h);
      };
      Bc = function (h) {
        return e.get(h).xDeviceCharacteristics(h);
      };
      Fc = function (h, k, n, l, m) {
        h = c.get(h);
        e.set(n, h);
        if (b) {
          f.delete(n);
          for (var q of f) e.delete(q);
        }
        q = null;
        if (l & 64) {
          q = 1;
          const p = [];
          for (; q; ) {
            const t = x[k++];
            if (t) p.push(t);
            else
              switch ((x[k] || (q = null), q)) {
                case 1:
                  p.push(63);
                  q = 2;
                  break;
                case 2:
                  p.push(61);
                  q = 3;
                  break;
                case 3:
                  p.push(38), (q = 2);
              }
          }
          q = new TextDecoder().decode(new Uint8Array(p));
        } else k && (q = k ? K(x, k) : "");
        m = a("Int32", m);
        return h.xOpen(q, n, l, m);
      };
      Ac = function (h, k, n) {
        return c.get(h).xDelete(k ? K(x, k) : "", n);
      };
      xc = function (h, k, n, l) {
        h = c.get(h);
        l = a("Int32", l);
        return h.xAccess(k ? K(x, k) : "", n, l);
      };
    })();
    var qd = {
        a: (a, b, c, e) => {
          u(
            `Assertion failed: ${a ? K(x, a) : ""}, at: ` +
              [
                b ? (b ? K(x, b) : "") : "unknown filename",
                c,
                e ? (e ? K(x, e) : "") : "unknown function",
              ],
          );
        },
        N: function (a, b) {
          try {
            return (a = a ? K(x, a) : ""), Fb(a, b), 0;
          } catch (c) {
            if ("undefined" == typeof U || "ErrnoError" !== c.name) throw c;
            return -c.zf;
          }
        },
        Q: function (a, b, c) {
          try {
            b = b ? K(x, b) : "";
            b = Ob(a, b);
            if (c & -8) return -28;
            var e = R(b, { Jf: !0 }).node;
            if (!e) return -44;
            a = "";
            c & 4 && (a += "r");
            c & 2 && (a += "w");
            c & 1 && (a += "x");
            return a && qb(e, a) ? -2 : 0;
          } catch (f) {
            if ("undefined" == typeof U || "ErrnoError" !== f.name) throw f;
            return -f.zf;
          }
        },
        O: function (a, b) {
          try {
            var c = S(a);
            Fb(c.node, b);
            return 0;
          } catch (e) {
            if ("undefined" == typeof U || "ErrnoError" !== e.name) throw e;
            return -e.zf;
          }
        },
        M: function (a) {
          try {
            var b = S(a).node;
            var c = "string" == typeof b ? R(b, { Jf: !0 }).node : b;
            if (!c.wf.Bf) throw new N(63);
            c.wf.Bf(c, { timestamp: Date.now() });
            return 0;
          } catch (e) {
            if ("undefined" == typeof U || "ErrnoError" !== e.name) throw e;
            return -e.zf;
          }
        },
        b: function (a, b, c) {
          Qb = c;
          try {
            var e = S(a);
            switch (b) {
              case 0:
                var f = Rb();
                if (0 > f) return -28;
                for (; jb[f]; ) f++;
                return wb(e, f).Hf;
              case 1:
              case 2:
                return 0;
              case 3:
                return e.flags;
              case 4:
                return (f = Rb()), (e.flags |= f), 0;
              case 5:
                return (f = Rb()), (z[(f + 0) >> 1] = 2), 0;
              case 6:
              case 7:
                return 0;
              case 16:
              case 8:
                return -28;
              case 9:
                return (A[pd() >> 2] = 28), -1;
              default:
                return -28;
            }
          } catch (h) {
            if ("undefined" == typeof U || "ErrnoError" !== h.name) throw h;
            return -h.zf;
          }
        },
        L: function (a, b) {
          try {
            var c = S(a);
            return Pb(Db, c.path, b);
          } catch (e) {
            if ("undefined" == typeof U || "ErrnoError" !== e.name) throw e;
            return -e.zf;
          }
        },
        n: function (a, b, c) {
          b = Sb(b, c);
          try {
            if (isNaN(b)) return 61;
            var e = S(a);
            if (0 === (e.flags & 2097155)) throw new N(28);
            Gb(e.node, b);
            return 0;
          } catch (f) {
            if ("undefined" == typeof U || "ErrnoError" !== f.name) throw f;
            return -f.zf;
          }
        },
        F: function (a, b) {
          try {
            if (0 === b) return -28;
            var c = Sa("/") + 1;
            if (b < c) return -68;
            Ta("/", x, a, b);
            return c;
          } catch (e) {
            if ("undefined" == typeof U || "ErrnoError" !== e.name) throw e;
            return -e.zf;
          }
        },
        J: function (a, b) {
          try {
            return (a = a ? K(x, a) : ""), Pb(Eb, a, b);
          } catch (c) {
            if ("undefined" == typeof U || "ErrnoError" !== c.name) throw c;
            return -c.zf;
          }
        },
        C: function (a, b, c) {
          try {
            return (
              (b = b ? K(x, b) : ""),
              (b = Ob(a, b)),
              (b = M(b)),
              "/" === b[b.length - 1] && (b = b.substr(0, b.length - 1)),
              T(b, c),
              0
            );
          } catch (e) {
            if ("undefined" == typeof U || "ErrnoError" !== e.name) throw e;
            return -e.zf;
          }
        },
        I: function (a, b, c, e) {
          try {
            b = b ? K(x, b) : "";
            var f = e & 256;
            b = Ob(a, b, e & 4096);
            return Pb(f ? Eb : Db, b, c);
          } catch (h) {
            if ("undefined" == typeof U || "ErrnoError" !== h.name) throw h;
            return -h.zf;
          }
        },
        B: function (a, b, c, e) {
          Qb = e;
          try {
            b = b ? K(x, b) : "";
            b = Ob(a, b);
            var f = e ? Rb() : 0;
            return Hb(b, c, f).Hf;
          } catch (h) {
            if ("undefined" == typeof U || "ErrnoError" !== h.name) throw h;
            return -h.zf;
          }
        },
        z: function (a, b, c, e) {
          try {
            b = b ? K(x, b) : "";
            b = Ob(a, b);
            if (0 >= e) return -28;
            var f = mb(b),
              h = Math.min(e, Sa(f)),
              k = w[c + h];
            Ta(f, x, c, e + 1);
            w[c + h] = k;
            return h;
          } catch (n) {
            if ("undefined" == typeof U || "ErrnoError" !== n.name) throw n;
            return -n.zf;
          }
        },
        y: function (a) {
          try {
            return (a = a ? K(x, a) : ""), Cb(a), 0;
          } catch (b) {
            if ("undefined" == typeof U || "ErrnoError" !== b.name) throw b;
            return -b.zf;
          }
        },
        K: function (a, b) {
          try {
            return (a = a ? K(x, a) : ""), Pb(Db, a, b);
          } catch (c) {
            if ("undefined" == typeof U || "ErrnoError" !== c.name) throw c;
            return -c.zf;
          }
        },
        u: function (a, b, c) {
          try {
            b = b ? K(x, b) : "";
            b = Ob(a, b);
            if (0 === c) {
              a = b;
              var e = R(a, { parent: !0 }).node;
              if (!e) throw new N(44);
              var f = Na(a),
                h = eb(e, f),
                k = ub(e, f, !1);
              if (k) throw new N(k);
              if (!e.wf.Yf) throw new N(63);
              if (h.Lf) throw new N(10);
              e.wf.Yf(e, f);
              pb(h);
            } else 512 === c ? Cb(b) : u("Invalid flags passed to unlinkat");
            return 0;
          } catch (n) {
            if ("undefined" == typeof U || "ErrnoError" !== n.name) throw n;
            return -n.zf;
          }
        },
        t: function (a, b, c) {
          try {
            b = b ? K(x, b) : "";
            b = Ob(a, b, !0);
            if (c) {
              var e = C[c >> 2] + 4294967296 * A[(c + 4) >> 2],
                f = A[(c + 8) >> 2];
              h = 1e3 * e + f / 1e6;
              c += 16;
              e = C[c >> 2] + 4294967296 * A[(c + 4) >> 2];
              f = A[(c + 8) >> 2];
              k = 1e3 * e + f / 1e6;
            } else
              var h = Date.now(),
                k = h;
            a = h;
            var n = R(b, { Jf: !0 }).node;
            n.wf.Bf(n, { timestamp: Math.max(a, k) });
            return 0;
          } catch (l) {
            if ("undefined" == typeof U || "ErrnoError" !== l.name) throw l;
            return -l.zf;
          }
        },
        l: function (a, b, c) {
          a = new Date(1e3 * Sb(a, b));
          A[c >> 2] = a.getSeconds();
          A[(c + 4) >> 2] = a.getMinutes();
          A[(c + 8) >> 2] = a.getHours();
          A[(c + 12) >> 2] = a.getDate();
          A[(c + 16) >> 2] = a.getMonth();
          A[(c + 20) >> 2] = a.getFullYear() - 1900;
          A[(c + 24) >> 2] = a.getDay();
          b = a.getFullYear();
          A[(c + 28) >> 2] =
            ((0 !== b % 4 || (0 === b % 100 && 0 !== b % 400) ? Ub : Tb)[
              a.getMonth()
            ] +
              a.getDate() -
              1) |
            0;
          A[(c + 36) >> 2] = -(60 * a.getTimezoneOffset());
          b = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
          var e = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
          A[(c + 32) >> 2] =
            (b != e && a.getTimezoneOffset() == Math.min(e, b)) | 0;
        },
        i: function (a, b, c, e, f, h, k, n) {
          f = Sb(f, h);
          try {
            if (isNaN(f)) return 61;
            var l = S(e);
            if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (l.flags & 2097155))
              throw new N(2);
            if (1 === (l.flags & 2097155)) throw new N(2);
            if (!l.xf.Uf) throw new N(43);
            var m = l.xf.Uf(l, a, f, b, c);
            var q = m.yg;
            A[k >> 2] = m.mg;
            C[n >> 2] = q;
            return 0;
          } catch (p) {
            if ("undefined" == typeof U || "ErrnoError" !== p.name) throw p;
            return -p.zf;
          }
        },
        j: function (a, b, c, e, f, h, k) {
          h = Sb(h, k);
          try {
            if (isNaN(h)) return 61;
            var n = S(f);
            if (c & 2) {
              if (32768 !== (n.node.mode & 61440)) throw new N(43);
              e & 2 || (n.xf.Vf && n.xf.Vf(n, x.slice(a, a + b), h, b, e));
            }
          } catch (l) {
            if ("undefined" == typeof U || "ErrnoError" !== l.name) throw l;
            return -l.zf;
          }
        },
        w: (a, b, c) => {
          function e(l) {
            return (l = l.toTimeString().match(/\(([A-Za-z ]+)\)$/))
              ? l[1]
              : "GMT";
          }
          var f = new Date().getFullYear(),
            h = new Date(f, 0, 1),
            k = new Date(f, 6, 1);
          f = h.getTimezoneOffset();
          var n = k.getTimezoneOffset();
          C[a >> 2] = 60 * Math.max(f, n);
          A[b >> 2] = Number(f != n);
          a = e(h);
          b = e(k);
          a = Wb(a);
          b = Wb(b);
          n < f
            ? ((C[c >> 2] = a), (C[(c + 4) >> 2] = b))
            : ((C[c >> 2] = b), (C[(c + 4) >> 2] = a));
        },
        e: () => Date.now(),
        d: () => performance.now(),
        r: (a) => {
          var b = x.length;
          a >>>= 0;
          if (2147483648 < a) return !1;
          for (var c = 1; 4 >= c; c *= 2) {
            var e = b * (1 + 0.2 / c);
            e = Math.min(e, a + 100663296);
            var f = Math;
            e = Math.max(a, e);
            a: {
              f =
                (f.min.call(
                  f,
                  2147483648,
                  e + ((65536 - (e % 65536)) % 65536),
                ) -
                  ma.buffer.byteLength +
                  65535) /
                65536;
              try {
                ma.grow(f);
                ra();
                var h = 1;
                break a;
              } catch (k) {}
              h = void 0;
            }
            if (h) return !0;
          }
          return !1;
        },
        D: (a, b) => {
          var c = 0;
          Zb().forEach((e, f) => {
            var h = b + c;
            f = C[(a + 4 * f) >> 2] = h;
            for (h = 0; h < e.length; ++h) w[f++ >> 0] = e.charCodeAt(h);
            w[f >> 0] = 0;
            c += e.length + 1;
          });
          return 0;
        },
        E: (a, b) => {
          var c = Zb();
          C[a >> 2] = c.length;
          var e = 0;
          c.forEach((f) => (e += f.length + 1));
          C[b >> 2] = e;
          return 0;
        },
        f: function (a) {
          try {
            var b = S(a);
            if (null === b.Hf) throw new N(8);
            b.$f && (b.$f = null);
            try {
              b.xf.close && b.xf.close(b);
            } catch (c) {
              throw c;
            } finally {
              jb[b.Hf] = null;
            }
            b.Hf = null;
            return 0;
          } catch (c) {
            if ("undefined" == typeof U || "ErrnoError" !== c.name) throw c;
            return c.zf;
          }
        },
        s: function (a, b) {
          try {
            var c = S(a);
            w[b >> 0] = c.Df
              ? 2
              : P(c.mode)
                ? 3
                : 40960 === (c.mode & 61440)
                  ? 7
                  : 4;
            z[(b + 2) >> 1] = 0;
            F = [
              0,
              ((D = 0),
              1 <= +Math.abs(D)
                ? 0 < D
                  ? +Math.floor(D / 4294967296) >>> 0
                  : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0
                : 0),
            ];
            A[(b + 8) >> 2] = F[0];
            A[(b + 12) >> 2] = F[1];
            F = [
              0,
              ((D = 0),
              1 <= +Math.abs(D)
                ? 0 < D
                  ? +Math.floor(D / 4294967296) >>> 0
                  : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0
                : 0),
            ];
            A[(b + 16) >> 2] = F[0];
            A[(b + 20) >> 2] = F[1];
            return 0;
          } catch (e) {
            if ("undefined" == typeof U || "ErrnoError" !== e.name) throw e;
            return e.zf;
          }
        },
        A: function (a, b, c, e) {
          try {
            a: {
              var f = S(a);
              a = b;
              for (var h, k = (b = 0); k < c; k++) {
                var n = C[a >> 2],
                  l = C[(a + 4) >> 2];
                a += 8;
                var m = f,
                  q = n,
                  p = l,
                  t = h,
                  y = w;
                if (0 > p || 0 > t) throw new N(28);
                if (null === m.Hf) throw new N(8);
                if (1 === (m.flags & 2097155)) throw new N(8);
                if (P(m.node.mode)) throw new N(31);
                if (!m.xf.read) throw new N(28);
                var B = "undefined" != typeof t;
                if (!B) t = m.position;
                else if (!m.seekable) throw new N(70);
                var G = m.xf.read(m, y, q, p, t);
                B || (m.position += G);
                var E = G;
                if (0 > E) {
                  var L = -1;
                  break a;
                }
                b += E;
                if (E < l) break;
                "undefined" !== typeof h && (h += E);
              }
              L = b;
            }
            C[e >> 2] = L;
            return 0;
          } catch (I) {
            if ("undefined" == typeof U || "ErrnoError" !== I.name) throw I;
            return I.zf;
          }
        },
        m: function (a, b, c, e, f) {
          b = Sb(b, c);
          try {
            if (isNaN(b)) return 61;
            var h = S(a);
            Jb(h, b, e);
            F = [
              h.position >>> 0,
              ((D = h.position),
              1 <= +Math.abs(D)
                ? 0 < D
                  ? +Math.floor(D / 4294967296) >>> 0
                  : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0
                : 0),
            ];
            A[f >> 2] = F[0];
            A[(f + 4) >> 2] = F[1];
            h.$f && 0 === b && 0 === e && (h.$f = null);
            return 0;
          } catch (k) {
            if ("undefined" == typeof U || "ErrnoError" !== k.name) throw k;
            return k.zf;
          }
        },
        H: function (a) {
          try {
            var b = S(a);
            return ad((c) => {
              var e = b.node.Ff;
              e.type.Ag
                ? e.type.Ag(e, !1, (f) => {
                    f ? c(29) : c(0);
                  })
                : c(0);
            });
          } catch (c) {
            if ("undefined" == typeof U || "ErrnoError" !== c.name) throw c;
            return c.zf;
          }
        },
        x: function (a, b, c, e) {
          try {
            a: {
              var f = S(a);
              a = b;
              for (var h, k = (b = 0); k < c; k++) {
                var n = C[a >> 2],
                  l = C[(a + 4) >> 2];
                a += 8;
                var m = f,
                  q = n,
                  p = l,
                  t = h,
                  y = w;
                if (0 > p || 0 > t) throw new N(28);
                if (null === m.Hf) throw new N(8);
                if (0 === (m.flags & 2097155)) throw new N(8);
                if (P(m.node.mode)) throw new N(31);
                if (!m.xf.write) throw new N(28);
                m.seekable && m.flags & 1024 && Jb(m, 0, 2);
                var B = "undefined" != typeof t;
                if (!B) t = m.position;
                else if (!m.seekable) throw new N(70);
                var G = m.xf.write(m, y, q, p, t, void 0);
                B || (m.position += G);
                var E = G;
                if (0 > E) {
                  var L = -1;
                  break a;
                }
                b += E;
                "undefined" !== typeof h && (h += E);
              }
              L = b;
            }
            C[e >> 2] = L;
            return 0;
          } catch (I) {
            if ("undefined" == typeof U || "ErrnoError" !== I.name) throw I;
            return I.zf;
          }
        },
        ra: $b,
        P: ac,
        ga: bc,
        ca: cc,
        Y: dc,
        la: ec,
        G: fc,
        h: gc,
        oa: hc,
        ja: ic,
        ea: jc,
        fa: kc,
        k: lc,
        v: mc,
        pa: nc,
        g: oc,
        qa: pc,
        da: qc,
        ha: rc,
        ia: sc,
        na: tc,
        c: uc,
        ka: vc,
        ma: wc,
        aa: xc,
        V: yc,
        $: zc,
        ba: Ac,
        S: Bc,
        U: Cc,
        Z: Dc,
        X: Ec,
        R: Fc,
        q: Gc,
        T: Hc,
        _: Ic,
        o: Jc,
        W: Kc,
        p: Lc,
      },
      V = (function () {
        function a(c) {
          V = c.exports;
          V = Qc();
          ma = V.sa;
          ra();
          hd = V.mf;
          ta.unshift(V.ta);
          xa--;
          d.monitorRunDependencies && d.monitorRunDependencies(xa);
          0 == xa &&
            (null !== ya && (clearInterval(ya), (ya = null)),
            za && ((c = za), (za = null), c()));
          return V;
        }
        var b = { a: qd };
        xa++;
        d.monitorRunDependencies && d.monitorRunDependencies(xa);
        if (d.instantiateWasm)
          try {
            return d.instantiateWasm(b, a);
          } catch (c) {
            r(`Module.instantiateWasm callback failed with error: ${c}`), ba(c);
          }
        Ga(b, function (c) {
          a(c.instance);
        }).catch(ba);
        return {};
      })();
    d._sqlite3_status64 = (a, b, c, e) =>
      (d._sqlite3_status64 = V.ua)(a, b, c, e);
    d._sqlite3_status = (a, b, c, e) => (d._sqlite3_status = V.va)(a, b, c, e);
    d._sqlite3_db_status = (a, b, c, e, f) =>
      (d._sqlite3_db_status = V.wa)(a, b, c, e, f);
    d._sqlite3_msize = (a) => (d._sqlite3_msize = V.xa)(a);
    d._sqlite3_vfs_find = (a) => (d._sqlite3_vfs_find = V.ya)(a);
    d._sqlite3_vfs_register = (a, b) => (d._sqlite3_vfs_register = V.za)(a, b);
    d._sqlite3_vfs_unregister = (a) => (d._sqlite3_vfs_unregister = V.Aa)(a);
    d._sqlite3_release_memory = (a) => (d._sqlite3_release_memory = V.Ba)(a);
    d._sqlite3_soft_heap_limit64 = (a, b) =>
      (d._sqlite3_soft_heap_limit64 = V.Ca)(a, b);
    d._sqlite3_memory_used = () => (d._sqlite3_memory_used = V.Da)();
    d._sqlite3_hard_heap_limit64 = (a, b) =>
      (d._sqlite3_hard_heap_limit64 = V.Ea)(a, b);
    d._sqlite3_memory_highwater = (a) =>
      (d._sqlite3_memory_highwater = V.Fa)(a);
    d._sqlite3_malloc = (a) => (d._sqlite3_malloc = V.Ga)(a);
    d._sqlite3_malloc64 = (a, b) => (d._sqlite3_malloc64 = V.Ha)(a, b);
    d._sqlite3_free = (a) => (d._sqlite3_free = V.Ia)(a);
    d._sqlite3_realloc = (a, b) => (d._sqlite3_realloc = V.Ja)(a, b);
    d._sqlite3_realloc64 = (a, b, c) => (d._sqlite3_realloc64 = V.Ka)(a, b, c);
    d._sqlite3_str_vappendf = (a, b, c) =>
      (d._sqlite3_str_vappendf = V.La)(a, b, c);
    d._sqlite3_str_append = (a, b, c) =>
      (d._sqlite3_str_append = V.Ma)(a, b, c);
    d._sqlite3_str_appendchar = (a, b, c) =>
      (d._sqlite3_str_appendchar = V.Na)(a, b, c);
    d._sqlite3_str_appendall = (a, b) =>
      (d._sqlite3_str_appendall = V.Oa)(a, b);
    d._sqlite3_str_appendf = (a, b, c) =>
      (d._sqlite3_str_appendf = V.Pa)(a, b, c);
    d._sqlite3_str_finish = (a) => (d._sqlite3_str_finish = V.Qa)(a);
    d._sqlite3_str_errcode = (a) => (d._sqlite3_str_errcode = V.Ra)(a);
    d._sqlite3_str_length = (a) => (d._sqlite3_str_length = V.Sa)(a);
    d._sqlite3_str_value = (a) => (d._sqlite3_str_value = V.Ta)(a);
    d._sqlite3_str_reset = (a) => (d._sqlite3_str_reset = V.Ua)(a);
    d._sqlite3_str_new = (a) => (d._sqlite3_str_new = V.Va)(a);
    d._sqlite3_vmprintf = (a, b) => (d._sqlite3_vmprintf = V.Wa)(a, b);
    d._sqlite3_mprintf = (a, b) => (d._sqlite3_mprintf = V.Xa)(a, b);
    d._sqlite3_vsnprintf = (a, b, c, e) =>
      (d._sqlite3_vsnprintf = V.Ya)(a, b, c, e);
    d._sqlite3_snprintf = (a, b, c, e) =>
      (d._sqlite3_snprintf = V.Za)(a, b, c, e);
    d._sqlite3_log = (a, b, c) => (d._sqlite3_log = V._a)(a, b, c);
    d._sqlite3_randomness = (a, b) => (d._sqlite3_randomness = V.$a)(a, b);
    d._sqlite3_stricmp = (a, b) => (d._sqlite3_stricmp = V.ab)(a, b);
    d._sqlite3_strnicmp = (a, b, c) => (d._sqlite3_strnicmp = V.bb)(a, b, c);
    d._sqlite3_os_init = () => (d._sqlite3_os_init = V.cb)();
    d._sqlite3_os_end = () => (d._sqlite3_os_end = V.db)();
    d._sqlite3_serialize = (a, b, c, e) =>
      (d._sqlite3_serialize = V.eb)(a, b, c, e);
    d._sqlite3_prepare_v2 = (a, b, c, e, f) =>
      (d._sqlite3_prepare_v2 = V.fb)(a, b, c, e, f);
    d._sqlite3_step = (a) => (d._sqlite3_step = V.gb)(a);
    d._sqlite3_column_int64 = (a, b) => (d._sqlite3_column_int64 = V.hb)(a, b);
    d._sqlite3_column_int = (a, b) => (d._sqlite3_column_int = V.ib)(a, b);
    d._sqlite3_finalize = (a) => (d._sqlite3_finalize = V.jb)(a);
    d._sqlite3_deserialize = (a, b, c, e, f, h, k, n) =>
      (d._sqlite3_deserialize = V.kb)(a, b, c, e, f, h, k, n);
    d._sqlite3_database_file_object = (a) =>
      (d._sqlite3_database_file_object = V.lb)(a);
    d._sqlite3_backup_init = (a, b, c, e) =>
      (d._sqlite3_backup_init = V.mb)(a, b, c, e);
    d._sqlite3_backup_step = (a, b) => (d._sqlite3_backup_step = V.nb)(a, b);
    d._sqlite3_backup_finish = (a) => (d._sqlite3_backup_finish = V.ob)(a);
    d._sqlite3_backup_remaining = (a) =>
      (d._sqlite3_backup_remaining = V.pb)(a);
    d._sqlite3_backup_pagecount = (a) =>
      (d._sqlite3_backup_pagecount = V.qb)(a);
    d._sqlite3_reset = (a) => (d._sqlite3_reset = V.rb)(a);
    d._sqlite3_clear_bindings = (a) => (d._sqlite3_clear_bindings = V.sb)(a);
    d._sqlite3_value_blob = (a) => (d._sqlite3_value_blob = V.tb)(a);
    d._sqlite3_value_text = (a) => (d._sqlite3_value_text = V.ub)(a);
    d._sqlite3_value_bytes = (a) => (d._sqlite3_value_bytes = V.vb)(a);
    d._sqlite3_value_bytes16 = (a) => (d._sqlite3_value_bytes16 = V.wb)(a);
    d._sqlite3_value_double = (a) => (d._sqlite3_value_double = V.xb)(a);
    d._sqlite3_value_int = (a) => (d._sqlite3_value_int = V.yb)(a);
    d._sqlite3_value_int64 = (a) => (d._sqlite3_value_int64 = V.zb)(a);
    d._sqlite3_value_subtype = (a) => (d._sqlite3_value_subtype = V.Ab)(a);
    d._sqlite3_value_pointer = (a, b) =>
      (d._sqlite3_value_pointer = V.Bb)(a, b);
    d._sqlite3_value_text16 = (a) => (d._sqlite3_value_text16 = V.Cb)(a);
    d._sqlite3_value_text16be = (a) => (d._sqlite3_value_text16be = V.Db)(a);
    d._sqlite3_value_text16le = (a) => (d._sqlite3_value_text16le = V.Eb)(a);
    d._sqlite3_value_type = (a) => (d._sqlite3_value_type = V.Fb)(a);
    d._sqlite3_value_encoding = (a) => (d._sqlite3_value_encoding = V.Gb)(a);
    d._sqlite3_value_nochange = (a) => (d._sqlite3_value_nochange = V.Hb)(a);
    d._sqlite3_value_frombind = (a) => (d._sqlite3_value_frombind = V.Ib)(a);
    d._sqlite3_value_dup = (a) => (d._sqlite3_value_dup = V.Jb)(a);
    d._sqlite3_value_free = (a) => (d._sqlite3_value_free = V.Kb)(a);
    d._sqlite3_result_blob = (a, b, c, e) =>
      (d._sqlite3_result_blob = V.Lb)(a, b, c, e);
    d._sqlite3_result_blob64 = (a, b, c, e, f) =>
      (d._sqlite3_result_blob64 = V.Mb)(a, b, c, e, f);
    d._sqlite3_result_double = (a, b) =>
      (d._sqlite3_result_double = V.Nb)(a, b);
    d._sqlite3_result_error = (a, b, c) =>
      (d._sqlite3_result_error = V.Ob)(a, b, c);
    d._sqlite3_result_error16 = (a, b, c) =>
      (d._sqlite3_result_error16 = V.Pb)(a, b, c);
    d._sqlite3_result_int = (a, b) => (d._sqlite3_result_int = V.Qb)(a, b);
    d._sqlite3_result_int64 = (a, b, c) =>
      (d._sqlite3_result_int64 = V.Rb)(a, b, c);
    d._sqlite3_result_null = (a) => (d._sqlite3_result_null = V.Sb)(a);
    d._sqlite3_result_pointer = (a, b, c, e) =>
      (d._sqlite3_result_pointer = V.Tb)(a, b, c, e);
    d._sqlite3_result_subtype = (a, b) =>
      (d._sqlite3_result_subtype = V.Ub)(a, b);
    d._sqlite3_result_text = (a, b, c, e) =>
      (d._sqlite3_result_text = V.Vb)(a, b, c, e);
    d._sqlite3_result_text64 = (a, b, c, e, f, h) =>
      (d._sqlite3_result_text64 = V.Wb)(a, b, c, e, f, h);
    d._sqlite3_result_text16 = (a, b, c, e) =>
      (d._sqlite3_result_text16 = V.Xb)(a, b, c, e);
    d._sqlite3_result_text16be = (a, b, c, e) =>
      (d._sqlite3_result_text16be = V.Yb)(a, b, c, e);
    d._sqlite3_result_text16le = (a, b, c, e) =>
      (d._sqlite3_result_text16le = V.Zb)(a, b, c, e);
    d._sqlite3_result_value = (a, b) => (d._sqlite3_result_value = V._b)(a, b);
    d._sqlite3_result_error_toobig = (a) =>
      (d._sqlite3_result_error_toobig = V.$b)(a);
    d._sqlite3_result_zeroblob = (a, b) =>
      (d._sqlite3_result_zeroblob = V.ac)(a, b);
    d._sqlite3_result_zeroblob64 = (a, b, c) =>
      (d._sqlite3_result_zeroblob64 = V.bc)(a, b, c);
    d._sqlite3_result_error_code = (a, b) =>
      (d._sqlite3_result_error_code = V.cc)(a, b);
    d._sqlite3_result_error_nomem = (a) =>
      (d._sqlite3_result_error_nomem = V.dc)(a);
    d._sqlite3_user_data = (a) => (d._sqlite3_user_data = V.ec)(a);
    d._sqlite3_context_db_handle = (a) =>
      (d._sqlite3_context_db_handle = V.fc)(a);
    d._sqlite3_vtab_nochange = (a) => (d._sqlite3_vtab_nochange = V.gc)(a);
    d._sqlite3_vtab_in_first = (a, b) =>
      (d._sqlite3_vtab_in_first = V.hc)(a, b);
    d._sqlite3_vtab_in_next = (a, b) => (d._sqlite3_vtab_in_next = V.ic)(a, b);
    d._sqlite3_aggregate_context = (a, b) =>
      (d._sqlite3_aggregate_context = V.jc)(a, b);
    d._sqlite3_get_auxdata = (a, b) => (d._sqlite3_get_auxdata = V.kc)(a, b);
    d._sqlite3_set_auxdata = (a, b, c, e) =>
      (d._sqlite3_set_auxdata = V.lc)(a, b, c, e);
    d._sqlite3_column_count = (a) => (d._sqlite3_column_count = V.mc)(a);
    d._sqlite3_data_count = (a) => (d._sqlite3_data_count = V.nc)(a);
    d._sqlite3_column_blob = (a, b) => (d._sqlite3_column_blob = V.oc)(a, b);
    d._sqlite3_column_bytes = (a, b) => (d._sqlite3_column_bytes = V.pc)(a, b);
    d._sqlite3_column_bytes16 = (a, b) =>
      (d._sqlite3_column_bytes16 = V.qc)(a, b);
    d._sqlite3_column_double = (a, b) =>
      (d._sqlite3_column_double = V.rc)(a, b);
    d._sqlite3_column_text = (a, b) => (d._sqlite3_column_text = V.sc)(a, b);
    d._sqlite3_column_value = (a, b) => (d._sqlite3_column_value = V.tc)(a, b);
    d._sqlite3_column_text16 = (a, b) =>
      (d._sqlite3_column_text16 = V.uc)(a, b);
    d._sqlite3_column_type = (a, b) => (d._sqlite3_column_type = V.vc)(a, b);
    d._sqlite3_column_name = (a, b) => (d._sqlite3_column_name = V.wc)(a, b);
    d._sqlite3_column_name16 = (a, b) =>
      (d._sqlite3_column_name16 = V.xc)(a, b);
    d._sqlite3_bind_blob = (a, b, c, e, f) =>
      (d._sqlite3_bind_blob = V.yc)(a, b, c, e, f);
    d._sqlite3_bind_blob64 = (a, b, c, e, f, h) =>
      (d._sqlite3_bind_blob64 = V.zc)(a, b, c, e, f, h);
    d._sqlite3_bind_double = (a, b, c) =>
      (d._sqlite3_bind_double = V.Ac)(a, b, c);
    d._sqlite3_bind_int = (a, b, c) => (d._sqlite3_bind_int = V.Bc)(a, b, c);
    d._sqlite3_bind_int64 = (a, b, c, e) =>
      (d._sqlite3_bind_int64 = V.Cc)(a, b, c, e);
    d._sqlite3_bind_null = (a, b) => (d._sqlite3_bind_null = V.Dc)(a, b);
    d._sqlite3_bind_pointer = (a, b, c, e, f) =>
      (d._sqlite3_bind_pointer = V.Ec)(a, b, c, e, f);
    d._sqlite3_bind_text = (a, b, c, e, f) =>
      (d._sqlite3_bind_text = V.Fc)(a, b, c, e, f);
    d._sqlite3_bind_text64 = (a, b, c, e, f, h, k) =>
      (d._sqlite3_bind_text64 = V.Gc)(a, b, c, e, f, h, k);
    d._sqlite3_bind_text16 = (a, b, c, e, f) =>
      (d._sqlite3_bind_text16 = V.Hc)(a, b, c, e, f);
    d._sqlite3_bind_value = (a, b, c) =>
      (d._sqlite3_bind_value = V.Ic)(a, b, c);
    d._sqlite3_bind_zeroblob = (a, b, c) =>
      (d._sqlite3_bind_zeroblob = V.Jc)(a, b, c);
    d._sqlite3_bind_zeroblob64 = (a, b, c, e) =>
      (d._sqlite3_bind_zeroblob64 = V.Kc)(a, b, c, e);
    d._sqlite3_bind_parameter_count = (a) =>
      (d._sqlite3_bind_parameter_count = V.Lc)(a);
    d._sqlite3_bind_parameter_name = (a, b) =>
      (d._sqlite3_bind_parameter_name = V.Mc)(a, b);
    d._sqlite3_bind_parameter_index = (a, b) =>
      (d._sqlite3_bind_parameter_index = V.Nc)(a, b);
    d._sqlite3_db_handle = (a) => (d._sqlite3_db_handle = V.Oc)(a);
    d._sqlite3_stmt_readonly = (a) => (d._sqlite3_stmt_readonly = V.Pc)(a);
    d._sqlite3_stmt_isexplain = (a) => (d._sqlite3_stmt_isexplain = V.Qc)(a);
    d._sqlite3_stmt_explain = (a, b) => (d._sqlite3_stmt_explain = V.Rc)(a, b);
    d._sqlite3_stmt_busy = (a) => (d._sqlite3_stmt_busy = V.Sc)(a);
    d._sqlite3_next_stmt = (a, b) => (d._sqlite3_next_stmt = V.Tc)(a, b);
    d._sqlite3_stmt_status = (a, b, c) =>
      (d._sqlite3_stmt_status = V.Uc)(a, b, c);
    d._sqlite3_sql = (a) => (d._sqlite3_sql = V.Vc)(a);
    d._sqlite3_expanded_sql = (a) => (d._sqlite3_expanded_sql = V.Wc)(a);
    d._sqlite3_value_numeric_type = (a) =>
      (d._sqlite3_value_numeric_type = V.Xc)(a);
    d._sqlite3_blob_open = (a, b, c, e, f, h, k, n) =>
      (d._sqlite3_blob_open = V.Yc)(a, b, c, e, f, h, k, n);
    d._sqlite3_blob_close = (a) => (d._sqlite3_blob_close = V.Zc)(a);
    d._sqlite3_blob_read = (a, b, c, e) =>
      (d._sqlite3_blob_read = V._c)(a, b, c, e);
    d._sqlite3_blob_write = (a, b, c, e) =>
      (d._sqlite3_blob_write = V.$c)(a, b, c, e);
    d._sqlite3_blob_bytes = (a) => (d._sqlite3_blob_bytes = V.ad)(a);
    d._sqlite3_blob_reopen = (a, b, c) =>
      (d._sqlite3_blob_reopen = V.bd)(a, b, c);
    d._sqlite3_set_authorizer = (a, b, c) =>
      (d._sqlite3_set_authorizer = V.cd)(a, b, c);
    d._sqlite3_strglob = (a, b) => (d._sqlite3_strglob = V.dd)(a, b);
    d._sqlite3_strlike = (a, b, c) => (d._sqlite3_strlike = V.ed)(a, b, c);
    d._sqlite3_exec = (a, b, c, e, f) =>
      (d._sqlite3_exec = V.fd)(a, b, c, e, f);
    d._sqlite3_errmsg = (a) => (d._sqlite3_errmsg = V.gd)(a);
    d._sqlite3_auto_extension = (a) => (d._sqlite3_auto_extension = V.hd)(a);
    d._sqlite3_cancel_auto_extension = (a) =>
      (d._sqlite3_cancel_auto_extension = V.id)(a);
    d._sqlite3_reset_auto_extension = () =>
      (d._sqlite3_reset_auto_extension = V.jd)();
    d._sqlite3_prepare = (a, b, c, e, f) =>
      (d._sqlite3_prepare = V.kd)(a, b, c, e, f);
    d._sqlite3_prepare_v3 = (a, b, c, e, f, h) =>
      (d._sqlite3_prepare_v3 = V.ld)(a, b, c, e, f, h);
    d._sqlite3_prepare16 = (a, b, c, e, f) =>
      (d._sqlite3_prepare16 = V.md)(a, b, c, e, f);
    d._sqlite3_prepare16_v2 = (a, b, c, e, f) =>
      (d._sqlite3_prepare16_v2 = V.nd)(a, b, c, e, f);
    d._sqlite3_prepare16_v3 = (a, b, c, e, f, h) =>
      (d._sqlite3_prepare16_v3 = V.od)(a, b, c, e, f, h);
    d._sqlite3_get_table = (a, b, c, e, f, h) =>
      (d._sqlite3_get_table = V.pd)(a, b, c, e, f, h);
    d._sqlite3_free_table = (a) => (d._sqlite3_free_table = V.qd)(a);
    d._sqlite3_create_module = (a, b, c, e) =>
      (d._sqlite3_create_module = V.rd)(a, b, c, e);
    d._sqlite3_create_module_v2 = (a, b, c, e, f) =>
      (d._sqlite3_create_module_v2 = V.sd)(a, b, c, e, f);
    d._sqlite3_drop_modules = (a, b) => (d._sqlite3_drop_modules = V.td)(a, b);
    d._sqlite3_declare_vtab = (a, b) => (d._sqlite3_declare_vtab = V.ud)(a, b);
    d._sqlite3_vtab_on_conflict = (a) =>
      (d._sqlite3_vtab_on_conflict = V.vd)(a);
    d._sqlite3_vtab_config = (a, b, c) =>
      (d._sqlite3_vtab_config = V.wd)(a, b, c);
    d._sqlite3_vtab_collation = (a, b) =>
      (d._sqlite3_vtab_collation = V.xd)(a, b);
    d._sqlite3_vtab_in = (a, b, c) => (d._sqlite3_vtab_in = V.yd)(a, b, c);
    d._sqlite3_vtab_rhs_value = (a, b, c) =>
      (d._sqlite3_vtab_rhs_value = V.zd)(a, b, c);
    d._sqlite3_vtab_distinct = (a) => (d._sqlite3_vtab_distinct = V.Ad)(a);
    d._sqlite3_keyword_name = (a, b, c) =>
      (d._sqlite3_keyword_name = V.Bd)(a, b, c);
    d._sqlite3_keyword_count = () => (d._sqlite3_keyword_count = V.Cd)();
    d._sqlite3_keyword_check = (a, b) =>
      (d._sqlite3_keyword_check = V.Dd)(a, b);
    d._sqlite3_complete = (a) => (d._sqlite3_complete = V.Ed)(a);
    d._sqlite3_complete16 = (a) => (d._sqlite3_complete16 = V.Fd)(a);
    d._sqlite3_libversion = () => (d._sqlite3_libversion = V.Gd)();
    d._sqlite3_libversion_number = () =>
      (d._sqlite3_libversion_number = V.Hd)();
    d._sqlite3_threadsafe = () => (d._sqlite3_threadsafe = V.Id)();
    d._sqlite3_initialize = () => (d._sqlite3_initialize = V.Jd)();
    d._sqlite3_shutdown = () => (d._sqlite3_shutdown = V.Kd)();
    d._sqlite3_config = (a, b) => (d._sqlite3_config = V.Ld)(a, b);
    d._sqlite3_db_mutex = (a) => (d._sqlite3_db_mutex = V.Md)(a);
    d._sqlite3_db_release_memory = (a) =>
      (d._sqlite3_db_release_memory = V.Nd)(a);
    d._sqlite3_db_cacheflush = (a) => (d._sqlite3_db_cacheflush = V.Od)(a);
    d._sqlite3_db_config = (a, b, c) => (d._sqlite3_db_config = V.Pd)(a, b, c);
    d._sqlite3_last_insert_rowid = (a) =>
      (d._sqlite3_last_insert_rowid = V.Qd)(a);
    d._sqlite3_set_last_insert_rowid = (a, b, c) =>
      (d._sqlite3_set_last_insert_rowid = V.Rd)(a, b, c);
    d._sqlite3_changes64 = (a) => (d._sqlite3_changes64 = V.Sd)(a);
    d._sqlite3_changes = (a) => (d._sqlite3_changes = V.Td)(a);
    d._sqlite3_total_changes64 = (a) => (d._sqlite3_total_changes64 = V.Ud)(a);
    d._sqlite3_total_changes = (a) => (d._sqlite3_total_changes = V.Vd)(a);
    d._sqlite3_txn_state = (a, b) => (d._sqlite3_txn_state = V.Wd)(a, b);
    d._sqlite3_close = (a) => (d._sqlite3_close = V.Xd)(a);
    d._sqlite3_close_v2 = (a) => (d._sqlite3_close_v2 = V.Yd)(a);
    d._sqlite3_busy_handler = (a, b, c) =>
      (d._sqlite3_busy_handler = V.Zd)(a, b, c);
    d._sqlite3_progress_handler = (a, b, c, e) =>
      (d._sqlite3_progress_handler = V._d)(a, b, c, e);
    d._sqlite3_busy_timeout = (a, b) => (d._sqlite3_busy_timeout = V.$d)(a, b);
    d._sqlite3_interrupt = (a) => (d._sqlite3_interrupt = V.ae)(a);
    d._sqlite3_is_interrupted = (a) => (d._sqlite3_is_interrupted = V.be)(a);
    d._sqlite3_create_function = (a, b, c, e, f, h, k, n) =>
      (d._sqlite3_create_function = V.ce)(a, b, c, e, f, h, k, n);
    d._sqlite3_create_function_v2 = (a, b, c, e, f, h, k, n, l) =>
      (d._sqlite3_create_function_v2 = V.de)(a, b, c, e, f, h, k, n, l);
    d._sqlite3_create_window_function = (a, b, c, e, f, h, k, n, l, m) =>
      (d._sqlite3_create_window_function = V.ee)(a, b, c, e, f, h, k, n, l, m);
    d._sqlite3_create_function16 = (a, b, c, e, f, h, k, n) =>
      (d._sqlite3_create_function16 = V.fe)(a, b, c, e, f, h, k, n);
    d._sqlite3_overload_function = (a, b, c) =>
      (d._sqlite3_overload_function = V.ge)(a, b, c);
    d._sqlite3_trace_v2 = (a, b, c, e) =>
      (d._sqlite3_trace_v2 = V.he)(a, b, c, e);
    d._sqlite3_commit_hook = (a, b, c) =>
      (d._sqlite3_commit_hook = V.ie)(a, b, c);
    d._sqlite3_update_hook = (a, b, c) =>
      (d._sqlite3_update_hook = V.je)(a, b, c);
    d._sqlite3_rollback_hook = (a, b, c) =>
      (d._sqlite3_rollback_hook = V.ke)(a, b, c);
    d._sqlite3_autovacuum_pages = (a, b, c, e) =>
      (d._sqlite3_autovacuum_pages = V.le)(a, b, c, e);
    d._sqlite3_wal_autocheckpoint = (a, b) =>
      (d._sqlite3_wal_autocheckpoint = V.me)(a, b);
    d._sqlite3_wal_hook = (a, b, c) => (d._sqlite3_wal_hook = V.ne)(a, b, c);
    d._sqlite3_wal_checkpoint_v2 = (a, b, c, e, f) =>
      (d._sqlite3_wal_checkpoint_v2 = V.oe)(a, b, c, e, f);
    d._sqlite3_wal_checkpoint = (a, b) =>
      (d._sqlite3_wal_checkpoint = V.pe)(a, b);
    d._sqlite3_error_offset = (a) => (d._sqlite3_error_offset = V.qe)(a);
    d._sqlite3_errmsg16 = (a) => (d._sqlite3_errmsg16 = V.re)(a);
    d._sqlite3_errcode = (a) => (d._sqlite3_errcode = V.se)(a);
    d._sqlite3_extended_errcode = (a) =>
      (d._sqlite3_extended_errcode = V.te)(a);
    d._sqlite3_system_errno = (a) => (d._sqlite3_system_errno = V.ue)(a);
    d._sqlite3_errstr = (a) => (d._sqlite3_errstr = V.ve)(a);
    d._sqlite3_limit = (a, b, c) => (d._sqlite3_limit = V.we)(a, b, c);
    d._sqlite3_open = (a, b) => (d._sqlite3_open = V.xe)(a, b);
    d._sqlite3_open_v2 = (a, b, c, e) =>
      (d._sqlite3_open_v2 = V.ye)(a, b, c, e);
    d._sqlite3_open16 = (a, b) => (d._sqlite3_open16 = V.ze)(a, b);
    d._sqlite3_create_collation = (a, b, c, e, f) =>
      (d._sqlite3_create_collation = V.Ae)(a, b, c, e, f);
    d._sqlite3_create_collation_v2 = (a, b, c, e, f, h) =>
      (d._sqlite3_create_collation_v2 = V.Be)(a, b, c, e, f, h);
    d._sqlite3_create_collation16 = (a, b, c, e, f) =>
      (d._sqlite3_create_collation16 = V.Ce)(a, b, c, e, f);
    d._sqlite3_collation_needed = (a, b, c) =>
      (d._sqlite3_collation_needed = V.De)(a, b, c);
    d._sqlite3_collation_needed16 = (a, b, c) =>
      (d._sqlite3_collation_needed16 = V.Ee)(a, b, c);
    d._sqlite3_get_clientdata = (a, b) =>
      (d._sqlite3_get_clientdata = V.Fe)(a, b);
    d._sqlite3_set_clientdata = (a, b, c, e) =>
      (d._sqlite3_set_clientdata = V.Ge)(a, b, c, e);
    d._sqlite3_get_autocommit = (a) => (d._sqlite3_get_autocommit = V.He)(a);
    d._sqlite3_table_column_metadata = (a, b, c, e, f, h, k, n, l) =>
      (d._sqlite3_table_column_metadata = V.Ie)(a, b, c, e, f, h, k, n, l);
    d._sqlite3_sleep = (a) => (d._sqlite3_sleep = V.Je)(a);
    d._sqlite3_extended_result_codes = (a, b) =>
      (d._sqlite3_extended_result_codes = V.Ke)(a, b);
    d._sqlite3_file_control = (a, b, c, e) =>
      (d._sqlite3_file_control = V.Le)(a, b, c, e);
    d._sqlite3_test_control = (a, b) => (d._sqlite3_test_control = V.Me)(a, b);
    d._sqlite3_create_filename = (a, b, c, e, f) =>
      (d._sqlite3_create_filename = V.Ne)(a, b, c, e, f);
    d._sqlite3_free_filename = (a) => (d._sqlite3_free_filename = V.Oe)(a);
    d._sqlite3_uri_parameter = (a, b) =>
      (d._sqlite3_uri_parameter = V.Pe)(a, b);
    d._sqlite3_uri_key = (a, b) => (d._sqlite3_uri_key = V.Qe)(a, b);
    d._sqlite3_uri_boolean = (a, b, c) =>
      (d._sqlite3_uri_boolean = V.Re)(a, b, c);
    d._sqlite3_uri_int64 = (a, b, c, e) =>
      (d._sqlite3_uri_int64 = V.Se)(a, b, c, e);
    d._sqlite3_filename_database = (a) =>
      (d._sqlite3_filename_database = V.Te)(a);
    d._sqlite3_filename_journal = (a) =>
      (d._sqlite3_filename_journal = V.Ue)(a);
    d._sqlite3_filename_wal = (a) => (d._sqlite3_filename_wal = V.Ve)(a);
    d._sqlite3_db_name = (a, b) => (d._sqlite3_db_name = V.We)(a, b);
    d._sqlite3_db_filename = (a, b) => (d._sqlite3_db_filename = V.Xe)(a, b);
    d._sqlite3_db_readonly = (a, b) => (d._sqlite3_db_readonly = V.Ye)(a, b);
    d._sqlite3_compileoption_used = (a) =>
      (d._sqlite3_compileoption_used = V.Ze)(a);
    d._sqlite3_compileoption_get = (a) =>
      (d._sqlite3_compileoption_get = V._e)(a);
    d._sqlite3_sourceid = () => (d._sqlite3_sourceid = V.$e)();
    var pd = () => (pd = V.af)(),
      Vb = (d._malloc = (a) => (Vb = d._malloc = V.bf)(a)),
      ed = (d._free = (a) => (ed = d._free = V.cf)(a));
    d._RegisterExtensionFunctions = (a) =>
      (d._RegisterExtensionFunctions = V.df)(a);
    d._set_authorizer = (a) => (d._set_authorizer = V.ef)(a);
    d._create_function = (a, b, c, e, f, h) =>
      (d._create_function = V.ff)(a, b, c, e, f, h);
    d._create_module = (a, b, c, e) => (d._create_module = V.gf)(a, b, c, e);
    d._progress_handler = (a, b) => (d._progress_handler = V.hf)(a, b);
    d._register_vfs = (a, b, c, e) => (d._register_vfs = V.jf)(a, b, c, e);
    d._getSqliteFree = () => (d._getSqliteFree = V.kf)();
    var rd = (d._main = (a, b) => (rd = d._main = V.lf)(a, b)),
      fb = (a, b) => (fb = V.nf)(a, b),
      sd = () => (sd = V.of)(),
      nd = () => (nd = V.pf)(),
      ld = (a) => (ld = V.qf)(a),
      md = (a) => (md = V.rf)(a),
      cd = (a) => (cd = V.sf)(a),
      Sc = () => (Sc = V.tf)(),
      bd = (a) => (bd = V.uf)(a),
      dd = () => (dd = V.vf)();
    d._sqlite3_version = 3232;
    d.getTempRet0 = sd;
    d.ccall = Z;
    d.cwrap = (a, b, c, e) => {
      var f = !c || c.every((h) => "number" === h || "boolean" === h);
      return "string" !== b && f && !e
        ? d["_" + a]
        : function () {
            return Z(a, b, c, arguments, e);
          };
    };
    d.addFunction = (a, b) => {
      if (!jd) {
        jd = new WeakMap();
        var c = hd.length;
        if (jd)
          for (var e = 0; e < 0 + c; e++) {
            var f = hd.get(e);
            f && jd.set(f, e);
          }
      }
      if ((c = jd.get(a) || 0)) return c;
      if (kd.length) c = kd.pop();
      else {
        try {
          hd.grow(1);
        } catch (n) {
          if (!(n instanceof RangeError)) throw n;
          throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
        }
        c = hd.length - 1;
      }
      try {
        hd.set(c, a);
      } catch (n) {
        if (!(n instanceof TypeError)) throw n;
        if ("function" == typeof WebAssembly.Function) {
          e = WebAssembly.Function;
          f = {
            i: "i32",
            j: "i64",
            f: "f32",
            d: "f64",
            e: "externref",
            p: "i32",
          };
          for (
            var h = { parameters: [], results: "v" == b[0] ? [] : [f[b[0]]] },
              k = 1;
            k < b.length;
            ++k
          )
            h.parameters.push(f[b[k]]);
          b = new e(h, a);
        } else {
          e = [1];
          f = b.slice(0, 1);
          b = b.slice(1);
          h = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 };
          e.push(96);
          k = b.length;
          128 > k ? e.push(k) : e.push((k % 128) | 128, k >> 7);
          for (k = 0; k < b.length; ++k) e.push(h[b[k]]);
          "v" == f ? e.push(0) : e.push(1, h[f]);
          b = [0, 97, 115, 109, 1, 0, 0, 0, 1];
          f = e.length;
          128 > f ? b.push(f) : b.push((f % 128) | 128, f >> 7);
          b.push.apply(b, e);
          b.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
          b = new WebAssembly.Module(new Uint8Array(b));
          b = new WebAssembly.Instance(b, { e: { f: a } }).exports.f;
        }
        hd.set(c, b);
      }
      jd.set(a, c);
      return c;
    };
    d.setValue = J;
    d.getValue = H;
    d.UTF8ToString = (a, b) => (a ? K(x, a, b) : "");
    d.stringToUTF8 = (a, b, c) => Ta(a, x, b, c);
    d.lengthBytesUTF8 = Sa;
    d.intArrayFromString = Ua;
    d.intArrayToString = function (a) {
      for (var b = [], c = 0; c < a.length; c++) {
        var e = a[c];
        255 < e && (e &= 255);
        b.push(String.fromCharCode(e));
      }
      return b.join("");
    };
    d.AsciiToString = (a) => {
      for (var b = ""; ; ) {
        var c = x[a++ >> 0];
        if (!c) return b;
        b += String.fromCharCode(c);
      }
    };
    d.UTF16ToString = (a, b) => {
      var c = a >> 1;
      for (var e = c + b / 2; !(c >= e) && oa[c]; ) ++c;
      c <<= 1;
      if (32 < c - a && od) return od.decode(x.subarray(a, c));
      c = "";
      for (e = 0; !(e >= b / 2); ++e) {
        var f = z[(a + 2 * e) >> 1];
        if (0 == f) break;
        c += String.fromCharCode(f);
      }
      return c;
    };
    d.stringToUTF16 = (a, b, c) => {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var e = b;
      c = c < 2 * a.length ? c / 2 : a.length;
      for (var f = 0; f < c; ++f) (z[b >> 1] = a.charCodeAt(f)), (b += 2);
      z[b >> 1] = 0;
      return b - e;
    };
    d.UTF32ToString = (a, b) => {
      for (var c = 0, e = ""; !(c >= b / 4); ) {
        var f = A[(a + 4 * c) >> 2];
        if (0 == f) break;
        ++c;
        65536 <= f
          ? ((f -= 65536),
            (e += String.fromCharCode(55296 | (f >> 10), 56320 | (f & 1023))))
          : (e += String.fromCharCode(f));
      }
      return e;
    };
    d.stringToUTF32 = (a, b, c) => {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var e = b;
      c = e + c - 4;
      for (var f = 0; f < a.length; ++f) {
        var h = a.charCodeAt(f);
        if (55296 <= h && 57343 >= h) {
          var k = a.charCodeAt(++f);
          h = (65536 + ((h & 1023) << 10)) | (k & 1023);
        }
        A[b >> 2] = h;
        b += 4;
        if (b + 4 > c) break;
      }
      A[b >> 2] = 0;
      return b - e;
    };
    d.writeArrayToMemory = (a, b) => {
      w.set(a, b);
    };
    var td;
    za = function ud() {
      td || vd();
      td || (za = ud);
    };
    function vd() {
      function a() {
        if (!td && ((td = !0), (d.calledRun = !0), !v)) {
          d.noFSInit ||
            Lb ||
            ((Lb = !0),
            Kb(),
            (d.stdin = d.stdin),
            (d.stdout = d.stdout),
            (d.stderr = d.stderr),
            d.stdin ? Mb("stdin", d.stdin) : Bb("/dev/tty", "/dev/stdin"),
            d.stdout
              ? Mb("stdout", null, d.stdout)
              : Bb("/dev/tty", "/dev/stdout"),
            d.stderr
              ? Mb("stderr", null, d.stderr)
              : Bb("/dev/tty1", "/dev/stderr"),
            Hb("/dev/stdin", 0),
            Hb("/dev/stdout", 1),
            Hb("/dev/stderr", 1));
          lb = !1;
          Ia(ta);
          Ia(ua);
          aa(d);
          if (d.onRuntimeInitialized) d.onRuntimeInitialized();
          if (wd) {
            var b = rd;
            try {
              var c = b(0, 0);
              na = c;
              Nc(c);
            } catch (e) {
              Oc(e);
            }
          }
          if (d.postRun)
            for (
              "function" == typeof d.postRun && (d.postRun = [d.postRun]);
              d.postRun.length;
            )
              (b = d.postRun.shift()), va.unshift(b);
          Ia(va);
        }
      }
      if (!(0 < xa)) {
        if (d.preRun)
          for (
            "function" == typeof d.preRun && (d.preRun = [d.preRun]);
            d.preRun.length;
          )
            wa();
        Ia(sa);
        0 < xa ||
          (d.setStatus
            ? (d.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  d.setStatus("");
                }, 1);
                a();
              }, 1))
            : a());
      }
    }
    if (d.preInit)
      for (
        "function" == typeof d.preInit && (d.preInit = [d.preInit]);
        0 < d.preInit.length;
      )
        d.preInit.pop()();
    var wd = !0;
    d.noInitialRun && (wd = !1);
    vd();

    return moduleArg.ready;
  };
})();
export default Module;
