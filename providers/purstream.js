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
function _0x506c() {
  var _0x3aa6ed = ["AxrLBxm", "l3nLyxjJAc1IyxiVC2vHCMnOlW", "jMXHBMD1ywDLpwvUlvvt", "ntm0mJmWowvqA3LqCG", "ihWG8j+xO++4JYa", "l2fWAs92mq", "Bw92AwvZ", "mJaZmda5odbPEe1wzxq", "C291CMnLx25HBwu", "nZiW", "EwvHCG", "odG0mdrMshPpAuS", "DxjSCW", "rhvHBc1bDwrPBW", "DgL0Bgu", "mJmXntC0neXfCe1NAW", "ndGYmdzRvgDfvgC", "otK4mJK1Dejvq3D0", "Dg9vChbLCKnHC2u", "ChvYC3rYzwfT", "B3jPz2LUywXFDgL0Bgu", "y2X1yG", "nKnKywXqtq", "Btn1oa", "m2TArLPACq", "B3jPzW", "Ahr0Chm6lY9HCgKUDgHLBw92AwvKyI5VCMCVmY90DI8", "C3bSAxq", "tvvmveK", "l3nLyxnVBI8", "CMvMzxjLCG", "Ahr0Chm6lY9HCgKUChvYC3rYzwfTlG", "Bw92Awu", "ic0G", "zMLYC3rFywLYx2rHDgu", "C291CMnLCW", "mta4mha", "ANnVBG", "Dg9mB3DLCKnHC2u", "CMvSzwfZzv9KyxrL", "rfvbta", "wdi2nq", "DxjS", "iokaOIa", "Ahr0Chm6lY9HCgKUDgHLBw92AwvKyI5VCMCVmY8", "zgf0yq", "zM9YBwf0", "zxHWB3j0CW", "zhvYyxrPB24", "uhvYC3rYzwfTihWG", "vK9tva", "BMfTzq", "nZiWCa", "8j+hQ/cFH7C", "vK9tvezs", "ttnvoa", "DgHLBG", "sc4YnJu", "zxbPC29Kzv9YDw5FDgLTzq", "Bwf0y2G", "ihWG", "BgvUz3rO", "ywjZ", "nZjXCg1srMC", "l2vWAxnVzguV", "mteXndi5u1vrDNHt", "sc4YnJq", "CMvWBgfJzq", "Aw5KzxHpzG", "z2v0u3rYzwfTCW", "l21LzgLHlW", "p2fWAv9RzxK9", "CNvUDgLTzq", "l3nOzwv0", "y2f0y2G", "l3n0CMvHBs8"];
  _0x506c = function() {
    return _0x3aa6ed;
  };
  return _0x506c();
}
var _0x580258 = _0x1911;
(function(_0x38a1c2, _0x17aa85) {
  var _0x51a50e = { _0x56420f: 554, _0x2a43bc: 558, _0x4d4e63: 560, _0x31df36: 546, _0x1785d0: 530, _0x5c1eac: 550 }, _0x1dc573 = _0x1911, _0x1bffda = _0x38a1c2();
  while (!![]) {
    try {
      var _0x1b9042 = -parseInt(_0x1dc573(491)) / 1 * (-parseInt(_0x1dc573(559)) / 2) + -parseInt(_0x1dc573(_0x51a50e._0x56420f)) / 3 + -parseInt(_0x1dc573(_0x51a50e._0x2a43bc)) / 4 + -parseInt(_0x1dc573(_0x51a50e._0x4d4e63)) / 5 + parseInt(_0x1dc573(565)) / 6 * (-parseInt(_0x1dc573(_0x51a50e._0x31df36)) / 7) + parseInt(_0x1dc573(_0x51a50e._0x1785d0)) / 8 * (-parseInt(_0x1dc573(532)) / 9) + parseInt(_0x1dc573(_0x51a50e._0x5c1eac)) / 10;
      if (_0x1b9042 === _0x17aa85)
        break;
      else
        _0x1bffda["push"](_0x1bffda["shift"]());
    } catch (_0x3ce656) {
      _0x1bffda["push"](_0x1bffda["shift"]());
    }
  }
})(_0x506c, 419728);
var DOMAINS_URL = "https://raw.githubusercontent.com/wooodyhood/nuvio-repo/main/domains.json", PURSTREAM_FALLBACK = _0x580258(564), PURSTREAM_API = "https://api.purstream." + PURSTREAM_FALLBACK + _0x580258(548), PURSTREAM_REFERER = "https://purstream." + PURSTREAM_FALLBACK + "/", PURSTREAM_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", TMDB_KEY = "f3d757824f08ea2cff45eb8f47ca3a1e", _cachedEndpoint = null;
function getTmdbDetails(_0x2f23a7, _0x21f96b) {
  var _0x51a677 = { _0x304943: 499, _0x2c882c: 538, _0x13bce8: 545 }, _0x511197 = { _0x43fc6a: 518, _0x706d36: 539 }, _0x2d3d5f = { _0x2046ce: 504 }, _0x117f97 = _0x580258, _0x2f14da = "https://api.tmdb.org/3/" + (_0x21f96b === "tv" ? "tv" : _0x117f97(_0x51a677._0x304943)) + "/" + _0x2f23a7 + _0x117f97(_0x51a677._0x2c882c) + TMDB_KEY + _0x117f97(_0x51a677._0x13bce8);
  return fetch(_0x2f14da)["then"](function(_0x4c9287) {
    var _0x2c9698 = _0x117f97;
    return _0x4c9287[_0x2c9698(_0x2d3d5f._0x2046ce)]();
  })["then"](function(_0x273189) {
    var _0x48ac8a = _0x117f97, _0x2c562c = _0x273189[_0x48ac8a(506)] || _0x273189["first_air_date"] || "";
    return { "enName": _0x273189["title"] || _0x273189[_0x48ac8a(_0x511197._0x43fc6a)] || "Purstream", "year": _0x2c562c ? _0x2c562c[_0x48ac8a(494)]("-")[0] : "", "duration": _0x21f96b === "movie" && _0x273189[_0x48ac8a(_0x511197._0x706d36)] ? _0x273189[_0x48ac8a(_0x511197._0x706d36)] + " min" : _0x21f96b === "tv" && _0x273189[_0x48ac8a(525)] && _0x273189[_0x48ac8a(525)][_0x48ac8a(528)] > 0 ? _0x273189["episode_run_time"][0] + " min" : "" };
  })[_0x117f97(541)](function() {
    return { "enName": "Purstream", "year": "", "duration": "" };
  });
}
function getEpisodeInfo(_0x525c63, _0x3fa140, _0x45d76b) {
  var _0x458986 = { _0x4ccced: 531, _0x13d35c: 523 }, _0x2e20d5 = { _0x102ad0: 518 }, _0x41680b = _0x580258;
  if (!_0x525c63 || !_0x3fa140 || !_0x45d76b)
    return Promise["resolve"](null);
  var _0x31e309 = _0x41680b(493) + _0x525c63 + _0x41680b(496) + _0x3fa140 + _0x41680b(_0x458986._0x4ccced) + _0x45d76b + "?api_key=" + TMDB_KEY + "&language=en-US";
  return fetch(_0x31e309)["then"](function(_0x4507ae) {
    var _0x5d4da4 = _0x41680b;
    return _0x4507ae[_0x5d4da4(504)]();
  })[_0x41680b(_0x458986._0x13d35c)](function(_0x4fc03a) {
    var _0x22c940 = _0x41680b;
    return { "name": _0x4fc03a[_0x22c940(_0x2e20d5._0x102ad0)] || null, "duration": _0x4fc03a["runtime"] ? _0x4fc03a["runtime"] + " min" : null };
  })[_0x41680b(541)](function() {
    return null;
  });
}
function buildPurstreamTitle(_0x24c2f6, _0x310b87, _0x2a3025, _0x3c8c25, _0x159a42, _0x480a76, _0x3e322a, _0x45fd1d) {
  var _0x4f39b4 = { _0x18495a: 520, _0x2c7450: 561, _0x15d8dd: 507, _0x5c503c: 553, _0xcb2aa9: 522, _0x354e3a: 561, _0x3b9acf: 533, _0x470736: 535, _0x4b0b3a: 524, _0x24c330: 515, _0x4a70af: 527, _0xa79864: 510 }, _0xdadf3c = _0x580258, _0x33741f = _0x310b87["toLowerCase"]()["replace"](/p/g, "") + "p", _0x201113 = "\u{1F525}", _0x31c5b6 = "VF", _0x4ca89f = _0xdadf3c(_0x4f39b4._0x18495a), _0x13dd2c = (String(_0x45fd1d) + " " + String(_0x2a3025))[_0xdadf3c(_0x4f39b4._0x2c7450)]();
  if (_0x13dd2c[_0xdadf3c(535)](_0xdadf3c(495)) !== -1 || _0x13dd2c["indexOf"](_0xdadf3c(_0x4f39b4._0x15d8dd)) !== -1)
    _0x31c5b6 = "Dual-Audio", _0x4ca89f = "\u{1F1FA}\u{1F1F8} \u2022 \u{1F1EB}\u{1F1F7}";
  else
    _0x13dd2c["indexOf"](_0xdadf3c(517)) !== -1 && (_0x31c5b6 = "VOSTFR", _0x4ca89f = "\u{1F1FA}\u{1F1F8} \u2022 \u{1F1EB}\u{1F1F7}");
  var _0x4b9c9f = "\u{1F3AC} ";
  _0x159a42 && _0x480a76 ? _0x4b9c9f += "S" + _0x159a42 + " E" + _0x480a76 + (_0x3e322a && _0x3e322a[_0xdadf3c(518)] ? _0xdadf3c(500) + _0x3e322a["name"] : "") + " | " + _0x24c2f6["enName"] : _0x4b9c9f += _0x24c2f6["enName"] + (_0x24c2f6[_0xdadf3c(_0x4f39b4._0x5c503c)] ? " - " + _0x24c2f6["year"] : "");
  var _0x555470 = _0x201113 + " " + _0x33741f + " | \u{1F50A} " + _0x31c5b6 + _0xdadf3c(547) + _0x4ca89f, _0x176d23 = (_0x3c8c25 || _0xdadf3c(_0x4f39b4._0xcb2aa9))[_0xdadf3c(_0x4f39b4._0x354e3a)](), _0x41647d = _0xdadf3c(_0x4f39b4._0x3b9acf);
  (_0x13dd2c["indexOf"]("HEVC") !== -1 || _0x13dd2c["indexOf"](_0xdadf3c(508)) !== -1 || _0x13dd2c[_0xdadf3c(_0x4f39b4._0x470736)]("H265") !== -1) && (_0x41647d = _0xdadf3c(_0x4f39b4._0x4b0b3a));
  var _0x3109f5 = _0x3e322a && _0x3e322a[_0xdadf3c(515)] ? _0x3e322a[_0xdadf3c(_0x4f39b4._0x24c330)] : _0x24c2f6[_0xdadf3c(_0x4f39b4._0x24c330)], _0x446916 = _0x3109f5 ? _0xdadf3c(_0x4f39b4._0x4a70af) + _0x3109f5 : "", _0x2ba5be = "\u{1F3AF} " + _0x176d23 + _0xdadf3c(_0x4f39b4._0xa79864) + _0x41647d + " | \u{1F3A7} AAC" + _0x446916;
  return _0x4b9c9f + "\n" + _0x555470 + "\n" + _0x2ba5be;
}
function detectPurstreamDomain() {
  var _0x27cee8 = { _0x2cecd8: 523, _0x278a89: 541 }, _0x3a49ed = { _0x53d990: 562, _0x35f2c1: 498, _0x132ccc: 548 }, _0x37cf5b = _0x580258;
  if (_cachedEndpoint)
    return Promise["resolve"](_cachedEndpoint);
  return fetch(DOMAINS_URL)["then"](function(_0x4b1733) {
    if (!_0x4b1733["ok"])
      throw new Error();
    return _0x4b1733["json"]();
  })[_0x37cf5b(_0x27cee8._0x2cecd8)](function(_0x464d75) {
    var _0x354ff4 = _0x37cf5b, _0x18f47a = _0x464d75[_0x354ff4(_0x3a49ed._0x53d990)] || PURSTREAM_FALLBACK;
    return _cachedEndpoint = { "api": _0x354ff4(_0x3a49ed._0x35f2c1) + _0x18f47a + _0x354ff4(_0x3a49ed._0x132ccc), "referer": "https://purstream." + _0x18f47a + "/" }, _cachedEndpoint;
  })[_0x37cf5b(_0x27cee8._0x278a89)](function() {
    return { "api": "https://api.purstream." + PURSTREAM_FALLBACK + "/api/v1", "referer": "https://purstream." + PURSTREAM_FALLBACK + "/" };
  });
}
function applyPurstreamDomain(_0x5d8c19) {
  var _0x4e111c = { _0x320bdd: 497 }, _0x4b4f98 = _0x580258;
  PURSTREAM_API = _0x5d8c19["api"], PURSTREAM_REFERER = _0x5d8c19[_0x4b4f98(_0x4e111c._0x320bdd)];
}
function cleanTitle(_0xfec9ff) {
  var _0x526636 = { _0x19a70b: 534, _0x10348d: 534, _0x23b993: 534 }, _0x32ec58 = _0x580258;
  if (!_0xfec9ff)
    return "";
  return _0xfec9ff[_0x32ec58(505)]()["replace"](/[àáâãäå]/g, "a")["replace"](/[èéêë]/g, "e")[_0x32ec58(534)](/[ìíîï]/g, "i")[_0x32ec58(_0x526636._0x19a70b)](/[òóôõö]/g, "o")[_0x32ec58(534)](/[ùúûü]/g, "u")[_0x32ec58(_0x526636._0x10348d)](/[^a-z0-9\s]/g, "")[_0x32ec58(_0x526636._0x23b993)](/\s+/g, " ")["trim"]();
}
function extractYear(_0x43b6be) {
  var _0x171acd = { _0x393eef: 526 }, _0x11dca0 = _0x580258;
  if (!_0x43b6be)
    return null;
  var _0x3d72f1 = String(_0x43b6be)[_0x11dca0(_0x171acd._0x393eef)](/(\d{4})/);
  return _0x3d72f1 ? parseInt(_0x3d72f1[1], 10) : null;
}
function getTmdbSearchMeta(_0x4db8fc, _0x5cb50d) {
  var _0x4bc6b7 = { _0x373f41: 523 }, _0x106500 = { _0x102a6a: 501 }, _0x2fef99 = _0x580258, _0x184968 = _0x5cb50d === "tv" ? "tv" : "movie", _0x331138 = _0x2fef99(511) + _0x184968 + "/" + _0x4db8fc + "?language=fr-FR&api_key=" + TMDB_KEY;
  return fetch(_0x331138)[_0x2fef99(_0x4bc6b7._0x373f41)](function(_0x4d2459) {
    return _0x4d2459["json"]();
  })[_0x2fef99(523)](function(_0x45e527) {
    var _0xea40de = _0x2fef99;
    return { "fr": _0x45e527["title"] || _0x45e527["name"], "orig": _0x45e527[_0xea40de(563)] || _0x45e527["original_name"], "year": extractYear(_0x45e527[_0xea40de(506)] || _0x45e527[_0xea40de(_0x106500._0x102a6a)]) };
  });
}
function findPurstreamIdByTitle(_0x280b47, _0x29fc0e, _0x4d2ef) {
  var _0x40c267 = { _0x250093: 544 }, _0x3e3e7e = { _0x3184eb: 512, _0x19ba3e: 549, _0x1a10ba: 543 }, _0x328754 = _0x580258, _0x31b960 = encodeURIComponent(_0x280b47);
  return fetch(PURSTREAM_API + _0x328754(_0x40c267._0x250093) + _0x31b960, { "headers": { "User-Agent": PURSTREAM_UA, "Referer": PURSTREAM_REFERER } })["then"](function(_0x2812dc) {
    return _0x2812dc["json"]();
  })["then"](function(_0x53e343) {
    var _0x5100a0 = { _0x4d379d: 557, _0x20fb3c: 529 }, _0x1e5831 = _0x328754, _0x21b847 = _0x53e343[_0x1e5831(_0x3e3e7e._0x3184eb)]["items"][_0x1e5831(_0x3e3e7e._0x19ba3e)] && _0x53e343["data"][_0x1e5831(_0x3e3e7e._0x1a10ba)][_0x1e5831(_0x3e3e7e._0x19ba3e)][_0x1e5831(543)] ? _0x53e343["data"]["items"][_0x1e5831(549)]["items"] : [];
    if (_0x21b847["length"] === 0)
      throw new Error();
    var _0x998c7 = cleanTitle(_0x280b47), _0x2a29b2 = _0x21b847["find"](function(_0x1715a5) {
      var _0xff3abe = _0x1e5831, _0x1d013f = extractYear(_0x1715a5["release_date"]);
      return cleanTitle(_0x1715a5[_0xff3abe(_0x5100a0._0x4d379d)]) === _0x998c7 && (Math[_0xff3abe(_0x5100a0._0x20fb3c)](_0x4d2ef - _0x1d013f) <= 1 || !_0x4d2ef);
    }) || _0x21b847[0];
    return _0x2a29b2["id"];
  });
}
function fetchMovieSources(_0x49430b) {
  var _0x4c2d0b = { _0x50c9e8: 537, _0x531ce5: 540 }, _0x554abb = { _0xd3fcd6: 504 }, _0x8dafd7 = _0x580258;
  return fetch(PURSTREAM_API + _0x8dafd7(_0x4c2d0b._0x50c9e8) + _0x49430b + _0x8dafd7(_0x4c2d0b._0x531ce5), { "headers": { "User-Agent": PURSTREAM_UA, "Referer": PURSTREAM_REFERER } })[_0x8dafd7(523)](function(_0x46650d) {
    var _0xdaec5b = _0x8dafd7;
    return _0x46650d[_0xdaec5b(_0x554abb._0xd3fcd6)]();
  })["then"](function(_0x245ec2) {
    var _0x244c94 = _0x8dafd7;
    return _0x245ec2["data"]["items"][_0x244c94(555)] || [];
  });
}
function fetchEpisodeSources(_0x259bef, _0x1b9d37, _0x2dd536) {
  var _0x32d93e = { _0x4d7262: 542, _0x21445a: 523 }, _0x751dc3 = { _0x363a56: 504 }, _0x12b369 = _0x580258;
  return fetch(PURSTREAM_API + _0x12b369(_0x32d93e._0x4d7262) + _0x259bef + "/episode?season=" + (_0x1b9d37 || 1) + "&episode=" + (_0x2dd536 || 1), { "headers": { "User-Agent": PURSTREAM_UA, "Referer": PURSTREAM_REFERER } })[_0x12b369(_0x32d93e._0x21445a)](function(_0x4b363d) {
    var _0x3e2e7a = _0x12b369;
    return _0x4b363d[_0x3e2e7a(_0x751dc3._0x363a56)]();
  })["then"](function(_0x57ed4f) {
    var _0x366a6f = _0x12b369;
    return _0x57ed4f[_0x366a6f(512)]["items"][_0x366a6f(502)] || [];
  });
}
function parseLang(_0x1b1bbc) {
  var _0x12fd0c = { _0x288936: 561, _0x404031: 535, _0x4a566e: 521 }, _0x32fbcc = _0x580258, _0x58076f = (_0x1b1bbc || "")[_0x32fbcc(_0x12fd0c._0x288936)]();
  if (_0x58076f[_0x32fbcc(_0x12fd0c._0x404031)]("VOSTFR") !== -1)
    return _0x32fbcc(_0x12fd0c._0x4a566e);
  if (_0x58076f[_0x32fbcc(_0x12fd0c._0x404031)]("VF") !== -1)
    return "VF";
  return _0x32fbcc(556);
}
function parseQuality(_0x11d4c6) {
  var _0x1c4e1e = { _0x4dce8f: 535, _0x4aa00c: 552, _0x360d99: 519 }, _0x2718b2 = _0x580258, _0x364254 = (_0x11d4c6 || "")[_0x2718b2(561)]();
  if (_0x364254[_0x2718b2(_0x1c4e1e._0x4dce8f)]("4K") !== -1)
    return "4K";
  if (_0x364254[_0x2718b2(535)]("1080") !== -1)
    return _0x2718b2(503);
  if (_0x364254[_0x2718b2(535)](_0x2718b2(_0x1c4e1e._0x4aa00c)) !== -1)
    return _0x2718b2(_0x1c4e1e._0x360d99);
  return "HD";
}
function normalizeMovieSources(_0x29ba99, _0x22ed47) {
  var _0x175a0e = { _0x25f6be: 566 }, _0x86ce77 = { _0x3c58b8: 526 };
  return _0x29ba99["filter"](function(_0x4fc8fa) {
    var _0x4b0294 = _0x1911;
    return _0x4fc8fa[_0x4b0294(509)] && (_0x4fc8fa["url"]["match"](/\.m3u8/i) || _0x4fc8fa["url"][_0x4b0294(_0x86ce77._0x3c58b8)](/\.mp4/i));
  })["map"](function(_0x1e197e) {
    var _0x269d05 = _0x1911, _0x56fac8 = parseQuality(_0x1e197e["name"]), _0x168dce = _0x1e197e["url"]["match"](/\.mp4/i) ? "mp4" : _0x269d05(_0x175a0e._0x25f6be), _0x53c8d3 = parseLang(_0x1e197e["name"]), _0x217d9a = buildPurstreamTitle(_0x22ed47, _0x56fac8, _0x53c8d3, _0x168dce, null, null, null, _0x1e197e["name"]);
    return { "name": "Purstream | " + _0x56fac8["toLowerCase"]() + _0x269d05(527) + _0x53c8d3, "title": _0x217d9a, "size": _0x217d9a, "description": _0x217d9a, "url": _0x1e197e[_0x269d05(509)], "quality": "", "language": "", "format": _0x168dce, "headers": { "User-Agent": PURSTREAM_UA, "Referer": PURSTREAM_REFERER } };
  });
}
function _0x1911(_0x5d112d, _0x4880d7) {
  _0x5d112d = _0x5d112d - 491;
  var _0x506c76 = _0x506c();
  var _0x191140 = _0x506c76[_0x5d112d];
  if (_0x1911["WKkMLS"] === void 0) {
    var _0x2654f8 = function(_0x412246) {
      var _0x31a8f7 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
      var _0x2f23a7 = "", _0x21f96b = "";
      for (var _0x2f14da = 0, _0x4c9287, _0x273189, _0x2c562c = 0; _0x273189 = _0x412246["charAt"](_0x2c562c++); ~_0x273189 && (_0x4c9287 = _0x2f14da % 4 ? _0x4c9287 * 64 + _0x273189 : _0x273189, _0x2f14da++ % 4) ? _0x2f23a7 += String["fromCharCode"](255 & _0x4c9287 >> (-2 * _0x2f14da & 6)) : 0) {
        _0x273189 = _0x31a8f7["indexOf"](_0x273189);
      }
      for (var _0x525c63 = 0, _0x3fa140 = _0x2f23a7["length"]; _0x525c63 < _0x3fa140; _0x525c63++) {
        _0x21f96b += "%" + ("00" + _0x2f23a7["charCodeAt"](_0x525c63)["toString"](16))["slice"](-2);
      }
      return decodeURIComponent(_0x21f96b);
    };
    _0x1911["DEJoAK"] = _0x2654f8, _0x1911["PhDUJk"] = {}, _0x1911["WKkMLS"] = !![];
  }
  var _0x129e7d = _0x506c76[0], _0x3a8f72 = _0x5d112d + _0x129e7d, _0xd390b7 = _0x1911["PhDUJk"][_0x3a8f72];
  return !_0xd390b7 ? (_0x191140 = _0x1911["DEJoAK"](_0x191140), _0x1911["PhDUJk"][_0x3a8f72] = _0x191140) : _0x191140 = _0xd390b7, _0x191140;
}
function normalizeEpisodeSources(_0x3ffa77, _0x296e79, _0x46ea42, _0x42f2bb, _0x38e282) {
  var _0x464bdd = { _0x5a3d3d: 513, _0x4513e4: 516 };
  return _0x3ffa77["map"](function(_0x533f4c) {
    var _0x5f38de = _0x1911, _0xcb09c0 = parseQuality(_0x533f4c[_0x5f38de(551)]), _0x40dc85 = _0x533f4c[_0x5f38de(_0x464bdd._0x5a3d3d)] || "m3u8", _0xa6c753 = parseLang(_0x533f4c[_0x5f38de(551)]), _0x2f09cb = buildPurstreamTitle(_0x296e79, _0xcb09c0, _0xa6c753, _0x40dc85, _0x46ea42, _0x42f2bb, _0x38e282, _0x533f4c["source_name"]);
    return { "name": _0x5f38de(_0x464bdd._0x4513e4) + _0xcb09c0[_0x5f38de(505)]() + " | " + _0xa6c753, "title": _0x2f09cb, "size": _0x2f09cb, "description": _0x2f09cb, "url": _0x533f4c["stream_url"], "quality": "", "language": "", "format": _0x40dc85, "headers": { "User-Agent": PURSTREAM_UA, "Referer": PURSTREAM_REFERER } };
  });
}
function getStreams(_0x4baaaa, _0x126066, _0x539bb1, _0x523727) {
  var _0x145974 = { _0xe84e73: 492 }, _0x14929b = _0x580258;
  return Promise["all"]([getTmdbDetails(_0x4baaaa, _0x126066), _0x126066 === "tv" ? getEpisodeInfo(_0x4baaaa, _0x539bb1, _0x523727) : Promise["resolve"](null), detectPurstreamDomain(), getTmdbSearchMeta(_0x4baaaa, _0x126066)])[_0x14929b(523)](function(_0x765f04) {
    var _0x3b4f6b = { _0x983d65: 523 }, _0x4caf4e = _0x14929b, _0x558699 = _0x765f04[0], _0x3f90af = _0x765f04[1], _0x455d6e = _0x765f04[2], _0x400448 = _0x765f04[3];
    return applyPurstreamDomain(_0x455d6e), findPurstreamIdByTitle(_0x400448["fr"], _0x126066, _0x400448["year"])[_0x4caf4e(541)](function() {
      var _0x113277 = _0x4caf4e;
      return findPurstreamIdByTitle(_0x400448[_0x113277(_0x145974._0xe84e73)], _0x126066, _0x400448["year"]);
    })["then"](function(_0x2cac7b) {
      var _0x2c0ec2 = _0x4caf4e;
      return _0x126066 === "tv" ? fetchEpisodeSources(_0x2cac7b, _0x539bb1, _0x523727)[_0x2c0ec2(_0x3b4f6b._0x983d65)](function(_0x5cea48) {
        return normalizeEpisodeSources(_0x5cea48, _0x558699, _0x539bb1, _0x523727, _0x3f90af);
      }) : fetchMovieSources(_0x2cac7b)["then"](function(_0x5023fe) {
        return normalizeMovieSources(_0x5023fe, _0x558699);
      });
    });
  })["catch"](function() {
    return [];
  });
}
typeof module !== "undefined" && module[_0x580258(514)] ? module[_0x580258(514)] = { "getStreams": getStreams } : global[_0x580258(536)] = getStreams;
(function() {
  var _origGetStreams = typeof module !== "undefined" && module.exports && module.exports.getStreams || (typeof getStreams === "function" ? getStreams : typeof global !== "undefined" ? global.getStreams : null);
  if (typeof _origGetStreams !== "function")
    return;
  var TMDB_API_KEY_WRAP = "1865f43a0549ca50d341dd9ab8b29f49";
  var PROVIDER_NAME = "Purstream";
  var PROVIDER_ID = "purstream";
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
