var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _0x2d04b7 = _0x496e;
(function(_0x5076a3, _0x39fd72) {
  const _0x12f68b = _0x496e, _0x39212e = _0x5076a3();
  while (!![]) {
    try {
      const _0x403b05 = -parseInt(_0x12f68b(374)) / 1 + -parseInt(_0x12f68b(345)) / 2 + parseInt(_0x12f68b(337)) / 3 * (-parseInt(_0x12f68b(356)) / 4) + -parseInt(_0x12f68b(328)) / 5 + parseInt(_0x12f68b(325)) / 6 * (-parseInt(_0x12f68b(324)) / 7) + parseInt(_0x12f68b(375)) / 8 + parseInt(_0x12f68b(368)) / 9;
      if (_0x403b05 === _0x39fd72)
        break;
      else
        _0x39212e["push"](_0x39212e["shift"]());
    } catch (_0x555243) {
      _0x39212e["push"](_0x39212e["shift"]());
    }
  }
})(_0x39aa, 165560);
var __async2 = (_0x3b000f, _0x6b952b, _0x285023) => {
  return new Promise((_0x4983ee, _0xc561fb) => {
    const _0x387399 = _0x496e;
    var _0x51942c = (_0x6d4c8c) => {
      const _0x4b04c8 = _0x496e;
      try {
        _0x2ad414(_0x285023[_0x4b04c8(367)](_0x6d4c8c));
      } catch (_0x203eba) {
        _0xc561fb(_0x203eba);
      }
    }, _0x18eb73 = (_0x383366) => {
      const _0x59aa14 = _0x496e;
      try {
        _0x2ad414(_0x285023[_0x59aa14(344)](_0x383366));
      } catch (_0xe29812) {
        _0xc561fb(_0xe29812);
      }
    }, _0x2ad414 = (_0x291a99) => _0x291a99[_0x387399(330)] ? _0x4983ee(_0x291a99[_0x387399(339)]) : Promise["resolve"](_0x291a99["value"])[_0x387399(347)](_0x51942c, _0x18eb73);
    _0x2ad414((_0x285023 = _0x285023[_0x387399(369)](_0x3b000f, _0x6b952b))[_0x387399(367)]());
  });
};
console[_0x2d04b7(333)](_0x2d04b7(349));
var TMDB_API_KEY = "1865f43a0549ca50d341dd9ab8b29f49", DAHMER_MOVIES_API = _0x2d04b7(357);
function makeRequest(_0x30119a) {
  return __async2(this, null, function* () {
    const _0xa81022 = _0x496e;
    try {
      let u = _0x30119a.replace("api.tmdb.org", "api.tmdb.org");
      return yield fetch(u, { "headers": { "User-Agent": _0xa81022(355) } });
    } catch (_0x3c2474) {
      return { "ok": ![] };
    }
  });
}
function resolveFinalUrl(_0x627e34) {
  return __async2(this, null, function* () {
    const _0x6078ab = _0x496e;
    let _0x3fb108 = _0x627e34;
    _0x627e34[_0x6078ab(329)](_0x6078ab(340)) && (_0x3fb108 = decodeURIComponent(_0x627e34[_0x6078ab(366)]("u=")[1]));
    try {
      const _0x3bf089 = yield fetch(_0x3fb108, { "method": _0x6078ab(332), "redirect": _0x6078ab(350), "headers": { "User-Agent": _0x6078ab(372), "Referer": DAHMER_MOVIES_API + "/" } });
      return _0x3bf089[_0x6078ab(348)];
    } catch (_0xb659b3) {
      return _0x3fb108;
    }
  });
}
function parseLinks(_0x26f757) {
  const _0x19ef35 = _0x2d04b7, _0x5eb3f4 = [], _0x51fc2a = new RegExp(_0x19ef35(338), "gis");
  let _0x169d05;
  while ((_0x169d05 = _0x51fc2a[_0x19ef35(362)](_0x26f757)) !== null) {
    const _0x39826c = _0x169d05[1], _0x51945a = _0x39826c[_0x19ef35(378)](/<a[^>]*href=["']([^"']*)["'][^>]*>([^<]*)<\/a>/i);
    if (_0x51945a) {
      const _0x3d7834 = _0x51945a[1], _0x20c39e = _0x51945a[2][_0x19ef35(341)]();
      _0x20c39e && _0x3d7834 !== _0x19ef35(359) && /\.(mkv|mp4|avi|webm)$/i["test"](_0x20c39e) && _0x5eb3f4["push"]({ "text": _0x20c39e, "href": _0x3d7834 });
    }
  }
  return _0x5eb3f4;
}
function invokeDahmerMovies(_0x192091, _0xd66db5, _0x494e3e = null, _0x5a3aa2 = null) {
  return __async2(this, null, function* () {
    const _0x24af47 = _0x496e, _0x1f47e4 = _0x192091[_0x24af47(358)](/:/g, ""), _0x337327 = _0x494e3e !== null ? [_0x24af47(346) + encodeURIComponent(_0x1f47e4) + _0x24af47(351) + (_0x494e3e < 10 ? "0" + _0x494e3e : _0x494e3e) + "/", "/tvs/" + encodeURIComponent(_0x1f47e4) + _0x24af47(351) + _0x494e3e + "/"] : ["/movies/" + encodeURIComponent(_0x1f47e4 + " (" + _0xd66db5 + ")") + "/"];
    let _0x515d71 = "", _0x664bb5 = "";
    for (const _0x132250 of _0x337327) {
      const _0x2bb293 = DAHMER_MOVIES_API + _0x132250, _0x397254 = yield makeRequest(_0x2bb293);
      if (_0x397254["ok"]) {
        _0x515d71 = yield _0x397254[_0x24af47(342)](), _0x664bb5 = _0x2bb293;
        break;
      }
    }
    if (!_0x515d71)
      return [];
    const _0x11d018 = parseLinks(_0x515d71);
    let _0x777c46 = _0x11d018;
    if (_0x494e3e !== null && _0x5a3aa2 !== null) {
      const _0x1cf256 = _0x5a3aa2 < 10 ? "0" + _0x5a3aa2 : _0x5a3aa2, _0x3bbd1a = new RegExp("E" + _0x1cf256 + "|E" + _0x5a3aa2, "i");
      _0x777c46 = _0x11d018[_0x24af47(365)]((_0x2f6fd5) => _0x3bbd1a["test"](_0x2f6fd5[_0x24af47(342)]));
    }
    const _0x26a508 = _0x777c46["sort"]((_0x419f63, _0x31c5b6) => {
      const _0x1a5cad = _0x24af47, _0x40fb2c = /2160p|4k/i["test"](_0x419f63[_0x1a5cad(342)]), _0x342460 = /2160p|4k/i[_0x1a5cad(361)](_0x31c5b6[_0x1a5cad(342)]);
      return _0x342460 - _0x40fb2c;
    }), _0x9bc5c9 = [];
    for (const _0x592ff6 of _0x26a508[_0x24af47(373)](0, 5)) {
      let _0x280393;
      if (_0x592ff6["href"][_0x24af47(360)]("http"))
        _0x280393 = _0x592ff6[_0x24af47(331)];
      else
        _0x592ff6[_0x24af47(331)][_0x24af47(329)](_0x24af47(379)) || _0x592ff6[_0x24af47(331)][_0x24af47(329)](_0x24af47(346)) ? _0x280393 = DAHMER_MOVIES_API + (_0x592ff6[_0x24af47(331)][_0x24af47(360)]("/") ? "" : "/") + _0x592ff6[_0x24af47(331)] : _0x280393 = _0x664bb5 + _0x592ff6["href"];
      _0x280393 = _0x280393[_0x24af47(358)](/([^:]\/)\/+/g, "$1");
      const _0x46f628 = yield resolveFinalUrl(_0x280393);
      _0x9bc5c9[_0x24af47(354)]({ "name": _0x24af47(326), "title": _0x592ff6["text"], "url": _0x46f628, "quality": /2160p|4k/i[_0x24af47(361)](_0x592ff6["text"]) ? _0x24af47(380) : _0x24af47(327), "headers": { "User-Agent": _0x24af47(372), "Referer": DAHMER_MOVIES_API + "/", "Range": _0x24af47(336) }, "provider": _0x24af47(376) });
    }
    return _0x9bc5c9;
  });
}
function _0x496e(_0x50604e, _0xc1f6bb) {
  _0x50604e = _0x50604e - 324;
  const _0x39aa64 = _0x39aa();
  let _0x496e7c = _0x39aa64[_0x50604e];
  if (_0x496e["DVuJgC"] === void 0) {
    var _0x5d39d7 = function(_0x3663ff) {
      const _0x1a3d11 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
      let _0x3b000f = "", _0x6b952b = "";
      for (let _0x285023 = 0, _0x4983ee, _0xc561fb, _0x51942c = 0; _0xc561fb = _0x3663ff["charAt"](_0x51942c++); ~_0xc561fb && (_0x4983ee = _0x285023 % 4 ? _0x4983ee * 64 + _0xc561fb : _0xc561fb, _0x285023++ % 4) ? _0x3b000f += String["fromCharCode"](255 & _0x4983ee >> (-2 * _0x285023 & 6)) : 0) {
        _0xc561fb = _0x1a3d11["indexOf"](_0xc561fb);
      }
      for (let _0x18eb73 = 0, _0x2ad414 = _0x3b000f["length"]; _0x18eb73 < _0x2ad414; _0x18eb73++) {
        _0x6b952b += "%" + ("00" + _0x3b000f["charCodeAt"](_0x18eb73)["toString"](16))["slice"](-2);
      }
      return decodeURIComponent(_0x6b952b);
    };
    _0x496e["ModTYJ"] = _0x5d39d7, _0x496e["OzmMUG"] = {}, _0x496e["DVuJgC"] = !![];
  }
  const _0x561694 = _0x39aa64[0], _0x25d3ae = _0x50604e + _0x561694, _0x344d51 = _0x496e["OzmMUG"][_0x25d3ae];
  return !_0x344d51 ? (_0x496e7c = _0x496e["ModTYJ"](_0x496e7c), _0x496e["OzmMUG"][_0x25d3ae] = _0x496e7c) : _0x496e7c = _0x344d51, _0x496e7c;
}
function getStreams(_0x1e74c7, _0x4e7a14 = "movie", _0x479f09 = null, _0x21c0c7 = null) {
  return __async2(this, null, function* () {
    const _0x46a367 = _0x496e;
    var _0x2ae1e9;
    try {
      const _0x2ce8eb = _0x4e7a14 === "tv" ? "tv" : _0x46a367(370), _0x10adb0 = "https://api.tmdb.org/3/" + _0x2ce8eb + "/" + _0x1e74c7 + _0x46a367(363) + TMDB_API_KEY, _0x55b796 = yield makeRequest(_0x10adb0), _0x1fc166 = yield _0x55b796[_0x46a367(335)](), _0x4720c9 = _0x4e7a14 === "tv" ? _0x1fc166["name"] : _0x1fc166[_0x46a367(371)], _0x5989ac = (_0x2ae1e9 = _0x4e7a14 === "tv" ? _0x1fc166[_0x46a367(343)] : _0x1fc166["release_date"]) == null ? void 0 : _0x2ae1e9[_0x46a367(352)](0, 4);
      if (!_0x4720c9)
        return [];
      return yield invokeDahmerMovies(_0x4720c9, _0x5989ac, _0x479f09, _0x21c0c7);
    } catch (_0x3e51b0) {
      return [];
    }
  });
}
function _0x39aa() {
  const _0x5200e5 = ["Bwf0y2G", "l21VDMLLCY8", "mJe2mha", "mtr5rhfHrhC", "ndq4nJy4yKDNu1vt", "rgfOBwvYtw92AwvZ", "mta4mha", "mti0nZu2me5izLDcAa", "Aw5JBhvKzxm", "zg9Uzq", "AhjLzG", "sevbra", "Bg9N", "ndm5yZq3oge3nZfMmZvJmduWmJjMowzLywjJy2eWmwm", "ANnVBG", "yNL0zxm9mc0", "nJbtEgv2zuq", "phrYw14+xsO+kc4QpYK8xc90CJ4", "DMfSDwu", "l2j1BgS/Dt0", "DhjPBq", "Dgv4Da", "zMLYC3rFywLYx2rHDgu", "DgHYB3C", "ntuZntiYDNLoyvLm", "l3r2CY8", "DgHLBG", "DxjS", "w0rHAg1LCK1VDMLLC10Gsw5PDgLHBgL6Aw5NifnJCMfWzxi", "zM9SBg93", "l1nLyxnVBIuYma", "C3vIC3rYAw5N", "z2v0u3rYzwfTCW", "ChvZAa", "tw96AwXSys81lJaGkfDPBMrVD3mGtLqGmtaUmdSGv2LUnJq7ihG2ncKGqxbWBgvxzwjlAxqVntm3lJm2", "mty0mJrwvNjHtwK", "Ahr0Chm6lY9HlJeXmtq3nY54ExO", "CMvWBgfJzq", "lI4V", "C3rHCNrZv2L0Aa", "DgvZDa", "zxHLyW", "p2fWAv9RzxK9", "Dw5KzwzPBMvK", "zMLSDgvY", "C3bSAxq", "BMv4Da", "odyYoty1mhHQvxvqCa", "yxbWBhK", "Bw92Awu", "DgL0Bgu", "tw96AwXSys81lJaGkefUzhjVAwqPiev4B1bSyxLLCG", "C2XPy2u", "mtu1otG5ru1fuwDR", "oty1mtG0u3zfCMXK", "zgfOBwvYBw92AwvZ", "zxHWB3j0CW"];
  _0x39aa = function() {
    return _0x5200e5;
  };
  return _0x39aa();
}
if (typeof module !== _0x2d04b7(364))
  module[_0x2d04b7(377)] = { "getStreams": getStreams };
else
  global[_0x2d04b7(353)] = getStreams;
(function() {
  var _origGetStreams = typeof module !== "undefined" && module.exports && module.exports.getStreams || (typeof getStreams === "function" ? getStreams : typeof global !== "undefined" ? global.getStreams : null);
  if (typeof _origGetStreams !== "function")
    return;
  var TMDB_API_KEY_WRAP = "1865f43a0549ca50d341dd9ab8b29f49";
  var PROVIDER_NAME = "Dahmermovies-TV";
  var PROVIDER_ID = "dahmermovies-tv";
  var DEFAULT_LANG = "\u{1F1EC}\u{1F1E7} English";
  function formatCholeCard(opt) {
    var raw = [opt.filename || "", opt.rawText || "", opt.server || "", opt.quality || "", opt.size || "", opt.title || ""].join(" ");
    var text = raw.trim();
    var cleanText = text.replace(/4khdhub/gi, "").replace(/hdhub4u/gi, "");
    var res = "";
    var qCheck = opt.quality ? String(opt.quality).trim() : "";
    if (/\b(?:2160p|4k|uhd)\b/i.test(qCheck))
      res = "4K UHD";
    else if (/\b(?:1080p|fhd)\b/i.test(qCheck))
      res = "1080p FHD";
    else if (/\b(?:720p|hd)\b/i.test(qCheck))
      res = "720p HD";
    else if (/\b(?:480p|sd)\b/i.test(qCheck))
      res = "480p";
    else if (/\b(?:2160p|4k|uhd)\b/i.test(cleanText))
      res = "4K UHD";
    else if (/\b(?:1080p|fhd)\b/i.test(cleanText))
      res = "1080p FHD";
    else if (/\b(?:720p|hd)\b/i.test(cleanText))
      res = "720p HD";
    else if (/\b(?:480p|sd)\b/i.test(cleanText))
      res = "480p";
    else
      res = qCheck ? qCheck.toUpperCase() : "1080p FHD";
    var source = "";
    if (/\bremux\b/i.test(text))
      source = "REMUX";
    else if (/\b(?:bluray|bdrip|brrip)\b/i.test(text))
      source = "BluRay";
    else if (/\b(?:web-?dl|webrip|web)\b/i.test(text))
      source = "WEB-DL";
    else if (/\bhdtv\b/i.test(text))
      source = "HDTV";
    var codecs = [];
    if (/\b(?:hevc|x265|h\.?265)\b/i.test(text))
      codecs.push("HEVC");
    else if (/\b(?:x264|h\.?264|avc)\b/i.test(text))
      codecs.push("x264");
    if (/\b10-?bit\b/i.test(text))
      codecs.push("10-bit");
    var hdr = [];
    if (/\b(?:dolby\s*vision|dv)\b/i.test(text))
      hdr.push("Dolby Vision");
    if (/\bhdr10\+\b/i.test(text))
      hdr.push("HDR10+");
    else if (/\b(?:hdr10|hdr)\b/i.test(text))
      hdr.push("HDR");
    var audio = [];
    var hasAtmos = /\b(?:atmos|ddpa)\b/i.test(text);
    var hasTrueHD = /\btruehd\b/i.test(text);
    var hasDTSHD = /\bdts-?hd(?:\s*ma)?\b/i.test(text);
    var hasDTS = /\bdts\b/i.test(text);
    var hasDDP = /\b(?:ddp|dd\+|eac3)\b/i.test(text);
    var hasDD = /\b(?:dd|ac3)\b/i.test(text);
    var has71 = /7\.1/i.test(text);
    var has51 = /5\.1/i.test(text);
    if (hasAtmos)
      audio.push("Dolby Atmos" + (has71 ? " 7.1" : has51 ? " 5.1" : ""));
    else if (hasTrueHD)
      audio.push("TrueHD" + (has71 ? " 7.1" : has51 ? " 5.1" : ""));
    else if (hasDTSHD)
      audio.push("DTS-HD MA" + (has71 ? " 7.1" : has51 ? " 5.1" : ""));
    else if (hasDTS)
      audio.push("DTS" + (has51 ? " 5.1" : ""));
    else if (hasDDP)
      audio.push("DDP 5.1");
    else if (hasDD)
      audio.push("DD 5.1");
    else if (/\baac\b/i.test(text))
      audio.push("AAC");
    var langs = [];
    if (/\b(?:hindi|hin)\b/i.test(text))
      langs.push("\u{1F1EE}\u{1F1F3} Hindi");
    if (/\b(?:tamil|tam)\b/i.test(text))
      langs.push("\u{1F1EE}\u{1F1F3} Tamil");
    if (/\b(?:telugu|tel)\b/i.test(text))
      langs.push("\u{1F1EE}\u{1F1F3} Telugu");
    if (/\b(?:english|eng)\b/i.test(text))
      langs.push("\u{1F1EC}\u{1F1E7} English");
    if (/\b(?:korean|kor)\b/i.test(text))
      langs.push("\u{1F1F0}\u{1F1F7} Korean");
    if (/\b(?:japanese|jap|jpn)\b/i.test(text))
      langs.push("\u{1F1EF}\u{1F1F5} Japanese");
    if (/\bdual[- ]?audio\b/i.test(text))
      langs.push("\u{1F310} Dual-Audio");
    if (/\bmulti[- ]?audio\b/i.test(text))
      langs.push("\u{1F310} Multi-Audio");
    if (langs.length === 0 && opt.defaultLang) {
      langs.push(opt.defaultLang);
    }
    var uniqueLangs = Array.from(new Set(langs));
    var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+\s*[GM]B)(?:\]|\b)/i);
    var rawSize = opt.size || (sizeMatch ? sizeMatch[1] : "");
    var size = rawSize ? rawSize.replace(/([0-9.]+)\s*([GM]B)/i, "$1 $2").toUpperCase() : "";
    var server = opt.server || "";
    if (!server) {
      var grpMatch = text.match(/-([a-zA-Z0-9_]+)(?:\.[a-z]{3})?$/i);
      if (grpMatch && grpMatch[1].length > 2 && grpMatch[1].length < 15)
        server = grpMatch[1];
    }
    var nameParts = [];
    if (opt.latency)
      nameParts.push("\u{1F7E2} FAST (" + opt.latency + "ms)");
    nameParts.push(opt.provider || "Stream");
    if (server)
      nameParts.push("\u{1F3F7}\uFE0F " + server);
    if (res)
      nameParts.push(res);
    if (source)
      nameParts.push(source);
    if (codecs.length)
      nameParts.push(codecs.join(" "));
    if (hdr.length)
      nameParts.push(hdr.join(" "));
    if (audio.length)
      nameParts.push(audio[0]);
    if (uniqueLangs.length) {
      var dualTag = uniqueLangs.find(function(l) {
        return l.indexOf("Dual") !== -1 || l.indexOf("Multi") !== -1;
      });
      if (dualTag)
        nameParts.push(dualTag);
      else
        nameParts.push(uniqueLangs.slice(0, 2).join(" + "));
    }
    if (opt.seeders !== void 0 && opt.seeders !== null && opt.seeders !== "") {
      nameParts.push("\u{1F331} " + opt.seeders);
    }
    var nameLine = nameParts.join(" \u2022 ");
    var filename = (opt.filename || "").trim();
    if (!filename || filename === opt.title) {
      var baseTitle = (opt.title || "Video").replace(/[^a-zA-Z0-9]+/g, ".");
      var yr = opt.year ? "." + opt.year : "";
      var se = opt.season && opt.episode ? ".S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : "";
      var r = res ? "." + res.replace(/\s+/g, ".") : "";
      var s = source ? "." + source : "";
      var c = codecs.length ? "." + codecs.join(".") : "";
      var a = audio.length ? "." + audio[0].replace(/[^a-zA-Z0-9]+/g, ".") : "";
      var g = server ? "-" + server.replace(/[\s\-_]+/g, "") : "-" + (opt.provider || "Release");
      filename = baseTitle + yr + se + r + s + c + a + g + ".mkv";
    }
    var specTags = [res, source].concat(codecs).filter(Boolean);
    var seasonEp = opt.season && opt.episode ? " \u2022 S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : "";
    var line1 = "\u{1F3AC} " + (opt.title || "Unknown") + (opt.year ? " (" + opt.year + ")" : "") + seasonEp + (specTags.length ? " [" + specTags.join(" \u2022 ") + "]" : "");
    var line2 = "\u{1F4C4} " + filename;
    var av = hdr.concat(audio);
    var line3 = av.length ? "\u{1F48E} " + av.join(" \u2022 ") : "";
    var line4 = uniqueLangs.length ? "\u{1F310} " + uniqueLangs.join(" \u2022 ") : "";
    var meta = [];
    if (size)
      meta.push("\u{1F4E6} " + size);
    if (opt.seeders !== void 0 && opt.seeders !== null && opt.seeders !== "")
      meta.push("\u{1F7E2} " + opt.seeders + " Seeders");
    if (server)
      meta.push("\u{1F3F7}\uFE0F " + server);
    meta.push("\u{1F517} " + (opt.provider || "Stream"));
    var line5 = meta.join(" \u2022 ");
    var body = [line1, line2, line3, line4, line5].filter(Boolean).join("\n");
    var qualitySlug = "1080p";
    if (res.indexOf("4K") !== -1 || res.indexOf("2160") !== -1)
      qualitySlug = "4k";
    else if (res.indexOf("1080") !== -1)
      qualitySlug = "1080p";
    else if (res.indexOf("720") !== -1)
      qualitySlug = "720p";
    else if (res.indexOf("480") !== -1)
      qualitySlug = "480p";
    return {
      name: nameLine,
      title: body,
      quality: qualitySlug,
      size: size || ""
    };
  }
  function wrappedGetStreams(tmdbId, mediaType, season, episode) {
    return __async(this, null, function* () {
      var mediaInfo = { title: "", year: "" };
      try {
        var isSeries = mediaType === "tv" || mediaType === "series";
        var tmdbEndpoint = isSeries ? "tv" : "movie";
        var tmdbUrl = "https://api.tmdb.org/3/" + tmdbEndpoint + "/" + tmdbId + "?api_key=" + TMDB_API_KEY_WRAP;
        var tmdbRes = yield fetch(tmdbUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" }
        }).then(function(r) {
          return r.json();
        }).catch(function() {
          return null;
        });
        if (tmdbRes) {
          mediaInfo.title = tmdbRes.title || tmdbRes.name || "";
          var dateStr = tmdbRes.release_date || tmdbRes.first_air_date || "";
          mediaInfo.year = dateStr ? dateStr.split("-")[0] : "";
        }
      } catch (e) {
      }
      var rawStreams = [];
      try {
        rawStreams = yield _origGetStreams(tmdbId, mediaType, season, episode);
      } catch (e) {
        return [];
      }
      if (!Array.isArray(rawStreams) || rawStreams.length === 0)
        return [];
      return rawStreams.map(function(s) {
        if (!s)
          return null;
        var potentialFilename = "";
        if (s.fileName)
          potentialFilename = s.fileName;
        else if (s.filename)
          potentialFilename = s.filename;
        if (!potentialFilename && s.url) {
          try {
            var u = new URL(s.url);
            var uParam = u.searchParams.get("u") || u.searchParams.get("url");
            var targetPath = u.pathname;
            if (uParam) {
              try {
                var parsedTarget = new URL(uParam);
                targetPath = parsedTarget.pathname;
              } catch (e) {
                targetPath = uParam;
              }
            }
            var lastPart = decodeURIComponent(targetPath.split("/").pop() || "");
            if (lastPart && /\.(mkv|mp4|avi|mov|ts)$/i.test(lastPart)) {
              potentialFilename = lastPart;
            }
          } catch (e) {
          }
        }
        if (!potentialFilename && s.title) {
          var infoMatch = s.title.match(/ℹ️\s*([^\n|]+)/);
          if (infoMatch) {
            var rawName = infoMatch[1].trim();
            if (/\.(mkv|mp4|avi|mov)$/i.test(rawName))
              potentialFilename = rawName;
            else
              potentialFilename = rawName.replace(/\s+/g, ".") + ".mkv";
          } else if (/\.(mkv|mp4|avi|mov)$/i.test(s.title.trim())) {
            potentialFilename = s.title.replace(/^🎬\s*/, "").trim();
          } else if (!/[|📺🌐💾🎞️]/.test(s.title) && s.title.length > 8 && !s.title.includes("\n")) {
            potentialFilename = s.title.replace(/^🎬\s*/, "").trim();
          }
        }
        var detectedServer = s.server || "";
        if (!detectedServer && s.name) {
          var srvMatch = s.name.match(/(?:Server\s*\d+|G-Direct|V-Cloud|HubCloud|Driveseed|Worker|FSLv2)/i);
          if (srvMatch)
            detectedServer = srvMatch[0];
        }
        if (!detectedServer && s.title) {
          var titleSrvMatch = s.title.match(/(?:Server\s*\d+|📌\s*Server\s*\d+)/i);
          if (titleSrvMatch)
            detectedServer = titleSrvMatch[0].replace(/[📌\s]+/g, " ").trim();
        }
        var finalTitle = mediaInfo.title;
        if (!finalTitle && s.title) {
          var firstLine = s.title.split("\n")[0].replace(/^🎬\s*/, "").replace(/\s*-\s*\d{4}.*$/, "").replace(/\s*\(\d{4}\).*$/, "").trim();
          if (firstLine && !/unknown/i.test(firstLine))
            finalTitle = firstLine;
        }
        if (!finalTitle)
          finalTitle = "Video";
        var card = formatCholeCard({
          provider: PROVIDER_NAME,
          title: finalTitle,
          year: mediaInfo.year || "",
          season: mediaType === "tv" || mediaType === "series" ? season : null,
          episode: mediaType === "tv" || mediaType === "series" ? episode : null,
          filename: potentialFilename,
          server: detectedServer,
          quality: s.quality || "",
          size: s.size || "",
          rawText: (s.name || "") + " " + (s.title || ""),
          defaultLang: DEFAULT_LANG,
          url: s.url
        });
        return Object.assign({}, s, {
          name: card.name,
          title: card.title,
          quality: card.quality || s.quality,
          provider: PROVIDER_ID
        });
      }).filter(Boolean);
    });
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports.getStreams = wrappedGetStreams;
    if (typeof onSettings !== "undefined")
      module.exports.onSettings = onSettings;
  }
  if (typeof globalThis !== "undefined")
    globalThis.getStreams = wrappedGetStreams;
  if (typeof global !== "undefined")
    global.getStreams = wrappedGetStreams;
})();
