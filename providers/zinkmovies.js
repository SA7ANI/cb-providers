var __spreadValues = (a, b) => Object.assign({}, a, b);
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
const _0x4e9a2b = _0x4dda;
(function(_0x15f87e, _0xb7796f) {
  const _0x479b8f = { _0x1d9026: 165, _0x51f543: 171, _0x61259b: 119, _0x181fa1: 226 }, _0x2a3849 = _0x4dda, _0x3e9558 = _0x15f87e();
  while (!![]) {
    try {
      const _0x3045c0 = -parseInt(_0x2a3849(229)) / 1 + -parseInt(_0x2a3849(_0x479b8f._0x1d9026)) / 2 * (-parseInt(_0x2a3849(174)) / 3) + -parseInt(_0x2a3849(190)) / 4 + -parseInt(_0x2a3849(148)) / 5 * (-parseInt(_0x2a3849(_0x479b8f._0x51f543)) / 6) + -parseInt(_0x2a3849(183)) / 7 + parseInt(_0x2a3849(_0x479b8f._0x61259b)) / 8 * (-parseInt(_0x2a3849(161)) / 9) + -parseInt(_0x2a3849(209)) / 10 * (-parseInt(_0x2a3849(_0x479b8f._0x181fa1)) / 11);
      if (_0x3045c0 === _0xb7796f)
        break;
      else
        _0x3e9558["push"](_0x3e9558["shift"]());
    } catch (_0x129acf) {
      _0x3e9558["push"](_0x3e9558["shift"]());
    }
  }
})(_0x24a9, 881179);
var __defProp = Object["defineProperty"], __getOwnPropSymbols = Object[_0x4e9a2b(224)], __hasOwnProp = Object["prototype"][_0x4e9a2b(195)], __propIsEnum = Object["prototype"][_0x4e9a2b(127)], __defNormalProp = (_0x1da1f9, _0x54ab6e, _0x3b9027) => _0x54ab6e in _0x1da1f9 ? __defProp(_0x1da1f9, _0x54ab6e, { "enumerable": !![], "configurable": !![], "writable": !![], "value": _0x3b9027 }) : _0x1da1f9[_0x54ab6e] = _0x3b9027, __spreadValues = (_0x1b5dc7, _0x4cfce2) => {
  for (var _0x332c7a in _0x4cfce2 || (_0x4cfce2 = {}))
    if (__hasOwnProp["call"](_0x4cfce2, _0x332c7a))
      __defNormalProp(_0x1b5dc7, _0x332c7a, _0x4cfce2[_0x332c7a]);
  if (__getOwnPropSymbols)
    for (var _0x332c7a of __getOwnPropSymbols(_0x4cfce2)) {
      if (__propIsEnum["call"](_0x4cfce2, _0x332c7a))
        __defNormalProp(_0x1b5dc7, _0x332c7a, _0x4cfce2[_0x332c7a]);
    }
  return _0x1b5dc7;
}, __async2 = (_0x5f27bd, _0x107c28, _0x57ab12) => {
  const _0x53c138 = { _0x5aede1: 130 };
  return new Promise((_0x2ab46f, _0x45fe7f) => {
    const _0x497510 = { _0x19b6e3: 130 }, _0x9d20ff = _0x4dda;
    var _0x29e5d0 = (_0x4eff69) => {
      const _0x3c50f8 = _0x4dda;
      try {
        _0x2151b1(_0x57ab12[_0x3c50f8(_0x497510._0x19b6e3)](_0x4eff69));
      } catch (_0x26da6a) {
        _0x45fe7f(_0x26da6a);
      }
    }, _0x587f7f = (_0x5e4c7f) => {
      try {
        _0x2151b1(_0x57ab12["throw"](_0x5e4c7f));
      } catch (_0x2f76d5) {
        _0x45fe7f(_0x2f76d5);
      }
    }, _0x2151b1 = (_0x3ec6b5) => _0x3ec6b5["done"] ? _0x2ab46f(_0x3ec6b5[_0x9d20ff(198)]) : Promise[_0x9d20ff(131)](_0x3ec6b5[_0x9d20ff(198)])[_0x9d20ff(149)](_0x29e5d0, _0x587f7f);
    _0x2151b1((_0x57ab12 = _0x57ab12["apply"](_0x5f27bd, _0x107c28))[_0x9d20ff(_0x53c138._0x5aede1)]());
  });
}, PROVIDER_NAME = "ZinkMovies", TMDB_API_KEY = _0x4e9a2b(162), MAIN_URL = "https://zinkmovies.wtf", DOMAINS_JSON_URL = "https://raw.githubusercontent.com/PirateZoro9/asura-providers/main/urls.json", baseUrl = MAIN_URL, cachedDomains = null, domainCacheTime = 0, DOMAIN_CACHE_TTL = 4 * 60 * 60 * 1e3, currentUA = _0x4e9a2b(137), UAS = ["Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36", _0x4e9a2b(210), "Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36", _0x4e9a2b(139)];
function refreshDomains() {
  return __async2(this, null, function* () {
    const _0x3ab462 = _0x4dda;
    if (cachedDomains && Date[_0x3ab462(124)]() - domainCacheTime < DOMAIN_CACHE_TTL)
      return;
    try {
      const _0x31b943 = yield fetch(DOMAINS_JSON_URL, { "headers": { "User-Agent": "Mozilla/5.0" } });
      if (_0x31b943 == null ? void 0 : _0x31b943["ok"]) {
        const _0x1f9711 = JSON["parse"](yield _0x31b943[_0x3ab462(225)]());
        (_0x1f9711 == null ? void 0 : _0x1f9711[_0x3ab462(140)]) && (cachedDomains = _0x1f9711, domainCacheTime = Date["now"](), baseUrl = _0x1f9711["zinkmovies"]);
      }
    } catch (_0x53cbf9) {
    }
  });
}
function hdrs(_0x9212bf = {}) {
  const _0x27d929 = { _0x198d78: 151 }, _0x222913 = _0x4e9a2b;
  return __spreadValues({ "User-Agent": currentUA, "Accept-Language": _0x222913(_0x27d929._0x198d78) }, _0x9212bf);
}
var FETCH_TIMEOUT = 12e3;
function raceTimeout(_0x45e691) {
  const _0x4d3241 = _0x4e9a2b;
  return new Promise((_0x2280e0, _0x8dc273) => setTimeout(() => _0x8dc273(new Error(_0x4d3241(167))), _0x45e691));
}
function _0x24a9() {
  const _0x254aa7 = ["Edi2na", "Ahr0Ca", "BwfYyxrOAq", "CgfKu3rHCNq", "mtvXtNv5rMO", "DgHLBG", "DhLWzq", "zw4TvvmSzw47Ct0WlJK", "lM0ZDtG", "Adi2nq", "DgvZDa", "Aw5JBhvKzxm", "nZiWCa", "AhvIy2XVDwq", "C3vIC3rYAw5N", "BgvUz3rO", "BMfTzq", "mJyXnJm3mLD0yLb3Dq", "ndm5yZq3oge3nZfMmZvJmduWmJjMowzLywjJy2eWmwm", "Dg9vChbLCKnHC2u", "yuHsmgm", "nJm2otrksK1Av2G", "mta4mha", "vgLTzw91Da", "lNr4Da", "ihWG8j+sVIa", "lZ9Zpq", "oty3mZe0t09tA2vQ", "zhvHBa", "BwfW", "mJrbwMnKANG", "ihWG", "ihWGuW", "CMvWBgfJzq", "zgrWns4X", "A2fUBMfKyq", "ihWGAgqGFcbhzw1Tyq", "ihWG8j+uIIbeB2XIEsbbDg1VCW", "ANnVBG", "ntCXndCWmMPcDLrUAq", "C29Tzq", "C3bSAxq", "p2fWAv9RzxK9", "mJe2mha", "ihWG4PM+ierVBgj5ifzPC2LVBG", "zMLSzq", "mti5odqYmhbuuLHTuW", "DgL0Bgu", "AgrY", "CMfJzq", "tva0", "AgfZt3DUuhjVCgvYDhK", "zxHLyW", "C2rY", "DMfSDwu", "pgrPDIbJBgfZCZ0IC2vYAwvJB250ywLUzxiIpG", "C3rHCNrZv2L0Aa", "C3vJy2vZCW", "Dg9mB3DLCKnHC2u", "ue9tva", "EgXHpxm0Da", "zxbPC29Kzq", "D2vIzgW", "AgrYAxa", "yMvUz2fSAq", "mtmXmgjRtezwzG", "tw96AwXSys81lJaGkeXPBNv4oYbbBMrYB2LKideZoYbtts1tote4qIKGqxbWBgvxzwjlAxqVntm3lJm2icHlsfrntcWGBgLRzsbhzwnRBYKGq2HYB21LlZeXnI4WlJaUmcbnB2jPBguGu2fMyxjPlZuZnY4ZnG", "D2vICMLW", "CxvHBgL0Eq", "DhjPBq", "ndGWua", "8j+oPsbilJi2nq", "Bw92Awu", "CMvSzwfZzv9KyxrL", "C29YDa", "zMXHDa", "Aw5KzxHpzG", "r2vTBwe", "mJe2ma", "yxbWBgLJyxrPB24VEc13D3CTzM9YBs11CMXLBMnVzgvK", "z2v0t3DUuhjVCgvYDhLtEw1IB2XZ", "Dgv4Da", "mZC0ntCYvM1Pt1fI", "tuTw", "Bwf0y2G", "mtqZmJGYn3vdEMTIBW", "Ahr0Chm6lY9PlwfYy2GTndaWlMTLEw1Pnde3zxH4lMnVBs8", "yxrTB3m", "ihWG8j+mKcbxruiTuMLW", "Ahr0Chm6lY9UzxC0lNPPBMTJBg91zc5UzxqVC2vYDMvYlwHHBMrSzxiUCgHW", "zM9SzgvY", "ihWG8j+mIcbirfiXmcS", "ndHXC2vpBuG", "ihWG8j+mIcbtrfi", "zMXVB3i", "t3jPz2LUywWTqxvKAw8", "AgLUzgK", "BM93", "Agv2yW", "zMLYC3rFywLYx2rHDgu", "ChjVCgvYDhLjC0vUDw1LCMfIBgu", "zw4TvvmSzw47Ct0WlJu", "Ahr0Chm6lY9HCgKUDgHLBw92AwvKyI5VCMCVmY8", "BMv4Da", "CMvZB2X2zq", "yxbWBgLJyxrPB24VANnVBG", "D2vIlxjPCa", "zg9SyNKGDMLZAw9U", "BxvSDgK", "txvSDgKTqxvKAw8", "tw96AwXSys81lJaGkeXPBNv4oYbbBMrYB2LKide0oYbqAxHLBca4ifbYBYKGqxbWBgvxzwjlAxqVntm3lJm2icHlsfrntcWGBgLRzsbhzwnRBYKGq2HYB21LlZeYnc4WlJaUmcbnB2jPBguGu2fMyxjPlZuZnY4ZnG", "vw5RBM93BIbtAxPL", "tw96AwXSys81lJaGkgLqAg9UztSGq1bvigLqAg9UzsbpuYaXn18WigXPA2uGtwfJie9tifGPiefWCgXLv2vIs2L0lZyWns4XlJe1icHlsfrntcWGBgLRzsbhzwnRBYKGvMvYC2LVBI8XnY4Wie1VyMLSzs8XnuuXndGGu2fMyxjPlZyWnc4X", "EMLUA21VDMLLCW", "DgvSDwD1", "mta4ma", "ChvZAa"];
  _0x24a9 = function() {
    return _0x254aa7;
  };
  return _0x24a9();
}
function fetchText(_0x2e5a0c, _0x52fa21) {
  return __async2(this, null, function* () {
    const _0x487faf = _0x4dda;
    try {
      const _0x25554d = yield Promise[_0x487faf(193)]([fetch(_0x2e5a0c, _0x52fa21 || {}), raceTimeout(FETCH_TIMEOUT)]);
      if (_0x25554d["ok"])
        return yield _0x25554d[_0x487faf(225)]();
    } catch (_0x400ccf) {
    }
    return null;
  });
}
function fetchJson(_0x43ff6c, _0x4098ff) {
  const _0x3480a7 = { _0x2c0f06: 193 };
  return __async2(this, null, function* () {
    const _0x40bd45 = _0x4dda;
    try {
      const _0x117050 = yield Promise[_0x40bd45(_0x3480a7._0x2c0f06)]([fetch(_0x43ff6c, _0x4098ff || {}), raceTimeout(FETCH_TIMEOUT)]);
      if (_0x117050["ok"])
        return yield _0x117050[_0x40bd45(182)]();
    } catch (_0x582f62) {
    }
    return null;
  });
}
function _0x4dda(_0x2b3092, _0x5894f1) {
  _0x2b3092 = _0x2b3092 - 113;
  const _0x24a93f = _0x24a9();
  let _0x4dda9e = _0x24a93f[_0x2b3092];
  if (_0x4dda["HCylnp"] === void 0) {
    var _0x37a8d2 = function(_0x1f1486) {
      const _0x2c7d10 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
      let _0x1da1f9 = "", _0x54ab6e = "";
      for (let _0x3b9027 = 0, _0x1b5dc7, _0x4cfce2, _0x332c7a = 0; _0x4cfce2 = _0x1f1486["charAt"](_0x332c7a++); ~_0x4cfce2 && (_0x1b5dc7 = _0x3b9027 % 4 ? _0x1b5dc7 * 64 + _0x4cfce2 : _0x4cfce2, _0x3b9027++ % 4) ? _0x1da1f9 += String["fromCharCode"](255 & _0x1b5dc7 >> (-2 * _0x3b9027 & 6)) : 0) {
        _0x4cfce2 = _0x2c7d10["indexOf"](_0x4cfce2);
      }
      for (let _0x5f27bd = 0, _0x107c28 = _0x1da1f9["length"]; _0x5f27bd < _0x107c28; _0x5f27bd++) {
        _0x54ab6e += "%" + ("00" + _0x1da1f9["charCodeAt"](_0x5f27bd)["toString"](16))["slice"](-2);
      }
      return decodeURIComponent(_0x54ab6e);
    };
    _0x4dda["CaQQQh"] = _0x37a8d2, _0x4dda["FGMCeQ"] = {}, _0x4dda["HCylnp"] = !![];
  }
  const _0x145590 = _0x24a93f[0], _0x422ea0 = _0x2b3092 + _0x145590, _0x7f2363 = _0x4dda["FGMCeQ"][_0x422ea0];
  return !_0x7f2363 ? (_0x4dda9e = _0x4dda["CaQQQh"](_0x4dda9e), _0x4dda["FGMCeQ"][_0x422ea0] = _0x4dda9e) : _0x4dda9e = _0x7f2363, _0x4dda9e;
}
function parseQuality(_0x3713dc) {
  const _0x2720c5 = { _0x4a20c4: 228 }, _0x18f183 = _0x4e9a2b, _0x4262f4 = _0x3713dc[_0x18f183(_0x2720c5._0x4a20c4)](/(2160|1080|720|480)\s*P/i);
  if (_0x4262f4)
    return _0x4262f4[1] + "p";
  if (/4K|UHD/i[_0x18f183(154)](_0x3713dc))
    return "2160p";
  return "HD";
}
function parseSize(_0x4a3a15) {
  const _0x5d07ae = _0x4e9a2b;
  if (!_0x4a3a15)
    return "Unknown Size";
  const _0x53cbd1 = _0x4a3a15["match"](/(\d+(?:\.\d+)?\s*(?:GB|MB|gb|mb))/);
  return _0x53cbd1 ? _0x53cbd1[1][_0x5d07ae(163)]() : _0x5d07ae(138);
}
function cleanHubTitle(_0x3d7c14) {
  const _0x1e5643 = { _0x5b6dbd: 177, _0x457f9d: 213, _0x5e42ee: 177, _0x50811e: 213 }, _0x1e9368 = _0x4e9a2b;
  let _0x3f1b2b = _0x3d7c14[_0x1e9368(_0x1e5643._0x5b6dbd)](/\.(mkv|mp4|avi)$/i, "")[_0x1e9368(_0x1e5643._0x457f9d)]();
  return _0x3f1b2b = _0x3f1b2b["replace"](/\s*[-–—]\s*ZINKMOVIES.*/i, "")[_0x1e9368(213)](), _0x3f1b2b = _0x3f1b2b[_0x1e9368(_0x1e5643._0x5b6dbd)](/\s*[-–—]\s*JiTU.*/i, "")["trim"](), _0x3f1b2b = _0x3f1b2b[_0x1e9368(_0x1e5643._0x5e42ee)](/\s+(IMAX\s+)?(2160|1080|720|480)\s*[pP].*/i, "")[_0x1e9368(_0x1e5643._0x50811e)](), _0x3f1b2b = _0x3f1b2b[_0x1e9368(177)](/\s+4K\s+.*/i, "")[_0x1e9368(_0x1e5643._0x50811e)](), _0x3f1b2b[_0x1e9368(213)]() || _0x3d7c14;
}
function buildDropdownMetadata(_0x4cbaeb, _0x181f17, _0x44c943, _0x49284a, _0x136472, _0x1f07e9, _0x42c68c, _0x5329a9) {
  const _0x3c600a = { _0x31eeed: 217, _0x2a203a: 185, _0x56ac19: 147, _0x42beff: 202, _0xc7cf1a: 155, _0x583422: 187, _0x33c345: 155, _0x8a5413: 156, _0x43f47b: 142, _0x5c9ed1: 122, _0x110e38: 135, _0x2b2a12: 146, _0x174678: 169, _0x136abe: 125, _0x1dce2d: 215, _0x24f8b1: 192, _0x51902c: 197, _0x1dd81f: 120, _0x1c428c: 206, _0x2aba7b: 155, _0xc2678c: 175, _0x494250: 155, _0x482af9: 114, _0x16abde: 114, _0x4ddd47: 181, _0x1689fc: 155 }, _0x518b84 = _0x4e9a2b, _0x17bf01 = (_0x44c943 ? _0x4cbaeb[_0x518b84(160)] : _0x4cbaeb[_0x518b84(191)]) || "Unknown Title", _0x5f52a7 = _0x44c943 ? (_0x4cbaeb["first_air_date"] || "")[_0x518b84(185)]("-")[0] : (_0x4cbaeb[_0x518b84(_0x3c600a._0x31eeed)] || "")[_0x518b84(_0x3c600a._0x2a203a)]("-")[0], _0xc697b2 = _0x5f52a7 ? " (" + _0x5f52a7 + ")" : "";
  let _0x5e685c = "";
  try {
    if (_0x5329a9)
      _0x5e685c = decodeURIComponent(_0x5329a9);
  } catch (_0x5bdc05) {
    _0x5e685c = _0x5329a9 || "";
  }
  const _0x30fa94 = (String(_0x42c68c) + " " + _0x5e685c)[_0x518b84(202)]();
  let _0x107fd7 = "\u{1F3AC} " + _0x17bf01 + " - " + _0xc697b2;
  _0x44c943 && _0x49284a && _0x136472 && (_0x107fd7 += _0x518b84(176) + String(_0x49284a)[_0x518b84(_0x3c600a._0x56ac19)](2, "0") + "E" + String(_0x136472)[_0x518b84(_0x3c600a._0x56ac19)](2, "0"));
  let _0x5b86f9 = String(_0x181f17)[_0x518b84(_0x3c600a._0x42beff)]()["replace"](/p/g, "") + "p";
  if (_0x30fa94[_0x518b84(_0x3c600a._0xc7cf1a)](_0x518b84(_0x3c600a._0x583422)) || _0x30fa94["includes"]("4k") || _0x30fa94["includes"]("uhd"))
    _0x5b86f9 = _0x518b84(187);
  else {
    if (_0x30fa94[_0x518b84(155)]("1080p"))
      _0x5b86f9 = _0x518b84(166);
    else {
      if (_0x30fa94[_0x518b84(_0x3c600a._0x33c345)](_0x518b84(156)))
        _0x5b86f9 = _0x518b84(_0x3c600a._0x8a5413);
    }
  }
  let _0x1f7b62 = "\u{1F48E}";
  if (_0x5b86f9["includes"](_0x518b84(222)) || _0x5b86f9["includes"]("4k"))
    _0x1f7b62 = "\u{1F31F}";
  else {
    if (_0x5b86f9[_0x518b84(155)](_0x518b84(_0x3c600a._0x43f47b)))
      _0x1f7b62 = "\u{1F525}";
  }
  let _0x3687ed = _0x518b84(_0x3c600a._0x5c9ed1);
  const _0x226b49 = [_0x518b84(_0x3c600a._0x110e38), "dual", "hindi", "tamil", "telugu", _0x518b84(208), "malayalam", "kannada", _0x518b84(_0x3c600a._0x2b2a12), "punjabi"];
  _0x226b49["some"]((_0x4e68ae) => _0x30fa94["includes"](_0x4e68ae)) && (_0x3687ed = _0x518b84(136));
  const _0x33fbd6 = parseSize(_0x42c68c), _0x39a0c5 = _0x1f7b62 + " " + _0x5b86f9 + " | \u{1F30D} " + _0x3687ed + _0x518b84(_0x3c600a._0x174678) + _0x33fbd6, _0x32303f = _0x5329a9["includes"](".mp4") ? _0x518b84(194) : _0x518b84(227);
  let _0x13bdcf = "\u{1F3A5} H.264";
  if (_0x30fa94[_0x518b84(_0x3c600a._0x33c345)](_0x518b84(_0x3c600a._0x136abe)) || _0x30fa94[_0x518b84(155)]("x265") || _0x30fa94["includes"](_0x518b84(153)))
    _0x13bdcf = _0x30fa94[_0x518b84(155)]("hevc") ? "\u26A1 HEVC" : _0x518b84(_0x3c600a._0x1dce2d);
  else
    _0x30fa94["includes"](_0x518b84(144)) && (_0x13bdcf = "\u{1F3A5} H.264");
  let _0x45246f = "";
  if (_0x30fa94["includes"]("hdr10+"))
    _0x45246f = _0x518b84(118);
  else {
    if (_0x30fa94["includes"](_0x518b84(_0x3c600a._0x24f8b1)))
      _0x45246f = " | \u{1F308} HDR";
    else {
      if (_0x30fa94[_0x518b84(155)](_0x518b84(_0x3c600a._0x51902c)))
        _0x45246f = _0x518b84(_0x3c600a._0x1dd81f);
    }
  }
  let _0x1a3dc3 = "";
  if (_0x30fa94[_0x518b84(155)]("web-dl") || _0x30fa94["includes"](_0x518b84(_0x3c600a._0x1c428c)))
    _0x1a3dc3 = " | \u{1F4E5} WEB-DL";
  else {
    if (_0x30fa94["includes"](_0x518b84(133)) || _0x30fa94["includes"](_0x518b84(211)))
      _0x1a3dc3 = _0x518b84(115);
    else {
      if (_0x30fa94[_0x518b84(155)]("hd-rip") || _0x30fa94["includes"](_0x518b84(207)))
        _0x1a3dc3 = " | \u{1F4FA} HD-Rip";
      else {
        if (_0x30fa94[_0x518b84(_0x3c600a._0x2aba7b)]("bluray"))
          _0x1a3dc3 = " | \u{1F4BF} BluRay";
      }
    }
  }
  const _0x4f7bc5 = "\u{1F39E}\uFE0F " + _0x32303f + _0x45246f + _0x518b84(_0x3c600a._0xc2678c) + _0x13bdcf + _0x1a3dc3;
  let _0x283f75 = "\u{1F3B5} AAC";
  if (_0x30fa94[_0x518b84(_0x3c600a._0x2aba7b)](_0x518b84(178)) || _0x30fa94[_0x518b84(_0x3c600a._0x494250)]("ddp 5.1") || _0x30fa94[_0x518b84(155)](_0x518b84(_0x3c600a._0x482af9)))
    _0x283f75 = "\u{1F3B5} DDP 5.1";
  else {
    if (_0x30fa94[_0x518b84(155)]("truehd"))
      _0x283f75 = "\u{1F3B5} TrueHD";
  }
  let _0x22cd83 = "";
  if (_0x30fa94["includes"](_0x518b84(_0x3c600a._0x16abde)))
    _0x22cd83 = _0x518b84(_0x3c600a._0x4ddd47);
  else {
    if (_0x30fa94[_0x518b84(_0x3c600a._0x1689fc)]("dv") || _0x30fa94["includes"](_0x518b84(134)))
      _0x22cd83 = _0x518b84(188);
  }
  const _0x58211f = _0x283f75 + _0x22cd83, _0x119fab = "\u{1F517} " + _0x1f07e9;
  return _0x107fd7 + " " + _0x39a0c5 + " " + _0x4f7bc5 + " " + _0x58211f + " " + _0x119fab;
}
function makeStream(_0x485b11, _0xce794a, _0x28a8cd, _0xd77dc5, _0x2afeb2, _0x1cfaa6, _0x475586, _0x4c08ed) {
  const _0x456dde = { _0x5e489d: 202, _0x4ac45a: 172, _0x1c459d: 123, _0x23a8e1: 146, _0x18646c: 175 }, _0xb2c16f = _0x4e9a2b, _0x171381 = _0x28a8cd[_0xb2c16f(202)](), _0x47d84e = buildDropdownMetadata(_0x485b11, _0x171381, _0x1cfaa6, _0x475586, _0x4c08ed, _0xd77dc5, _0xce794a, _0x2afeb2);
  let _0x2688b9 = _0xb2c16f(122);
  const _0x26144c = (_0xce794a + " " + _0x2afeb2)[_0xb2c16f(_0x456dde._0x5e489d)](), _0x177c40 = ["multi", _0xb2c16f(_0x456dde._0x4ac45a), _0xb2c16f(_0x456dde._0x1c459d), "tamil", _0xb2c16f(141), "bengali", "malayalam", _0xb2c16f(179), _0xb2c16f(_0x456dde._0x23a8e1), "punjabi"];
  return _0x177c40[_0xb2c16f(184)]((_0x4a3f87) => _0x26144c["includes"](_0x4a3f87)) && (_0x2688b9 = "Multi-Audio"), { "name": PROVIDER_NAME + _0xb2c16f(_0x456dde._0x18646c) + _0x171381 + " | " + _0x2688b9, "title": _0x47d84e, "size": _0x47d84e, "description": _0x47d84e, "url": _0x2afeb2, "quality": "", "language": "" };
}
function resolveTpiLink(_0xa0e161) {
  const _0x5783f5 = { _0xb2382d: 220, _0x315228: 158 };
  return __async2(this, null, function* () {
    const _0x1f4ee5 = _0x4dda;
    try {
      const _0x98b025 = yield fetchText(_0xa0e161, { "headers": hdrs({ "Referer": baseUrl + "/" }) });
      if (!_0x98b025)
        return null;
      const _0x389a75 = _0x98b025["match"](/<input\s+type="hidden"\s+name="token"\s+value="([^"]+)"/i);
      if (!_0x389a75)
        return null;
      const _0x48af9d = _0x389a75[1][_0x1f4ee5(_0x5783f5._0xb2382d)](_0x1f4ee5(164));
      if (_0x48af9d < 0)
        return null;
      const _0x530676 = atob(_0x389a75[1][_0x1f4ee5(_0x5783f5._0x315228)](_0x48af9d));
      return _0x530676[_0x1f4ee5(200)](_0x1f4ee5(145)) ? _0x530676 : null;
    } catch (_0x208532) {
    }
    return null;
  });
}
function serverHandler(_0x885959, _0x363984) {
  const _0x344bcf = { _0x47cfdf: 116, _0x362588: 132, _0x32b2f7: 182, _0x514897: 201 };
  return __async2(this, null, function* () {
    const _0x53c408 = _0x4dda;
    try {
      const _0x2d0438 = yield Promise[_0x53c408(193)]([fetch(_0x53c408(_0x344bcf._0x47cfdf), { "method": "POST", "headers": { "Content-Type": _0x53c408(_0x344bcf._0x362588), "X-Requested-With": "XMLHttpRequest", "User-Agent": currentUA }, "body": JSON["stringify"]({ "server": _0x363984, "random_id": _0x885959 }) }), raceTimeout(FETCH_TIMEOUT)]), _0x3cb59b = yield _0x2d0438[_0x53c408(_0x344bcf._0x32b2f7)]();
      if ((_0x3cb59b == null ? void 0 : _0x3cb59b[_0x53c408(_0x344bcf._0x514897)]) && _0x3cb59b["url"])
        return _0x3cb59b["url"];
    } catch (_0x20667e) {
    }
    return null;
  });
}
function processFile(_0x473301, _0x4734a1, _0x591063, _0x3efeb6, _0xa5e450, _0x93e92c, _0x57b536) {
  const _0x4121d1 = { _0x1cdf14: 157, _0x23ea62: 228, _0x37b1ee: 128, _0x275d4b: 213, _0x2ecde3: 154, _0x41b15c: 150 };
  return __async2(this, null, function* () {
    const _0x517b48 = _0x4dda, _0xb6c3e1 = _0x3efeb6 || parseQuality(_0x591063), _0x10b578 = [];
    if (_0xb6c3e1["toUpperCase"]() === _0x517b48(214))
      return _0x10b578;
    const [_0x5d7d6e, _0x282e54] = yield Promise["all"]([serverHandler(_0x4734a1, _0x517b48(_0x4121d1._0x1cdf14)), serverHandler(_0x4734a1, "worker")]);
    let _0x15cd4 = _0x591063;
    if (_0x5d7d6e) {
      const _0xee024c = yield fetchText(_0x5d7d6e, { "headers": hdrs() });
      if (_0xee024c) {
        const _0x28961d = (_0xee024c[_0x517b48(_0x4121d1._0x23ea62)](/<title>(.*?)<\/title>/i) || [])[1] || "", _0x194627 = cleanHubTitle(_0x28961d);
        _0x15cd4 = _0x194627 ? _0x194627 + " " + parseSize(_0x591063) : _0x591063;
        const _0x5baabd = _0xee024c["match"](/href="(https:\/\/gamerxyt\.com[^"]+)"/i);
        if (_0x5baabd) {
          const _0x499a87 = _0x5baabd[1]["replace"](/&amp;/g, "&"), _0x3f825d = yield fetchText(_0x499a87, { "headers": { "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:152.0) Gecko/20100101 Firefox/152.0", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": _0x517b48(_0x4121d1._0x37b1ee), "Referer": _0x5d7d6e, "DNT": "1", "Cookie": _0x517b48(204) } });
          if (_0x3f825d && _0x3f825d["length"] > 500) {
            const _0x52f54d = [], _0x893335 = /<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
            let _0x8702b0;
            while ((_0x8702b0 = _0x893335[_0x517b48(196)](_0x3f825d)) !== null) {
              const _0xb7caa0 = _0x8702b0[1][_0x517b48(177)](/&amp;/g, "&"), _0xdb9604 = _0x8702b0[2][_0x517b48(177)](/<[^>]+>/g, "")[_0x517b48(_0x4121d1._0x275d4b)]();
              if (!_0xb7caa0 || _0xb7caa0["includes"]("javascript:") || /telegram|tg\/|pixeldrain|hubcloud\.cx|gpdl2/i["test"](_0xb7caa0))
                continue;
              if (!/cdn\.fsl-buckets\.life|r2\.cloudflarestorage|r2\.dev|workers\.dev|hub\.(latent|whistle)/i[_0x517b48(154)](_0xb7caa0))
                continue;
              const _0x4b4efb = /workers\.dev/i[_0x517b48(_0x4121d1._0x2ecde3)](_0xb7caa0) ? "Worker" : "FSLv2", _0x56ace9 = _0xdb9604[_0x517b48(_0x4121d1._0x23ea62)](/(2160|1080|720|480)\s*[pP]/i);
              _0x52f54d[_0x517b48(143)]({ "url": _0xb7caa0, "type": _0x4b4efb, "quality": _0x56ace9 ? _0x56ace9[1] + "p" : "" });
            }
            for (const _0xa19458 of _0x52f54d)
              _0x10b578["push"](makeStream(_0x473301, _0x15cd4, _0xa19458[_0x517b48(212)] || _0xb6c3e1, _0xa19458[_0x517b48(_0x4121d1._0x41b15c)], _0xa19458["url"], _0xa5e450, _0x93e92c, _0x57b536));
          }
        }
      }
    }
    if (_0x282e54)
      _0x10b578["push"](makeStream(_0x473301, _0x15cd4, _0xb6c3e1, "Worker", _0x282e54, _0xa5e450, _0x93e92c, _0x57b536));
    return _0x10b578;
  });
}
function extractConfig(_0xb57376) {
  try {
    const _0x4e10bf = _0xb57376["match"](/new HDVBPlayer\((\{[\s\S]*?\})\)/);
    if (_0x4e10bf)
      return JSON["parse"](_0x4e10bf[1]);
    const _0x4303e1 = _0xb57376["match"](/(?:let|var|const)\s+\w+\s*=\s*(\{[\s\S]*?"file":[\s\S]*?\});/);
    if (_0x4303e1)
      return JSON["parse"](_0x4303e1[1]);
  } catch (_0x990238) {
  }
  return null;
}
function getGemmaStreams(_0x990de8, _0x2a6789, _0x2e19d2, _0x5e2a52, _0x41036f, _0x5d4a8c) {
  const _0x685cbe = { _0x46aef5: 189, _0x1d2685: 155, _0x120e61: 203, _0x3e11ed: 117, _0x49a2ac: 189, _0x233545: 189, _0x4f6869: 200, _0x946388: 189, _0x439685: 158, _0x5b856c: 223, _0x43d64f: 152, _0x361a61: 191, _0x450dff: 143, _0x37e174: 180, _0x101083: 113 };
  return __async2(this, null, function* () {
    const _0x14976e = _0x4dda, _0x5a87b4 = [];
    try {
      const _0x2f353e = "https://gemma416okl.com/play/" + _0x2a6789, _0x2b50c8 = yield fetchText(_0x2f353e, { "headers": hdrs({ "Referer": baseUrl + "/" }) });
      if (!_0x2b50c8)
        return _0x5a87b4;
      const _0x523c7e = extractConfig(_0x2b50c8);
      if (!(_0x523c7e == null ? void 0 : _0x523c7e[_0x14976e(_0x685cbe._0x46aef5)]) || !(_0x523c7e == null ? void 0 : _0x523c7e["key"]))
        return _0x5a87b4;
      let _0xd9ba17 = _0x523c7e[_0x14976e(189)];
      if (!_0xd9ba17[_0x14976e(_0x685cbe._0x1d2685)]("://"))
        _0xd9ba17 = "https://gemma416okl.com" + _0xd9ba17;
      const _0x3acc1c = _0x523c7e["key"], _0x2cedcf = yield fetchJson(_0xd9ba17, { "method": _0x14976e(_0x685cbe._0x120e61), "headers": { "X-CSRF-TOKEN": _0x3acc1c, "Content-Type": "application/x-www-form-urlencoded", "Origin": "https://gemma416okl.com", "Referer": _0x2f353e } });
      if (!_0x2cedcf)
        return _0x5a87b4;
      const _0x16a03b = _0xd9ba17["substring"](0, _0xd9ba17["lastIndexOf"]("/") + 1);
      let _0xfac629 = [];
      if (_0x2e19d2)
        for (const _0x2980f0 of _0x2cedcf) {
          if (_0xfac629["length"])
            break;
          if (_0x2980f0["id"] == _0x5e2a52 || _0x2980f0["title"] && _0x2980f0["title"][_0x14976e(_0x685cbe._0x1d2685)](String(_0x5e2a52))) {
            if (!_0x2980f0["folder"])
              continue;
            for (const _0x2a92b3 of _0x2980f0["folder"]) {
              if (_0x2a92b3[_0x14976e(205)] == _0x41036f || _0x2a92b3["id"] == _0x5e2a52 + "-" + _0x41036f) {
                if (!_0x2a92b3[_0x14976e(_0x685cbe._0x3e11ed)])
                  continue;
                for (const _0x118ae6 of _0x2a92b3[_0x14976e(_0x685cbe._0x3e11ed)]) {
                  if (_0x118ae6[_0x14976e(_0x685cbe._0x49a2ac)] && _0x118ae6[_0x14976e(_0x685cbe._0x233545)][_0x14976e(_0x685cbe._0x4f6869)]("~"))
                    _0xfac629["push"](_0x118ae6);
                }
              }
            }
          }
        }
      else
        for (const _0x57377b of _0x2cedcf) {
          if (_0x57377b[_0x14976e(189)] && _0x57377b[_0x14976e(_0x685cbe._0x946388)][_0x14976e(_0x685cbe._0x4f6869)]("~"))
            _0xfac629["push"](_0x57377b);
        }
      for (const _0x5bcac2 of _0xfac629) {
        const _0x11eae9 = "" + _0x16a03b + _0x5bcac2["file"][_0x14976e(_0x685cbe._0x439685)](1) + _0x14976e(168), _0x426388 = yield fetchText(_0x11eae9, { "method": "POST", "headers": { "X-CSRF-TOKEN": _0x3acc1c, "Content-Type": _0x14976e(_0x685cbe._0x5b856c), "Origin": "https://gemma416okl.com", "Referer": _0x2f353e } });
        if (_0x426388 && _0x426388[_0x14976e(155)](_0x14976e(_0x685cbe._0x43d64f))) {
          const _0x35eada = buildDropdownMetadata(_0x990de8, "HD", _0x2e19d2, _0x5e2a52, _0x41036f, "Embed", _0x5bcac2[_0x14976e(_0x685cbe._0x361a61)] || _0x14976e(221), _0x426388), _0x3d84e0 = _0x5bcac2["title"] ? " | " + _0x5bcac2[_0x14976e(191)] : "";
          _0x5a87b4[_0x14976e(_0x685cbe._0x450dff)]({ "name": PROVIDER_NAME + _0x14976e(_0x685cbe._0x37e174) + _0x3d84e0, "title": _0x35eada, "size": _0x35eada, "description": _0x35eada, "url": _0x426388["trim"](), "quality": "", "language": "", "headers": { "origin": "https://i-arch-400.keymi417exx.com", "referer": _0x14976e(_0x685cbe._0x101083) } });
        }
      }
    } catch (_0x4ca536) {
    }
    return _0x5a87b4;
  });
}
function scrapeZinkCloud(_0x237e2a, _0x1e580e, _0x197f2e, _0x5119ab, _0x536b1d, _0x284dd3) {
  const _0x4c077b = { _0x3684dd: 155, _0xf1232f: 228, _0x213ed5: 177, _0x57f868: 218, _0x463316: 213, _0x2e4306: 143, _0x5467fc: 173 };
  return __async2(this, null, function* () {
    const _0x3d8b42 = { _0x142c21: 228 }, _0x509d9a = _0x4dda, _0x102c81 = [];
    try {
      const _0x374a6b = yield fetchText(baseUrl + _0x509d9a(170) + encodeURIComponent(_0x1e580e));
      if (!_0x374a6b)
        return _0x102c81;
      const _0x32a51e = _0x5119ab ? "tvshows" : "movies", _0x3839e8 = new RegExp('href="(https?:\\/\\/[^\\/]+\\/' + _0x32a51e + '\\/([^"]+))"', "ig");
      let _0x14b853, _0x537def;
      while ((_0x537def = _0x3839e8[_0x509d9a(196)](_0x374a6b)) !== null) {
        if (!_0x197f2e || _0x537def[1][_0x509d9a(_0x4c077b._0x3684dd)](_0x197f2e)) {
          _0x14b853 = _0x537def[1];
          break;
        }
      }
      if (!_0x14b853)
        return _0x102c81;
      const _0x2472a9 = yield fetchText(_0x14b853);
      if (!_0x2472a9)
        return _0x102c81;
      if (_0x5119ab) {
        let _0x33ee58 = null, _0x52d50a = "", _0x4b2a79 = "";
        const _0x1048a1 = _0x2472a9["split"]('<div class="seriecontainer">');
        for (let _0x552e2e = 1; _0x552e2e < _0x1048a1["length"]; _0x552e2e++) {
          const _0x2021e1 = _0x1048a1[_0x552e2e]["indexOf"](_0x509d9a(199)), _0x11dcce = _0x2021e1 >= 0 ? _0x1048a1[_0x552e2e]["substring"](0, _0x2021e1) : _0x1048a1[_0x552e2e], _0xb48b58 = _0x11dcce[_0x509d9a(228)](/<p>([\s\S]*?)<\/p>/i);
          if (!_0xb48b58)
            continue;
          const _0x4f23cc = _0xb48b58[1][_0x509d9a(_0x4c077b._0xf1232f)](/Season\s*0?(\d+)/i);
          if (!_0x4f23cc || parseInt(_0x4f23cc[1]) !== _0x536b1d)
            continue;
          const _0x502c84 = [], _0x428274 = /href="(https:\/\/tpi\.li\/[^"]+)"[^>]*>[\s\S]*?<span>([\s\S]*?)<\/span>/ig;
          let _0x538693;
          while ((_0x538693 = _0x428274["exec"](_0x11dcce)) !== null) {
            const _0x320453 = _0x538693[2][_0x509d9a(_0x4c077b._0x213ed5)](/<[^>]+>/g, "")[_0x509d9a(213)](), _0x3954aa = parseQuality(_0x320453);
            if (_0x3954aa[_0x509d9a(163)]() !== "480P")
              _0x502c84["push"]({ "tpiUrl": _0x538693[1], "quality": _0x3954aa, "label": _0x320453 });
          }
          _0x502c84[_0x509d9a(_0x4c077b._0x57f868)]((_0x5304a6, _0x25b33a) => (parseInt(_0x25b33a[_0x509d9a(212)]) || 0) - (parseInt(_0x5304a6["quality"]) || 0));
          _0x502c84["length"] && (_0x33ee58 = _0x502c84[0]["tpiUrl"], _0x52d50a = _0x502c84[0]["quality"], _0x4b2a79 = _0x502c84[0]["label"]);
          break;
        }
        if (_0x33ee58) {
          const _0x27f81a = yield resolveTpiLink(_0x33ee58);
          if (_0x27f81a) {
            const _0x464fcd = yield fetchText(_0x27f81a, { "headers": hdrs() });
            if (_0x464fcd) {
              const _0x7b0080 = [], _0x564461 = /href="(https:\/\/new3\.zinkcloud\.net\/file\/([^"]+))"[^>]*>\s*<span[^>]*>(.*?)<\/span>/ig;
              while ((_0x537def = _0x564461[_0x509d9a(196)](_0x464fcd)) !== null) {
                const _0x1fdf9a = _0x537def[3]["replace"](/<[^>]+>/g, "")[_0x509d9a(_0x4c077b._0x463316)]();
                if (_0x1fdf9a["toLowerCase"]()["includes"]("all episodes"))
                  continue;
                const _0x57832f = _0x1fdf9a["match"](/(?:EPISODE|EP|E)\s*[-_]?\s*0?(\d+)/i);
                _0x57832f && parseInt(_0x57832f[1]) === _0x284dd3 && _0x7b0080["push"]({ "id": _0x537def[2], "label": _0x1fdf9a + " " + _0x4b2a79, "quality": _0x52d50a });
              }
              const _0x339e17 = yield Promise["all"](_0x7b0080["map"]((_0x2a689f) => processFile(_0x237e2a, _0x2a689f["id"], _0x2a689f["label"], _0x2a689f["quality"], !![], _0x536b1d, _0x284dd3)));
              for (const _0x4ad386 of _0x339e17["flat"]())
                _0x102c81[_0x509d9a(_0x4c077b._0x2e4306)](_0x4ad386);
            }
          }
        }
      } else {
        const _0x4727b0 = [], _0x92a8a7 = /href="(https:\/\/tpi\.li\/[^"]+)"[^>]*>[\s\S]*?<span>([\s\S]*?)<\/span>/ig;
        while ((_0x537def = _0x92a8a7[_0x509d9a(196)](_0x2472a9)) !== null) {
          _0x4727b0["push"]({ "tpiUrl": _0x537def[1], "label": _0x537def[2][_0x509d9a(177)](/<[^>]+>/g, "")["trim"]() });
        }
        if (_0x4727b0["length"]) {
          const _0x22b3e1 = yield Promise["all"](_0x4727b0["map"]((_0x19e96f) => __async2(this, null, function* () {
            const _0x3e5924 = _0x509d9a, _0x5bacc7 = yield resolveTpiLink(_0x19e96f["tpiUrl"]);
            if (!_0x5bacc7)
              return null;
            const _0x733cf5 = _0x5bacc7[_0x3e5924(_0x3d8b42._0x142c21)](/\/file\/([^\/]+)$/);
            return _0x733cf5 ? { "id": _0x733cf5[1], "label": _0x19e96f["label"] } : null;
          }))), _0x32049a = _0x22b3e1["filter"](Boolean), _0x91bd61 = yield Promise["all"](_0x32049a[_0x509d9a(_0x4c077b._0x5467fc)]((_0x3bb527) => processFile(_0x237e2a, _0x3bb527["id"], _0x3bb527["label"], null, ![], 0, 0)));
          for (const _0x5253a6 of _0x91bd61[_0x509d9a(219)]())
            _0x102c81[_0x509d9a(143)](_0x5253a6);
        }
      }
    } catch (_0x4908fe) {
    }
    return _0x102c81;
  });
}
function getStreams(_0x530d4d, _0x536ff7, _0x292943, _0x482b8d) {
  const _0x240181 = { _0x4c5adb: 159, _0x53bc2c: 129, _0x482c15: 186, _0x4973c3: 160, _0x14363: 191, _0x114443: 126, _0x5cf05c: 147, _0x247d31: 216, _0x3124dd: 143 };
  return __async2(this, null, function* () {
    const _0xa711c9 = { _0x2112dd: 187, _0x3e8e6a: 166 }, _0x28cf9c = _0x4dda;
    yield refreshDomains(), currentUA = UAS[Math[_0x28cf9c(121)](Math["random"]() * UAS[_0x28cf9c(_0x240181._0x4c5adb)])];
    const _0x5ed221 = _0x536ff7 === "series" || _0x536ff7 === "tv", _0x272d37 = [];
    let _0x58b65c = "", _0x45a91c = null;
    try {
      _0x45a91c = yield fetchJson(_0x28cf9c(_0x240181._0x53bc2c) + (_0x5ed221 ? "tv" : _0x28cf9c(216)) + "/" + _0x530d4d + _0x28cf9c(_0x240181._0x482c15) + TMDB_API_KEY);
      if (_0x45a91c) {
        const _0x3e6917 = _0x5ed221 ? _0x45a91c[_0x28cf9c(_0x240181._0x4973c3)] : _0x45a91c[_0x28cf9c(_0x240181._0x14363)], _0x3a6ab3 = _0x5ed221 ? (_0x45a91c[_0x28cf9c(_0x240181._0x114443)] || "")["split"]("-")[0] : (_0x45a91c[_0x28cf9c(217)] || "")["split"]("-")[0];
        _0x58b65c = _0x5ed221 ? _0x3e6917 + " S" + String(_0x292943)[_0x28cf9c(147)](2, "0") + "E" + String(_0x482b8d)[_0x28cf9c(_0x240181._0x5cf05c)](2, "0") : "" + _0x3e6917 + (_0x3a6ab3 ? " (" + _0x3a6ab3 + ")" : "");
        const _0x243008 = yield scrapeZinkCloud(_0x45a91c, _0x3e6917, _0x3a6ab3, _0x5ed221, _0x292943, _0x482b8d);
        for (const _0x9f56ef of _0x243008)
          _0x272d37[_0x28cf9c(143)](_0x9f56ef);
      }
    } catch (_0x44c8b0) {
    }
    if (_0x45a91c)
      try {
        const _0x1ed05b = yield fetchJson("https://api.tmdb.org/3/" + (_0x5ed221 ? "tv" : _0x28cf9c(_0x240181._0x247d31)) + "/" + _0x530d4d + "/external_ids?api_key=" + TMDB_API_KEY);
        if (_0x1ed05b == null ? void 0 : _0x1ed05b["imdb_id"]) {
          const _0x2ccdaf = yield getGemmaStreams(_0x45a91c, _0x1ed05b["imdb_id"], _0x5ed221, _0x292943, _0x482b8d, _0x58b65c);
          for (const _0x3d2eee of _0x2ccdaf)
            _0x272d37[_0x28cf9c(_0x240181._0x3124dd)](_0x3d2eee);
        }
      } catch (_0x1eb45e) {
      }
    function _0x31437a(_0x3bb34b) {
      const _0x130e1a = _0x28cf9c, _0x2f9f1f = _0x3bb34b["toLowerCase"]();
      if (_0x2f9f1f["includes"](_0x130e1a(_0xa711c9._0x2112dd)) || _0x2f9f1f[_0x130e1a(155)]("4k"))
        return 2160;
      if (_0x2f9f1f[_0x130e1a(155)](_0x130e1a(_0xa711c9._0x3e8e6a)))
        return 1080;
      if (_0x2f9f1f[_0x130e1a(155)]("720p"))
        return 720;
      return 0;
    }
    return _0x272d37["sort"]((_0xbfddd5, _0x31d6a0) => {
      const _0x898c87 = _0x28cf9c;
      return _0x31437a(_0x31d6a0["name"]) - _0x31437a(_0xbfddd5[_0x898c87(160)]);
    });
  });
}
typeof module !== "undefined" && module["exports"] ? module["exports"] = { "getStreams": getStreams } : global["getStreams"] = getStreams;
(function() {
  var _origGetStreams = typeof module !== "undefined" && module.exports && module.exports.getStreams || (typeof getStreams === "function" ? getStreams : typeof global !== "undefined" ? global.getStreams : null);
  if (typeof _origGetStreams !== "function")
    return;
  var TMDB_API_KEY_WRAP = "1865f43a0549ca50d341dd9ab8b29f49";
  var PROVIDER_NAME2 = "ZinkMovies";
  var PROVIDER_ID = "zinkmovies";
  var DEFAULT_LANG = "\u{1F1EE}\u{1F1F3} Hindi Dub";
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
    var rawSize = (opt.size && !opt.size.includes("\n")) ? opt.size : (sizeMatch ? sizeMatch[1] : "");
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
    var body = [line1, line2, line3, line4, line5].filter(Boolean).join(" ");
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
      name: opt.provider || "Stream",
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
          provider: PROVIDER_NAME2,
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
          title: card.title.replace(/[\r\n]+/g, " "), size: (card.size || "").replace(/[\r\n]+/g, " "), description: card.title.replace(/[\r\n]+/g, " "),
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
