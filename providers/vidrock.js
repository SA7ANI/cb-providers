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
const _0x1fe5d1 = _0x4bc9;
(function(_0x4d1f37, _0x16f41e) {
  const _0x3685b1 = { _0x59e8b2: 521, _0x57eaee: 522, _0x3a5874: 472, _0x1483f1: 442, _0x3e927b: 505, _0x5b1802: 497 }, _0x2b3656 = _0x4bc9, _0x59699b = _0x4d1f37();
  while (!![]) {
    try {
      const _0x3f710f = -parseInt(_0x2b3656(_0x3685b1._0x59e8b2)) / 1 * (-parseInt(_0x2b3656(_0x3685b1._0x57eaee)) / 2) + parseInt(_0x2b3656(469)) / 3 + parseInt(_0x2b3656(520)) / 4 + -parseInt(_0x2b3656(_0x3685b1._0x3a5874)) / 5 + parseInt(_0x2b3656(509)) / 6 + -parseInt(_0x2b3656(_0x3685b1._0x1483f1)) / 7 + parseInt(_0x2b3656(_0x3685b1._0x3e927b)) / 8 * (parseInt(_0x2b3656(_0x3685b1._0x5b1802)) / 9);
      if (_0x3f710f === _0x16f41e)
        break;
      else
        _0x59699b["push"](_0x59699b["shift"]());
    } catch (_0x4e1889) {
      _0x59699b["push"](_0x59699b["shift"]());
    }
  }
})(_0x572c, 744100);
var __async2 = (_0x71bf3e, _0x848029, _0x295487) => {
  const _0x5dd5e2 = { _0xfaf840: 496 };
  return new Promise((_0x509e39, _0x24f765) => {
    const _0x437b18 = _0x4bc9;
    var _0x4d0e59 = (_0x1442ff) => {
      try {
        _0x259a66(_0x295487["next"](_0x1442ff));
      } catch (_0x3ccd12) {
        _0x24f765(_0x3ccd12);
      }
    }, _0x2f55ce = (_0x215a54) => {
      try {
        _0x259a66(_0x295487["throw"](_0x215a54));
      } catch (_0x3d309b) {
        _0x24f765(_0x3d309b);
      }
    }, _0x259a66 = (_0x30c04b) => _0x30c04b["done"] ? _0x509e39(_0x30c04b[_0x437b18(451)]) : Promise["resolve"](_0x30c04b["value"])["then"](_0x4d0e59, _0x2f55ce);
    _0x259a66((_0x295487 = _0x295487[_0x437b18(_0x5dd5e2._0xfaf840)](_0x71bf3e, _0x848029))[_0x437b18(482)]());
  });
}, TMDB_API_KEY = "1865f43a0549ca50d341dd9ab8b29f49", DOMAINS_URL = "https://raw.githubusercontent.com/sapariyaneel/nuvio-plugin/refs/heads/main/domains.json", FALLBACK_BASE_URL = _0x1fe5d1(462), HEADERS = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36", "Referer": "https://vidrock.net/", "Origin": "https://vidrock.net" }, STREAM_KEY_HEX = _0x1fe5d1(493), GCM_IV_LENGTH = 12, GCM_TAG_LENGTH = 16, cachedDomains = null;
function getDomains() {
  return __async2(this, null, function* () {
    if (cachedDomains)
      return cachedDomains;
    try {
      const _0x31cfa9 = yield fetch(DOMAINS_URL, { "skipSizeCheck": !![] });
      cachedDomains = yield _0x31cfa9["json"]();
    } catch (_0x5dd86f) {
      cachedDomains = {};
    }
    return cachedDomains;
  });
}
function getBaseUrl() {
  const _0x56c01a = { _0xd90b24: 453 };
  return __async2(this, null, function* () {
    const _0x3a37b5 = _0x4bc9, _0x4a7d5a = yield getDomains();
    return (_0x4a7d5a[_0x3a37b5(_0x56c01a._0xd90b24)] || FALLBACK_BASE_URL)["replace"](/\/+$/, "");
  });
}
var AES_SBOX = new Uint8Array(256), AES_RCON = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77];
(function buildSbox() {
  const _0x3b8e24 = new Uint8Array(256), _0x5ea36a = new Uint8Array(256);
  let _0x3daa25 = 1;
  for (let _0x5674eb = 0; _0x5674eb < 256; _0x5674eb++) {
    _0x3b8e24[_0x5674eb] = _0x3daa25, _0x5ea36a[_0x3daa25] = _0x5674eb, _0x3daa25 = (_0x3daa25 ^ _0x3daa25 << 1 & 255 ^ (_0x3daa25 & 128 ? 27 : 0)) & 255;
  }
  AES_SBOX[0] = 99;
  for (let _0x271f6e = 1; _0x271f6e < 256; _0x271f6e++) {
    const _0x513533 = _0x3b8e24[(255 - _0x5ea36a[_0x271f6e]) % 255];
    let _0x4f1e9c = _0x513533, _0xb3dec8 = _0x513533;
    for (let _0x21f7a0 = 0; _0x21f7a0 < 4; _0x21f7a0++) {
      _0xb3dec8 = (_0xb3dec8 << 1 | _0xb3dec8 >>> 7) & 255, _0x4f1e9c ^= _0xb3dec8;
    }
    AES_SBOX[_0x271f6e] = (_0x4f1e9c ^ 99) & 255;
  }
})();
function gfMultiply(_0x4b6f7d, _0x51574) {
  let _0x50ed16 = 0;
  while (_0x51574) {
    if (_0x51574 & 1)
      _0x50ed16 ^= _0x4b6f7d;
    _0x4b6f7d = (_0x4b6f7d << 1 ^ (_0x4b6f7d & 128 ? 27 : 0)) & 255, _0x51574 >>= 1;
  }
  return _0x50ed16 & 255;
}
function expandAesKey(_0x984572) {
  const _0x4e598b = { _0x4fd0d7: 444 }, _0x567301 = _0x1fe5d1, _0x8af7c = _0x984572["length"] / 4, _0x3d4701 = _0x8af7c + 6, _0x16d034 = new Uint8Array(16 * (_0x3d4701 + 1));
  _0x16d034[_0x567301(_0x4e598b._0x4fd0d7)](_0x984572);
  for (let _0x574071 = _0x8af7c; _0x574071 < 4 * (_0x3d4701 + 1); _0x574071++) {
    let _0x1d08a2 = _0x16d034[(_0x574071 - 1) * 4], _0x3f33f7 = _0x16d034[(_0x574071 - 1) * 4 + 1], _0xc7a1d1 = _0x16d034[(_0x574071 - 1) * 4 + 2], _0x377233 = _0x16d034[(_0x574071 - 1) * 4 + 3];
    if (_0x574071 % _0x8af7c === 0) {
      const _0x1db76f = _0x1d08a2;
      _0x1d08a2 = AES_SBOX[_0x3f33f7] ^ AES_RCON[_0x574071 / _0x8af7c - 1], _0x3f33f7 = AES_SBOX[_0xc7a1d1], _0xc7a1d1 = AES_SBOX[_0x377233], _0x377233 = AES_SBOX[_0x1db76f];
    } else
      _0x8af7c > 6 && _0x574071 % _0x8af7c === 4 && (_0x1d08a2 = AES_SBOX[_0x1d08a2], _0x3f33f7 = AES_SBOX[_0x3f33f7], _0xc7a1d1 = AES_SBOX[_0xc7a1d1], _0x377233 = AES_SBOX[_0x377233]);
    _0x16d034[_0x574071 * 4] = _0x16d034[(_0x574071 - _0x8af7c) * 4] ^ _0x1d08a2, _0x16d034[_0x574071 * 4 + 1] = _0x16d034[(_0x574071 - _0x8af7c) * 4 + 1] ^ _0x3f33f7, _0x16d034[_0x574071 * 4 + 2] = _0x16d034[(_0x574071 - _0x8af7c) * 4 + 2] ^ _0xc7a1d1, _0x16d034[_0x574071 * 4 + 3] = _0x16d034[(_0x574071 - _0x8af7c) * 4 + 3] ^ _0x377233;
  }
  return { "schedule": _0x16d034, "rounds": _0x3d4701 };
}
function aesEncryptBlock(_0x2124c4, _0x214902) {
  const _0x35a129 = _0x1fe5d1, _0x585c9b = _0x214902[_0x35a129(448)], _0x5682cd = _0x214902["rounds"];
  for (let _0x3c3d16 = 0; _0x3c3d16 < 16; _0x3c3d16++)
    _0x2124c4[_0x3c3d16] ^= _0x585c9b[_0x3c3d16];
  for (let _0x2adac6 = 1; _0x2adac6 <= _0x5682cd; _0x2adac6++) {
    for (let _0x12af79 = 0; _0x12af79 < 16; _0x12af79++)
      _0x2124c4[_0x12af79] = AES_SBOX[_0x2124c4[_0x12af79]];
    let _0x76a664 = _0x2124c4[1];
    _0x2124c4[1] = _0x2124c4[5], _0x2124c4[5] = _0x2124c4[9], _0x2124c4[9] = _0x2124c4[13], _0x2124c4[13] = _0x76a664, _0x76a664 = _0x2124c4[2], _0x2124c4[2] = _0x2124c4[10], _0x2124c4[10] = _0x76a664, _0x76a664 = _0x2124c4[6], _0x2124c4[6] = _0x2124c4[14], _0x2124c4[14] = _0x76a664, _0x76a664 = _0x2124c4[15], _0x2124c4[15] = _0x2124c4[11], _0x2124c4[11] = _0x2124c4[7], _0x2124c4[7] = _0x2124c4[3], _0x2124c4[3] = _0x76a664;
    if (_0x2adac6 !== _0x5682cd)
      for (let _0x191786 = 0; _0x191786 < 4; _0x191786++) {
        const _0x2eb2cf = _0x191786 * 4, _0x421510 = _0x2124c4[_0x2eb2cf], _0x28eef1 = _0x2124c4[_0x2eb2cf + 1], _0xa79a51 = _0x2124c4[_0x2eb2cf + 2], _0x28328e = _0x2124c4[_0x2eb2cf + 3];
        _0x2124c4[_0x2eb2cf] = gfMultiply(_0x421510, 2) ^ gfMultiply(_0x28eef1, 3) ^ _0xa79a51 ^ _0x28328e, _0x2124c4[_0x2eb2cf + 1] = _0x421510 ^ gfMultiply(_0x28eef1, 2) ^ gfMultiply(_0xa79a51, 3) ^ _0x28328e, _0x2124c4[_0x2eb2cf + 2] = _0x421510 ^ _0x28eef1 ^ gfMultiply(_0xa79a51, 2) ^ gfMultiply(_0x28328e, 3), _0x2124c4[_0x2eb2cf + 3] = gfMultiply(_0x421510, 3) ^ _0x28eef1 ^ _0xa79a51 ^ gfMultiply(_0x28328e, 2);
      }
    for (let _0x4b80ae = 0; _0x4b80ae < 16; _0x4b80ae++)
      _0x2124c4[_0x4b80ae] ^= _0x585c9b[_0x2adac6 * 16 + _0x4b80ae];
  }
  return _0x2124c4;
}
function hexToBytes(_0x1899d1) {
  const _0x7e6335 = { _0x378705: 464, _0xcf0461: 465 }, _0x134aac = _0x1fe5d1, _0x4d954a = new Uint8Array(_0x1899d1[_0x134aac(_0x7e6335._0x378705)] / 2);
  for (let _0x35c52a = 0; _0x35c52a < _0x4d954a[_0x134aac(464)]; _0x35c52a++)
    _0x4d954a[_0x35c52a] = parseInt(_0x1899d1[_0x134aac(_0x7e6335._0xcf0461)](_0x35c52a * 2, 2), 16);
  return _0x4d954a;
}
var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function base64UrlToBytes(_0x16b088) {
  const _0x4d672b = { _0x4eac83: 494, _0x568143: 491 }, _0x30dce2 = _0x1fe5d1, _0x36b81a = _0x16b088[_0x30dce2(_0x4d672b._0x4eac83)](/-/g, "+")["replace"](/_/g, "/")["replace"](/=+$/, ""), _0x24ad0e = new Uint8Array(Math[_0x30dce2(456)](_0x36b81a["length"] * 3 / 4));
  let _0x4d1415 = 0, _0x180ac2 = 0, _0x328558 = 0;
  for (let _0x31a74a = 0; _0x31a74a < _0x36b81a[_0x30dce2(464)]; _0x31a74a++) {
    const _0x37c629 = BASE64_CHARS[_0x30dce2(483)](_0x36b81a[_0x30dce2(_0x4d672b._0x568143)](_0x31a74a));
    if (_0x37c629 < 0)
      continue;
    _0x4d1415 = _0x4d1415 << 6 | _0x37c629, _0x180ac2 += 6, _0x180ac2 >= 8 && (_0x180ac2 -= 8, _0x24ad0e[_0x328558++] = _0x4d1415 >> _0x180ac2 & 255);
  }
  return _0x24ad0e[_0x30dce2(478)](0, _0x328558);
}
function utf8BytesToString(_0x4d1596) {
  const _0x818024 = { _0x5dadb2: 445, _0x5cc641: 445 }, _0x397132 = _0x1fe5d1;
  let _0x347bd5 = "", _0x2e323e = 0;
  while (_0x2e323e < _0x4d1596["length"]) {
    const _0xaaffb1 = _0x4d1596[_0x2e323e++];
    if (_0xaaffb1 < 128)
      _0x347bd5 += String[_0x397132(445)](_0xaaffb1);
    else {
      if ((_0xaaffb1 & 224) === 192) {
        const _0x387e2d = _0x4d1596[_0x2e323e++];
        _0x347bd5 += String[_0x397132(_0x818024._0x5dadb2)]((_0xaaffb1 & 31) << 6 | _0x387e2d & 63);
      } else {
        if ((_0xaaffb1 & 240) === 224) {
          const _0x23e84d = _0x4d1596[_0x2e323e++], _0x4a3746 = _0x4d1596[_0x2e323e++];
          _0x347bd5 += String[_0x397132(_0x818024._0x5cc641)]((_0xaaffb1 & 15) << 12 | (_0x23e84d & 63) << 6 | _0x4a3746 & 63);
        } else {
          if ((_0xaaffb1 & 248) === 240) {
            const _0xf5024 = _0x4d1596[_0x2e323e++], _0x2eef9d = _0x4d1596[_0x2e323e++], _0x5e490e = _0x4d1596[_0x2e323e++];
            let _0x3c1773 = (_0xaaffb1 & 7) << 18 | (_0xf5024 & 63) << 12 | (_0x2eef9d & 63) << 6 | _0x5e490e & 63;
            _0x3c1773 -= 65536, _0x347bd5 += String[_0x397132(445)](55296 + (_0x3c1773 >> 10), 56320 + (_0x3c1773 & 1023));
          } else
            _0x347bd5 += String[_0x397132(_0x818024._0x5dadb2)](_0xaaffb1);
        }
      }
    }
  }
  return _0x347bd5;
}
var cachedKeySchedule = null;
function decryptStreamUrl(_0x1930c4) {
  const _0x73fcef = { _0x40a395: 464, _0x4b4cff: 511, _0x237901: 478, _0x185743: 464, _0xad3736: 444, _0x14f194: 444 }, _0x5c1319 = _0x1fe5d1, _0x303644 = base64UrlToBytes(_0x1930c4);
  if (_0x303644[_0x5c1319(_0x73fcef._0x40a395)] <= GCM_IV_LENGTH + GCM_TAG_LENGTH)
    throw new Error(_0x5c1319(_0x73fcef._0x4b4cff));
  if (!cachedKeySchedule)
    cachedKeySchedule = expandAesKey(hexToBytes(STREAM_KEY_HEX));
  const _0x24d318 = _0x303644[_0x5c1319(_0x73fcef._0x237901)](GCM_IV_LENGTH, _0x303644["length"] - GCM_TAG_LENGTH), _0x3a682b = new Uint8Array(_0x24d318[_0x5c1319(_0x73fcef._0x185743)]), _0x6a12bc = new Uint8Array(16);
  _0x6a12bc[_0x5c1319(_0x73fcef._0xad3736)](_0x303644["subarray"](0, GCM_IV_LENGTH), 0);
  let _0x41fd7f = 2;
  for (let _0x437543 = 0; _0x437543 < _0x24d318["length"]; _0x437543 += 16) {
    _0x6a12bc[12] = _0x41fd7f >>> 24 & 255, _0x6a12bc[13] = _0x41fd7f >>> 16 & 255, _0x6a12bc[14] = _0x41fd7f >>> 8 & 255, _0x6a12bc[15] = _0x41fd7f & 255;
    const _0x7cf49 = new Uint8Array(16);
    _0x7cf49[_0x5c1319(_0x73fcef._0x14f194)](_0x6a12bc), aesEncryptBlock(_0x7cf49, cachedKeySchedule);
    const _0x31e8b3 = Math["min"](16, _0x24d318["length"] - _0x437543);
    for (let _0x407a13 = 0; _0x407a13 < _0x31e8b3; _0x407a13++)
      _0x3a682b[_0x437543 + _0x407a13] = _0x24d318[_0x437543 + _0x407a13] ^ _0x7cf49[_0x407a13];
    _0x41fd7f++;
  }
  return utf8BytesToString(_0x3a682b);
}
function getProviderEmoji(_0x4aecb7) {
  const _0x288c5c = { _0x36d251: 470 }, _0x571c8c = _0x1fe5d1, _0x58e89b = String(_0x4aecb7)[_0x571c8c(480)]();
  if (_0x58e89b[_0x571c8c(447)]("astra"))
    return "\u{1FA90}";
  if (_0x58e89b["includes"](_0x571c8c(_0x288c5c._0x36d251)))
    return "\u{1F300}";
  if (_0x58e89b["includes"]("orion"))
    return "\u{1F3AF}";
  return "\u{1F30D}";
}
function buildDropdownMetadata(_0x1b2034, _0x1685fb, _0x30ab22, _0x380bec, _0x122369, _0x1951dd) {
  const _0x2c6b10 = { _0x1a6c45: 480, _0x19f481: 452, _0x591ea7: 466, _0x252352: 458, _0x4fa76a: 487, _0x224d91: 517, _0x3d649c: 515 }, _0x4c827d = _0x1fe5d1;
  let _0x23f32a = String(_0x1b2034)[_0x4c827d(494)](/\s*(1080p\s+)?server\s*2\s*$/gi, "")["trim"](), _0x3efdca = _0x1685fb[_0x4c827d(_0x2c6b10._0x1a6c45)]()["trim"]() === "auto" ? _0x4c827d(500) : _0x1685fb, _0x4bce57 = _0x4c827d(_0x2c6b10._0x19f481) + _0x3efdca;
  const _0x2e073b = _0x3efdca["toLowerCase"]();
  if (_0x2e073b["includes"]("2160") || _0x2e073b[_0x4c827d(447)]("4k"))
    _0x4bce57 = "\u{1F31F} 2160p";
  else {
    if (_0x2e073b["includes"](_0x4c827d(504)))
      _0x4bce57 = _0x4c827d(443);
    else {
      if (_0x2e073b["includes"]("720"))
        _0x4bce57 = _0x4c827d(_0x2c6b10._0x591ea7);
      else
        _0x2e073b === _0x4c827d(_0x2c6b10._0x252352) && (_0x4bce57 = _0x4c827d(475));
    }
  }
  const _0x155180 = _0x30ab22[_0x4c827d(_0x2c6b10._0x4fa76a)] || "90 min", _0x2af7d0 = _0x1951dd[_0x4c827d(447)](".m3u8") ? "\u{1F4E1} M3U8" : "\u{1F39E}\uFE0F MP4", _0x27642e = getProviderEmoji(_0x23f32a), _0x5118c3 = _0x30ab22[_0x4c827d(517)] ? "(" + _0x30ab22[_0x4c827d(_0x2c6b10._0x224d91)] + ")" : _0x4c827d(474);
  let _0x37c442 = _0x4c827d(499) + (_0x30ab22["title"] || _0x4c827d(459)) + _0x4c827d(523) + _0x5118c3;
  return _0x380bec && _0x122369 && (_0x37c442 += " | S" + _0x380bec + "E" + _0x122369), _0x37c442 + " " + _0x4bce57 + " | \u{1F30D} Original Audio | \u{1F3A7} AAC\n" + _0x2af7d0 + _0x4c827d(_0x2c6b10._0x3d649c) + _0x155180 + " " + _0x27642e + " " + _0x23f32a + " | \u{1F517} Provider: VidRock";
}
function fetchTmdbDetails(_0x414fc0, _0x4b28e9, _0x5a3c22, _0x43e357) {
  const _0x17568a = { _0x7c037e: 461, _0x20009e: 481, _0x4dacb6: 474, _0x87ea79: 489, _0x4b27d4: 486, _0x1f1961: 488, _0x49f6cc: 489 };
  return __async2(this, null, function* () {
    const _0x442096 = _0x4bc9;
    try {
      const _0x4f1f04 = _0x4b28e9 === "tv" ? "tv" : _0x442096(_0x17568a._0x7c037e), _0x3d054c = _0x442096(_0x17568a._0x20009e) + _0x4f1f04 + "/" + _0x414fc0 + "?api_key=" + TMDB_API_KEY, _0x3256c1 = yield fetch(_0x3d054c, { "skipSizeCheck": !![] });
      if (!_0x3256c1["ok"])
        return { "title": "Unknown", "year": _0x442096(_0x17568a._0x4dacb6), "runtime": _0x442096(_0x17568a._0x87ea79) };
      const _0x1be7fb = yield _0x3256c1[_0x442096(516)]();
      let _0x4099c9 = _0x1be7fb["runtime"];
      if (_0x4b28e9 === "tv")
        try {
          const _0x31f9ad = "https://api.tmdb.org/3/tv/" + _0x414fc0 + "/season/" + (_0x5a3c22 || 1) + "/episode/" + (_0x43e357 || 1) + _0x442096(467) + TMDB_API_KEY, _0x2daf41 = yield fetch(_0x31f9ad, { "skipSizeCheck": !![] });
          if (_0x2daf41["ok"]) {
            const _0x13c96d = yield _0x2daf41["json"]();
            if (_0x13c96d["runtime"])
              _0x4099c9 = _0x13c96d["runtime"];
          }
        } catch (_0x2b0e5b) {
        }
      const _0x5d6e19 = _0x4099c9 ? _0x4099c9 + " min" : _0x4b28e9 === "tv" ? "45 min" : _0x442096(489);
      return { "title": _0x4b28e9 === "tv" ? _0x1be7fb["name"] : _0x1be7fb[_0x442096(512)], "year": (_0x4b28e9 === "tv" ? _0x1be7fb[_0x442096(_0x17568a._0x4b27d4)] : _0x1be7fb[_0x442096(508)] || "")[_0x442096(_0x17568a._0x1f1961)](0, 4), "runtime": _0x5d6e19 };
    } catch (_0x2411c3) {
      return { "title": "Unknown", "year": "N/A", "runtime": _0x442096(_0x17568a._0x49f6cc) };
    }
  });
}
function _0x572c() {
  const _0x1e9e36 = ["AgvPz2H0", "Bw92Awu", "Ahr0Chm6lY92AwrYB2nRlM5LDa", "DhjPBq", "BgvUz3rO", "C3vIC3rY", "8j+BSo+4JYa3mJbW", "p2fWAv9RzxK9", "l2fWAs8", "mtK4nJeYt2PRBMLs", "yxrSyxm", "mtq0mha", "nZe2mJuYmhHfv2TQEa", "C3rHCNrZv2L0Aa", "tI9b", "8j+BUcbbDxrV", "z2v0u3rYzwfTCW", "zxjYB3i", "C3vIyxjYyxK", "D2LKDgG", "Dg9mB3DLCKnHC2u", "Ahr0Chm6lY9HCgKUDgHLBw92AwvKyI5VCMCVmY8", "BMv4Da", "Aw5KzxHpzG", "BwfW", "DgvZDa", "zMLYC3rFywLYx2rHDgu", "CNvUDgLTzq", "C3vIC3rYAw5N", "otaGBwLU", "DhyV", "y2HHCKf0", "Bw92AwuV", "n2yZztLJmMe4yJvKmwy0ztzHowmZyJDKmMu1zJHHmwm0yJzKowuYzJvHogmXyJrKn2u5zJjHnwm4yJfKngu3zG", "CMvWBgfJzq", "mta4mha", "yxbWBhK", "nte3mdvzEwvHwxK", "jMv4DgvYBMfSx3nVDxjJzt1PBwrIx2LK", "8j+oRca", "qxv0BW", "x3jHD1f1ywXPDhK", "ChvZAa", "zMLSDgvY", "mta4ma", "mti4ChHzCxjK", "C29YDa", "AxngAw5PDgu", "CMvSzwfZzv9KyxrL", "nZyXnJm2neTJqvDlqq", "B2jQzwn0", "y2LWAgvYDgv4Dcb0B28GC2HVCNq", "DgL0Bgu", "Bwf0y2G", "DhzFCMvZDwX0CW", "ihWG4PQHihGYlJy0ihWG4O+X77Ipia", "ANnVBG", "EwvHCG", "DxjS", "x3nLCNzLCKTLEq", "nZaZmde2uenwDuXJ", "mtu2m29Ksu5myq", "odC0tu9NrffH", "ic0G", "nZy3odKZEM9nAK5A", "8j+AGcaXmdGWCa", "C2v0", "zNjVBunOyxjdB2rL", "i0vyvc1ylvnuuKvbts1jtKy", "Aw5JBhvKzxm", "C2nOzwr1Bgu", "nZiWCa", "ihWG", "DMfSDwu", "8j+sJIa", "DMLKCM9JAW", "8j+QQcbwAwrsB2nRihWG", "Bw92AwvFCMvZDwX0CW", "zMXVB3i", "ywXS", "yxv0BW", "vw5RBM93BG"];
  _0x572c = function() {
    return _0x1e9e36;
  };
  return _0x572c();
}
function qualityLabelFromResolution(_0x5b0136, _0x3a1a7c) {
  const _0x574d14 = { _0x32110d: 449 }, _0x3b3856 = _0x1fe5d1;
  if (_0x5b0136 >= 3200 || _0x3a1a7c >= 2e3)
    return "4K";
  if (_0x5b0136 >= 2400 || _0x3a1a7c >= 1400)
    return _0x3b3856(471);
  if (_0x5b0136 >= 1800 || _0x3a1a7c >= 1e3)
    return _0x3b3856(495);
  if (_0x5b0136 >= 1200 || _0x3a1a7c >= 700)
    return _0x3b3856(_0x574d14._0x32110d);
  if (_0x5b0136 >= 800 || _0x3a1a7c >= 460)
    return "480p";
  if (_0x5b0136 >= 600 || _0x3a1a7c >= 340)
    return "360p";
  if (_0x5b0136 > 0 || _0x3a1a7c > 0)
    return "240p";
  return "Unknown";
}
function qualityRank(_0x21ec49) {
  const _0x20c445 = _0x1fe5d1;
  if (_0x21ec49 === "4K" || _0x21ec49 === "2160p")
    return 2160;
  const _0x9a31e3 = parseInt(_0x21ec49, 10);
  return Number[_0x20c445(507)](_0x9a31e3) ? _0x9a31e3 : 0;
}
function _0x4bc9(_0x5d2ca0, _0x21ec7d) {
  _0x5d2ca0 = _0x5d2ca0 - 442;
  const _0x572c89 = _0x572c();
  let _0x4bc90d = _0x572c89[_0x5d2ca0];
  if (_0x4bc9["avSWUS"] === void 0) {
    var _0x3ac810 = function(_0x38d5b9) {
      const _0x55f4c3 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
      let _0x71bf3e = "", _0x848029 = "";
      for (let _0x295487 = 0, _0x509e39, _0x24f765, _0x4d0e59 = 0; _0x24f765 = _0x38d5b9["charAt"](_0x4d0e59++); ~_0x24f765 && (_0x509e39 = _0x295487 % 4 ? _0x509e39 * 64 + _0x24f765 : _0x24f765, _0x295487++ % 4) ? _0x71bf3e += String["fromCharCode"](255 & _0x509e39 >> (-2 * _0x295487 & 6)) : 0) {
        _0x24f765 = _0x55f4c3["indexOf"](_0x24f765);
      }
      for (let _0x2f55ce = 0, _0x259a66 = _0x71bf3e["length"]; _0x2f55ce < _0x259a66; _0x2f55ce++) {
        _0x848029 += "%" + ("00" + _0x71bf3e["charCodeAt"](_0x2f55ce)["toString"](16))["slice"](-2);
      }
      return decodeURIComponent(_0x848029);
    };
    _0x4bc9["LgHTfy"] = _0x3ac810, _0x4bc9["tzrBYr"] = {}, _0x4bc9["avSWUS"] = !![];
  }
  const _0x48df73 = _0x572c89[0], _0x3874d7 = _0x5d2ca0 + _0x48df73, _0x1eed62 = _0x4bc9["tzrBYr"][_0x3874d7];
  return !_0x1eed62 ? (_0x4bc90d = _0x4bc9["LgHTfy"](_0x4bc90d), _0x4bc9["tzrBYr"][_0x3874d7] = _0x4bc90d) : _0x4bc90d = _0x1eed62, _0x4bc90d;
}
function resolveUrl(_0x518797, _0x1e945f) {
  try {
    return new URL(_0x518797, _0x1e945f)["toString"]();
  } catch (_0x101b48) {
    return _0x518797;
  }
}
function parseMasterTopVariant(_0x2d2d5d, _0x4aacf0) {
  const _0x572859 = { _0x4abe39: 473 }, _0x4fb67e = _0x1fe5d1, _0x27fa2c = _0x2d2d5d["split"]("\n")[_0x4fb67e(484)]((_0x414af2) => _0x414af2[_0x4fb67e(463)]());
  let _0x43eaa3 = null;
  for (let _0x384214 = 0; _0x384214 < _0x27fa2c["length"]; _0x384214++) {
    if (!_0x27fa2c[_0x384214][_0x4fb67e(_0x572859._0x4abe39)](_0x4fb67e(446)))
      continue;
    const _0xcc470d = _0x27fa2c[_0x384214 + 1];
    if (!_0xcc470d || _0xcc470d[_0x4fb67e(473)]("#"))
      continue;
    const _0x2f53af = _0x27fa2c[_0x384214]["match"](/BANDWIDTH=(\d+)/), _0xf90a3d = _0x27fa2c[_0x384214][_0x4fb67e(513)](/RESOLUTION=(\d+)x(\d+)/), _0x255f7f = _0x2f53af ? parseInt(_0x2f53af[1], 10) : 0, _0x3766a5 = _0xf90a3d ? parseInt(_0xf90a3d[1], 10) : 0, _0x1f28a9 = _0xf90a3d ? parseInt(_0xf90a3d[2], 10) : 0;
    (!_0x43eaa3 || _0x255f7f > _0x43eaa3["bandwidth"]) && (_0x43eaa3 = { "url": resolveUrl(_0xcc470d, _0x4aacf0), "bandwidth": _0x255f7f, "width": _0x3766a5, "height": _0x1f28a9 });
  }
  return _0x43eaa3;
}
function buildStream(_0x54c020, _0x4536c0, _0x3dac81, _0x59316c, _0x49ae21) {
  const _0x11ef00 = { _0x31b5c9: 460, _0x5b352d: 450 };
  return __async2(this, null, function* () {
    const _0x4912a3 = _0x4bc9;
    try {
      const _0xba5a64 = decryptStreamUrl(_0x4536c0["url"]);
      if (!/^https?:\/\//i[_0x4912a3(485)](_0xba5a64))
        return null;
      const _0xeef186 = yield fetch(_0xba5a64, { "headers": HEADERS, "skipSizeCheck": !![] });
      if (!_0xeef186["ok"])
        return null;
      const _0x23892f = parseMasterTopVariant(yield _0xeef186["text"](), _0xba5a64);
      if (!_0x23892f)
        return null;
      const _0x8be275 = qualityLabelFromResolution(_0x23892f[_0x4912a3(479)], _0x23892f[_0x4912a3(_0x11ef00._0x31b5c9)]);
      let _0x40441c = String(_0x54c020)["replace"](/\s*(1080p\s+)?server\s*2\s*$/gi, "")["trim"]();
      const _0x13810b = getProviderEmoji(_0x40441c), _0x39e45c = buildDropdownMetadata(_0x54c020, _0x8be275, _0x3dac81, _0x59316c, _0x49ae21, _0xba5a64);
      return { "name": _0x4912a3(454) + _0x8be275 + _0x4912a3(_0x11ef00._0x5b352d) + _0x13810b + " [" + _0x40441c + "]", "title": _0x39e45c, "size": _0x39e45c, "description": _0x39e45c, "url": _0xba5a64, "quality": "", "language": "", "headers": HEADERS, "provider": "vidrock", "subtitles": [], "_serverKey": _0x54c020, "_rawQuality": _0x8be275 };
    } catch (_0x4cd41c) {
      return null;
    }
  });
}
function getStreams(_0x57e554, _0x22a367, _0x1507d9, _0x99159c) {
  const _0x388b9c = { _0x2cf0d6: 498, _0x286ec1: 490, _0x3b4c45: 492, _0x54ae95: 468, _0x34ce41: 516, _0x5361ba: 510, _0x3ff251: 464, _0x45cb98: 457, _0x1315de: 477 }, _0x1bc882 = { _0x1a78e4: 501 };
  return __async2(this, null, function* () {
    const _0x297011 = _0x4bc9;
    try {
      let _0x5ab710 = _0x57e554;
      if (typeof _0x57e554 === "string" && _0x57e554[_0x297011(463)]()["toLowerCase"]()[_0x297011(473)]("tt")) {
        const _0x4d49e1 = "https://api.tmdb.org/3/find/" + _0x57e554 + _0x297011(467) + TMDB_API_KEY + _0x297011(_0x388b9c._0x2cf0d6), _0x216290 = yield (yield fetch(_0x4d49e1, { "skipSizeCheck": !![] }))[_0x297011(516)](), _0x2b085c = _0x22a367 === "tv" ? _0x216290[_0x297011(514)] : _0x216290[_0x297011(455)];
        _0x5ab710 = _0x2b085c && _0x2b085c["length"] ? _0x2b085c[0]["id"] : null;
        if (!_0x5ab710)
          return [];
      }
      _0x5ab710 = parseInt(_0x5ab710, 10);
      if (!_0x5ab710)
        return [];
      const _0x3f57e8 = yield getBaseUrl(), _0x14e400 = _0x22a367 === "tv", _0x57e68a = _0x14e400 ? _0x297011(_0x388b9c._0x286ec1) + _0x5ab710 + "/" + (_0x1507d9 || 1) + "/" + (_0x99159c || 1) : _0x297011(_0x388b9c._0x3b4c45) + _0x5ab710, _0x407a94 = yield fetch(_0x3f57e8 + _0x297011(_0x388b9c._0x54ae95) + _0x57e68a, { "headers": HEADERS, "skipSizeCheck": !![] });
      if (!_0x407a94["ok"])
        return [];
      const _0x541513 = yield _0x407a94[_0x297011(_0x388b9c._0x34ce41)]()["catch"](() => null);
      if (!_0x541513 || typeof _0x541513 !== _0x297011(_0x388b9c._0x5361ba) || _0x541513["error"])
        return [];
      const _0x502643 = Object["keys"](_0x541513)["map"]((_0x1b714d) => ({ "name": _0x1b714d, "entry": _0x541513[_0x1b714d] }))[_0x297011(503)]((_0x3aab67) => _0x3aab67["entry"] && typeof _0x3aab67["entry"] === "object" && _0x3aab67["entry"][_0x297011(518)]);
      if (!_0x502643[_0x297011(_0x388b9c._0x3ff251)])
        return [];
      const _0x46fbd9 = yield fetchTmdbDetails(_0x5ab710, _0x22a367, _0x1507d9, _0x99159c), _0xaee8cb = yield Promise[_0x297011(_0x388b9c._0x45cb98)](_0x502643[_0x297011(484)]((_0x2701c0) => buildStream(_0x2701c0["name"], _0x2701c0["entry"], _0x46fbd9, _0x1507d9, _0x99159c))), _0x237251 = {}, _0xacb16e = [];
      for (const _0xd63a7c of _0xaee8cb) {
        if (!_0xd63a7c || _0x237251[_0xd63a7c[_0x297011(518)]])
          continue;
        _0x237251[_0xd63a7c["url"]] = !![], _0xacb16e[_0x297011(502)](_0xd63a7c);
      }
      return _0xacb16e[_0x297011(506)]((_0x4bcfeb, _0x1ca243) => {
        const _0xbf3736 = _0x297011, _0x48a624 = String(_0x4bcfeb[_0xbf3736(519)] || "")["toLowerCase"](), _0x1dd722 = String(_0x1ca243["_serverKey"] || "")[_0xbf3736(480)]();
        if (_0x48a624 !== _0x1dd722)
          return _0x48a624["localeCompare"](_0x1dd722);
        return qualityRank(_0x1ca243[_0xbf3736(501)]) - qualityRank(_0x4bcfeb[_0xbf3736(_0x1bc882._0x1a78e4)]);
      }), _0xacb16e;
    } catch (_0x35acd5) {
      return console[_0x297011(_0x388b9c._0x1315de)]("[Vidrock]", _0x35acd5), [];
    }
  });
}
typeof module !== "undefined" && module["exports"] ? module["exports"] = { "getStreams": getStreams } : global[_0x1fe5d1(476)] = getStreams;
(function() {
  var _origGetStreams = typeof module !== "undefined" && module.exports && module.exports.getStreams || (typeof getStreams === "function" ? getStreams : typeof global !== "undefined" ? global.getStreams : null);
  if (typeof _origGetStreams !== "function")
    return;
  var TMDB_API_KEY_WRAP = "1865f43a0549ca50d341dd9ab8b29f49";
  var PROVIDER_NAME = "VidRock";
  var PROVIDER_ID = "vidrock";
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
