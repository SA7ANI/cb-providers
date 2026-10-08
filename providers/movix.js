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
var _0x2a35f6 = _0x2bf8;
(function(_0x29e659, _0x2ab58e) {
  var _0x357f73 = { _0x3ee5b3: 150, _0x3cb309: 189, _0x2aa0ae: 157, _0x5c703a: 136, _0x1eef60: 155, _0x3d748c: 135, _0x166d50: 166, _0x2df2be: 140 }, _0x5cb990 = _0x2bf8, _0x313054 = _0x29e659();
  while (!![]) {
    try {
      var _0x3dc1fe = parseInt(_0x5cb990(164)) / 1 + -parseInt(_0x5cb990(_0x357f73._0x3ee5b3)) / 2 + parseInt(_0x5cb990(_0x357f73._0x3cb309)) / 3 + -parseInt(_0x5cb990(_0x357f73._0x2aa0ae)) / 4 + parseInt(_0x5cb990(_0x357f73._0x5c703a)) / 5 * (-parseInt(_0x5cb990(_0x357f73._0x1eef60)) / 6) + -parseInt(_0x5cb990(_0x357f73._0x3d748c)) / 7 + -parseInt(_0x5cb990(_0x357f73._0x166d50)) / 8 * (-parseInt(_0x5cb990(_0x357f73._0x2df2be)) / 9);
      if (_0x3dc1fe === _0x2ab58e)
        break;
      else
        _0x313054["push"](_0x313054["shift"]());
    } catch (_0x2cb502) {
      _0x313054["push"](_0x313054["shift"]());
    }
  }
})(_0x157f, 268497);
var TMDB_KEY = _0x2a35f6(173), DOMAINS_URL = "https://raw.githubusercontent.com/wooodyhood/nuvio-repo/main/domains.json", MOVIX_FALLBACK = _0x2a35f6(147), _cachedEndpoint = null;
function _0x157f() {
  var _0x19afc0 = ["Bw92AxG", "ovHryLPTrW", "nZiWCa", "CMvWBgfJzq", "Bw92Awu", "CMvMzxjLCG", "zxbPC29Kzv9YDw5FDgLTzq", "rhvHBc1bDwrPBW", "y2fZAa", "mta4mha", "Dw5KzwzPBMvK", "otu5mJe0EMDdEMfy", "8j+nVYa", "l2fWAs9JCgfZBwfSl3r2lW", "8j+hUVcFH7GG4OcIipcFH6VWN4E3", "r0vu", "mtjSCNLnC3C", "zMLYC3rFywLYx2rHDgu", "mtC0odC2ognSDNzkBa", "jMXHBMD1ywDLpwvUlvvt", "BMfTzq", "Dg9vChbLCKnHC2u", "DgHLBG", "ywXS", "C2XPy2u", "mtq5nti2AK1syNje", "BgfUzW", "nZKYndqZmKnTv1bwuG", "mta4ma", "Ahr0Chm6lY9TB3zPEc4", "ig1PBG", "zM9YrwfJAa", "zhvYyxrPB24", "yxbP", "zJnKnZu3odi0zJa4zweYy2zMndvLyJHMndDJytnHmwu", "Ahr0Chm6lY9HCgKUDgHLBw92AwvKyI5VCMCVmY8", "jMvWAxnVzgu9", "8j+hQ/cFH7C", "zMLSDgvY", "zxHWB3j0CW", "tw92AxG", "BgvUz3rO", "z2v0u3rYzwfTCW", "Btn1oa", "ic0G", "CMvSzwfZzv9KyxrL", "CgXHEwvY", "ChvZAa", "ihWG", "Aw5KzxHpzG", "mte2ntiYn0nSAu9ksG", "ANnVBG", "sc4YnJq", "BgLUA3m", "tw92AxGGFca", "EwvHCG", "BwfW", "Dg9mB3DLCKnHC2u", "p2fWAv9RzxK9", "C3bSAxq", "vK9tvezs", "CMvZB2X2zq", "y2f0y2G", "C291CMnLCW", "DgL0Bgu", "ihWG8j+oTsa", "l3n0CMvHBt9ZzwfZB249", "mJmZmtCYmu9dqw9owG", "mJuYmJvzs0voAvK", "l3n0CMvHBq", "DxjS"];
  _0x157f = function() {
    return _0x19afc0;
  };
  return _0x157f();
}
function getTmdbMetadata(_0x27aaad, _0x579339) {
  var _0x45457c = { _0x1c7d44: 143, _0x50f3c4: 158 }, _0x114a35 = { _0x38a933: 184, _0x5c8a8a: 169 }, _0x319e14 = _0x2a35f6, _0x22192c = _0x319e14(174) + (_0x579339 === "tv" ? "tv" : _0x319e14(_0x45457c._0x1c7d44)) + "/" + _0x27aaad + _0x319e14(126) + TMDB_KEY + _0x319e14(_0x45457c._0x50f3c4);
  return fetch(_0x22192c)["then"](function(_0x276b6d) {
    var _0x4d273b = _0x319e14;
    return _0x276b6d[_0x4d273b(190)]();
  })["then"](function(_0x3077cb) {
    var _0x4c713f = _0x319e14, _0x194fba = _0x3077cb[_0x4c713f(_0x114a35._0x38a933)] || _0x3077cb[_0x4c713f(156)] || "";
    return { "name": _0x3077cb[_0x4c713f(132)] || _0x3077cb["name"] || _0x4c713f(179), "year": _0x194fba ? _0x194fba[_0x4c713f(127)]("-")[0] : "", "duration": _0x579339 === _0x4c713f(143) && _0x3077cb["runtime"] ? _0x3077cb["runtime"] + " min" : _0x579339 === "tv" && _0x3077cb[_0x4c713f(145)] && _0x3077cb["episode_run_time"]["length"] > 0 ? _0x3077cb[_0x4c713f(145)][0] + _0x4c713f(_0x114a35._0x5c8a8a) : "" };
  })["catch"](function() {
    var _0x4ec38a = _0x319e14;
    return { "name": _0x4ec38a(179), "year": "", "duration": "" };
  });
}
function getEpisodeInfo(_0x394bd7, _0x8879af, _0x4021d4) {
  var _0x10fe55 = _0x2a35f6;
  if (!_0x394bd7 || !_0x8879af || !_0x4021d4)
    return Promise[_0x10fe55(129)](null);
  var _0x4de06e = "https://api.tmdb.org/3/tv/" + _0x394bd7 + "/season/" + _0x8879af + "/episode/" + _0x4021d4 + _0x10fe55(126) + TMDB_KEY + _0x10fe55(158);
  return fetch(_0x4de06e)["then"](function(_0x2ec0b3) {
    return _0x2ec0b3["json"]();
  })["then"](function(_0x3b5101) {
    return { "name": _0x3b5101["name"] || null, "duration": _0x3b5101["runtime"] ? _0x3b5101["runtime"] + " min" : null };
  })[_0x10fe55(130)](function() {
    return null;
  });
}
function buildTitle(_0x48dfca, _0x31f40c, _0x2fe997, _0x4e3592, _0xbff04c, _0x55b198, _0x5beac5, _0x533cb8, _0x2c55a6) {
  var _0x1a8d32 = { _0x242689: 142, _0x23ed36: 146, _0xef597: 153, _0x95a154: 151, _0x35ffa2: 159, _0x464df3: 187, _0x2c80ae: 159, _0x2a4eda: 194, _0x2d40ad: 188, _0x3d4541: 171, _0x7edcb0: 171, _0x2889ba: 171 }, _0x2f90bf = _0x2a35f6, _0x146172 = _0x31f40c[_0x2f90bf(196)]()[_0x2f90bf(_0x1a8d32._0x242689)](/p/g, "") + "p", _0x2dd22d = "\u26A1", _0x519a57 = "VF", _0x23f645 = _0x2f90bf(176), _0x4482f7 = (String(_0x2fe997) + " " + String(_0x31f40c) + " " + String(_0x55b198))["toUpperCase"]();
  if (_0x4482f7["indexOf"]("MULTI") !== -1 || _0x4482f7["indexOf"]("DUAL") !== -1)
    _0x519a57 = _0x2f90bf(_0x1a8d32._0x23ed36), _0x23f645 = _0x2f90bf(_0x1a8d32._0xef597);
  else
    _0x4482f7["indexOf"]("VOST") !== -1 && (_0x519a57 = "VOSTFR", _0x23f645 = _0x2f90bf(153));
  var _0x3edf99 = _0x2f90bf(_0x1a8d32._0x95a154);
  _0x5beac5 && _0x533cb8 ? _0x3edf99 += "S" + _0x5beac5 + " E" + _0x533cb8 + (_0x2c55a6 && _0x2c55a6[_0x2f90bf(_0x1a8d32._0x35ffa2)] ? _0x2f90bf(183) + _0x2c55a6[_0x2f90bf(159)] : "") + _0x2f90bf(_0x1a8d32._0x464df3) + _0x48dfca[_0x2f90bf(_0x1a8d32._0x2c80ae)] : _0x3edf99 += _0x48dfca[_0x2f90bf(_0x1a8d32._0x2c80ae)] + (_0x48dfca[_0x2f90bf(_0x1a8d32._0x2a4eda)] ? " - " + _0x48dfca[_0x2f90bf(_0x1a8d32._0x2a4eda)] : "");
  var _0x5da3b7 = _0x2dd22d + " " + _0x146172 + " | \u{1F4AC} " + _0x519a57 + _0x2f90bf(133) + _0x23f645, _0x39586b = (_0x4e3592 || "M3U8")["toUpperCase"](), _0x2f4914 = _0x2f90bf(191);
  (_0x4482f7["indexOf"]("HEVC") !== -1 || _0x4482f7[_0x2f90bf(_0x1a8d32._0x2d40ad)]("X265") !== -1 || _0x4482f7[_0x2f90bf(188)]("H265") !== -1) && (_0x2f4914 = "H.265");
  var _0x271807 = _0x2c55a6 && _0x2c55a6[_0x2f90bf(_0x1a8d32._0x3d4541)] ? _0x2c55a6[_0x2f90bf(_0x1a8d32._0x7edcb0)] : _0x48dfca[_0x2f90bf(_0x1a8d32._0x2889ba)], _0x242352 = _0x271807 ? " | " + _0x271807 : "", _0x3fd813 = "\u{1F4BF} " + _0x39586b + " \u2022 " + _0x2f4914 + " | \u{1F3A7} AAC" + _0x242352;
  return _0x3edf99 + "\n" + _0x5da3b7 + "\n" + _0x3fd813;
}
function _0x2bf8(_0x2113e7, _0x127d42) {
  _0x2113e7 = _0x2113e7 - 126;
  var _0x157f10 = _0x157f();
  var _0x2bf831 = _0x157f10[_0x2113e7];
  if (_0x2bf8["YgFTRO"] === void 0) {
    var _0x44f4ba = function(_0x43a286) {
      var _0x2a254b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
      var _0x27aaad = "", _0x579339 = "";
      for (var _0x22192c = 0, _0x276b6d, _0x3077cb, _0x194fba = 0; _0x3077cb = _0x43a286["charAt"](_0x194fba++); ~_0x3077cb && (_0x276b6d = _0x22192c % 4 ? _0x276b6d * 64 + _0x3077cb : _0x3077cb, _0x22192c++ % 4) ? _0x27aaad += String["fromCharCode"](255 & _0x276b6d >> (-2 * _0x22192c & 6)) : 0) {
        _0x3077cb = _0x2a254b["indexOf"](_0x3077cb);
      }
      for (var _0x394bd7 = 0, _0x8879af = _0x27aaad["length"]; _0x394bd7 < _0x8879af; _0x394bd7++) {
        _0x579339 += "%" + ("00" + _0x27aaad["charCodeAt"](_0x394bd7)["toString"](16))["slice"](-2);
      }
      return decodeURIComponent(_0x579339);
    };
    _0x2bf8["OBsBMX"] = _0x44f4ba, _0x2bf8["OMzWBM"] = {}, _0x2bf8["YgFTRO"] = !![];
  }
  var _0x25b185 = _0x157f10[0], _0xf86ad3 = _0x2113e7 + _0x25b185, _0x4ef7d2 = _0x2bf8["OMzWBM"][_0xf86ad3];
  return !_0x4ef7d2 ? (_0x2bf831 = _0x2bf8["OBsBMX"](_0x2bf831), _0x2bf8["OMzWBM"][_0xf86ad3] = _0x2bf831) : _0x2bf831 = _0x4ef7d2, _0x2bf831;
}
function detectApi() {
  var _0x1f944c = { _0x553cf6: 168 };
  if (_cachedEndpoint)
    return Promise["resolve"](_cachedEndpoint);
  return fetch(DOMAINS_URL)["then"](function(_0x4bec86) {
    return _0x4bec86["ok"] ? _0x4bec86["json"]() : Promise["reject"]();
  })["then"](function(_0x160061) {
    var _0x5bcbee = _0x2bf8, _0x5b2afa = _0x160061[_0x5bcbee(139)] || MOVIX_FALLBACK;
    return _cachedEndpoint = { "api": "https://api.movix." + _0x5b2afa, "referer": _0x5bcbee(_0x1f944c._0x553cf6) + _0x5b2afa + "/" }, _cachedEndpoint;
  })["catch"](function() {
    return _cachedEndpoint = { "api": "https://api.movix." + MOVIX_FALLBACK, "referer": "https://movix." + MOVIX_FALLBACK + "/" }, _cachedEndpoint;
  });
}
function resolveRedirect(_0x19f047, _0x5d8074) {
  var _0x42cd9a = { _0xdf0824: 154 }, _0x2826cb = { _0x22079c: 138 }, _0x288299 = _0x2a35f6;
  return fetch(_0x19f047, { "method": _0x288299(_0x42cd9a._0xdf0824), "redirect": "follow", "headers": { "User-Agent": "Mozilla/5.0", "Referer": _0x5d8074 } })["then"](function(_0x777d3d) {
    var _0x255d76 = _0x288299;
    return _0x777d3d[_0x255d76(_0x2826cb._0x22079c)] || _0x19f047;
  })[_0x288299(130)](function() {
    return _0x19f047;
  });
}
function resolveEmbed(_0x16b0f3, _0x4d4d48) {
  var _0xc8944f = { _0x5ec6f1: 161 }, _0x1570a7 = _0x2a35f6;
  return fetch(_0x16b0f3, { "method": "GET", "redirect": "follow", "headers": { "User-Agent": "Mozilla/5.0", "Referer": _0x4d4d48 } })[_0x1570a7(_0xc8944f._0x5ec6f1)](function(_0x5f5378) {
    return _0x5f5378["text"]();
  })["then"](function(_0x1a4b38) {
    var _0x357168 = _0x1570a7, _0x425b97 = [/file\s*:\s*["']([^"']+\.m3u8[^"']*)["']/i, /source\s+src=["']([^"']+\.m3u8[^"']*)["']/i, /["']([^"']*\.m3u8(?:\?[^"']*)?)["']/i];
    for (var _0x29f66c = 0; _0x29f66c < _0x425b97[_0x357168(180)]; _0x29f66c++) {
      var _0x3884f1 = _0x1a4b38["match"](_0x425b97[_0x29f66c]);
      if (_0x3884f1)
        return _0x3884f1[1]["startsWith"]("//") ? "https:" + _0x3884f1[1] : _0x3884f1[1];
    }
    return null;
  })[_0x1570a7(130)](function() {
    return null;
  });
}
function fetchPurstream(_0x40939b, _0x3e3fa5, _0x248b98, _0x398da9, _0x26a352, _0x55dab8) {
  var _0x4fc634 = { _0x1ef089: 175, _0x5d59f2: 137 }, _0x1fbd53 = _0x2a35f6, _0xdb4c55 = _0x398da9 === "tv" ? _0x40939b + "/api/purstream/tv/" + _0x248b98 + _0x1fbd53(134) + (_0x26a352 || 1) + _0x1fbd53(_0x4fc634._0x1ef089) + (_0x55dab8 || 1) : _0x40939b + "/api/purstream/movie/" + _0x248b98 + _0x1fbd53(_0x4fc634._0x5d59f2);
  return fetch(_0xdb4c55, { "headers": { "Referer": _0x3e3fa5 } })["then"](function(_0x43751f) {
    return _0x43751f["json"]();
  })["then"](function(_0x29bb94) {
    var _0x3df380 = _0x1fbd53;
    return _0x29bb94[_0x3df380(131)] || [];
  });
}
function fetchCpasmal(_0x5423f9, _0x101f58, _0x44ee3d, _0x307147, _0x4b17da, _0xb7422c) {
  var _0x2d9e61 = { _0x4b57c9: 152, _0x11af41: 161 }, _0x322756 = { _0xcb7dc2: 192 }, _0x2f6652 = _0x2a35f6, _0x2688f4 = _0x307147 === "tv" ? _0x5423f9 + _0x2f6652(_0x2d9e61._0x4b57c9) + _0x44ee3d + "/" + (_0x4b17da || 1) + "/" + (_0xb7422c || 1) : _0x5423f9 + "/api/cpasmal/movie/" + _0x44ee3d;
  return fetch(_0x2688f4, { "headers": { "Referer": _0x101f58 } })[_0x2f6652(161)](function(_0x2c9d6a) {
    var _0x45931b = _0x2f6652;
    return _0x2c9d6a[_0x45931b(190)]();
  })[_0x2f6652(_0x2d9e61._0x11af41)](function(_0x3eac4f) {
    var _0x154f44 = _0x2f6652, _0x5f404e = [];
    return ["vf", "vostfr"][_0x154f44(170)](function(_0x1185e3) {
      var _0xd1fa5 = { _0x2f95da: 186, _0x10d9f5: 179 }, _0x26f0dc = _0x154f44;
      _0x3eac4f[_0x26f0dc(192)] && _0x3eac4f[_0x26f0dc(_0x322756._0xcb7dc2)][_0x1185e3] && _0x3eac4f["links"][_0x1185e3]["forEach"](function(_0x45a1d3) {
        var _0xd182b7 = _0x26f0dc;
        _0x5f404e[_0xd182b7(_0xd1fa5._0x2f95da)]({ "url": _0x45a1d3[_0xd182b7(138)], "name": _0xd182b7(_0xd1fa5._0x10d9f5), "player": _0x45a1d3["server"], "lang": _0x1185e3 });
      });
    }), _0x5f404e;
  });
}
function tryFetchAll(_0x3941d5, _0xc17801, _0x5b6fe6, _0x1f472a, _0x485697, _0x534552, _0x274e75, _0x5d0def) {
  var _0x481c0c = { _0x2f8c72: 130 }, _0x8697ca = _0x2a35f6;
  return fetchPurstream(_0x3941d5, _0xc17801, _0x5b6fe6, _0x1f472a, _0x485697, _0x534552)[_0x8697ca(161)](function(_0x18b303) {
    var _0x4eb6aa = { _0xec5f91: 159 }, _0x2b561c = _0x8697ca;
    return Promise[_0x2b561c(162)](_0x18b303["map"](function(_0x1ade2a) {
      var _0x10482c = _0x2b561c;
      return resolveRedirect(_0x1ade2a[_0x10482c(138)], _0xc17801)["then"](function(_0x2dcf49) {
        var _0x8459a8 = _0x10482c, _0x3f5d84 = (_0x1ade2a["name"] || "")[_0x8459a8(188)](_0x8459a8(167)) !== -1 ? _0x8459a8(148) : _0x8459a8(141), _0x59bf78 = (_0x1ade2a[_0x8459a8(_0x4eb6aa._0xec5f91)] || "")["indexOf"]("VOST") !== -1 ? _0x8459a8(128) : (_0x1ade2a["name"] || "")["indexOf"]("VF") !== -1 ? "VF" : "Dual-Audio", _0x16424f = buildTitle(_0x274e75, _0x3f5d84, _0x59bf78, _0x1ade2a["format"] || _0x8459a8(182), null, null, _0x485697, _0x534552, _0x5d0def);
        return { "name": _0x8459a8(193) + _0x3f5d84["toLowerCase"]() + _0x8459a8(187) + _0x59bf78, "title": _0x16424f, "size": _0x16424f, "description": _0x16424f, "url": _0x2dcf49, "quality": "", "language": "", "format": _0x1ade2a["format"] || "m3u8", "headers": { "User-Agent": "Mozilla/5.0" } };
      });
    }));
  })[_0x8697ca(_0x481c0c._0x2f8c72)](function() {
    var _0xa52aa0 = { _0x198cc4: 161 };
    return fetchCpasmal(_0x3941d5, _0xc17801, _0x5b6fe6, _0x1f472a, _0x485697, _0x534552)["then"](function(_0x442c5e) {
      var _0x29de33 = { _0x4e7c46: 177 }, _0x357a8f = { _0x437d80: 128, _0x8d02d5: 182, _0x4f6f9c: 185 }, _0x33cfe9 = _0x2bf8;
      return Promise["all"](_0x442c5e[_0x33cfe9(163)](0, 5)[_0x33cfe9(195)](function(_0x9f0a2c) {
        return resolveEmbed(_0x9f0a2c["url"], _0xc17801)["then"](function(_0x413b29) {
          var _0x2a4415 = _0x2bf8;
          if (!_0x413b29)
            return null;
          var _0x2a772c = _0x9f0a2c["lang"] && _0x9f0a2c[_0x2a4415(165)][_0x2a4415(160)]() === "VOSTFR" ? _0x2a4415(_0x357a8f._0x437d80) : "VF", _0x5d7f53 = buildTitle(_0x274e75, "HD", _0x2a772c, _0x2a4415(_0x357a8f._0x8d02d5), "", _0x9f0a2c[_0x2a4415(_0x357a8f._0x4f6f9c)], _0x485697, _0x534552, _0x5d0def);
          return { "name": "Movix | hd | " + _0x2a772c, "title": _0x5d7f53, "size": _0x5d7f53, "description": _0x5d7f53, "url": _0x413b29, "quality": "", "language": "", "format": _0x2a4415(_0x357a8f._0x8d02d5), "headers": { "Referer": _0xc17801 } };
        });
      }))[_0x33cfe9(_0xa52aa0._0x198cc4)](function(_0xb72cb7) {
        var _0x56126c = _0x33cfe9;
        return _0xb72cb7[_0x56126c(_0x29de33._0x4e7c46)](function(_0x1aafeb) {
          return _0x1aafeb !== null;
        });
      });
    });
  });
}
function getStreams(_0x1cf2d2, _0x3e20a7, _0x4c17e8, _0x334912) {
  var _0x7cb5dd = { _0x1ef100: 172, _0x23a1e0: 144 }, _0x1cefbd = _0x2a35f6;
  return Promise["all"]([getTmdbMetadata(_0x1cf2d2, _0x3e20a7), _0x3e20a7 === "tv" ? getEpisodeInfo(_0x1cf2d2, _0x4c17e8, _0x334912) : Promise["resolve"](null), detectApi()])[_0x1cefbd(161)](function(_0xd591cb) {
    var _0x57d453 = _0x1cefbd, _0x5e17ed = _0xd591cb[0], _0x21195e = _0xd591cb[1], _0x592f09 = _0xd591cb[2];
    return tryFetchAll(_0x592f09[_0x57d453(_0x7cb5dd._0x1ef100)], _0x592f09[_0x57d453(_0x7cb5dd._0x23a1e0)], _0x1cf2d2, _0x3e20a7, _0x4c17e8, _0x334912, _0x5e17ed, _0x21195e);
  })["catch"](function() {
    return [];
  });
}
typeof module !== _0x2a35f6(149) && module[_0x2a35f6(178)] ? module["exports"] = { "getStreams": getStreams } : global[_0x2a35f6(181)] = getStreams;
(function() {
  var _origGetStreams = typeof module !== "undefined" && module.exports && module.exports.getStreams || (typeof getStreams === "function" ? getStreams : typeof global !== "undefined" ? global.getStreams : null);
  if (typeof _origGetStreams !== "function")
    return;
  var TMDB_API_KEY_WRAP = "1865f43a0549ca50d341dd9ab8b29f49";
  var PROVIDER_NAME = "Movix VF";
  var PROVIDER_ID = "movix";
  var DEFAULT_LANG = "\u{1F1EB}\u{1F1F7} French VF";
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
