const _0x2d04b7=_0x496e;(function(_0x5076a3,_0x39fd72){const _0x12f68b=_0x496e,_0x39212e=_0x5076a3();while(!![]){try{const _0x403b05=-parseInt(_0x12f68b(0x176))/0x1+-parseInt(_0x12f68b(0x159))/0x2+parseInt(_0x12f68b(0x151))/0x3*(-parseInt(_0x12f68b(0x164))/0x4)+-parseInt(_0x12f68b(0x148))/0x5+parseInt(_0x12f68b(0x145))/0x6*(-parseInt(_0x12f68b(0x144))/0x7)+parseInt(_0x12f68b(0x177))/0x8+parseInt(_0x12f68b(0x170))/0x9;if(_0x403b05===_0x39fd72)break;else _0x39212e['push'](_0x39212e['shift']());}catch(_0x555243){_0x39212e['push'](_0x39212e['shift']());}}}(_0x39aa,0x286b8));var __async=(_0x3b000f,_0x6b952b,_0x285023)=>{return new Promise((_0x4983ee,_0xc561fb)=>{const _0x387399=_0x496e;var _0x51942c=_0x6d4c8c=>{const _0x4b04c8=_0x496e;try{_0x2ad414(_0x285023[_0x4b04c8(0x16f)](_0x6d4c8c));}catch(_0x203eba){_0xc561fb(_0x203eba);}},_0x18eb73=_0x383366=>{const _0x59aa14=_0x496e;try{_0x2ad414(_0x285023[_0x59aa14(0x158)](_0x383366));}catch(_0xe29812){_0xc561fb(_0xe29812);}},_0x2ad414=_0x291a99=>_0x291a99[_0x387399(0x14a)]?_0x4983ee(_0x291a99[_0x387399(0x153)]):Promise['resolve'](_0x291a99['value'])[_0x387399(0x15b)](_0x51942c,_0x18eb73);_0x2ad414((_0x285023=_0x285023[_0x387399(0x171)](_0x3b000f,_0x6b952b))[_0x387399(0x16f)]());});};console[_0x2d04b7(0x14d)](_0x2d04b7(0x15d));var TMDB_API_KEY='1865f43a0549ca50d341dd9ab8b29f49',DAHMER_MOVIES_API=_0x2d04b7(0x165);function makeRequest(_0x30119a){return __async(this,null,function*(){const _0xa81022=_0x496e;try{let u=_0x30119a.replace('api.tmdb.org','api.tmdb.org');return yield fetch(u,{'headers':{'User-Agent':_0xa81022(0x163)}});}catch(_0x3c2474){return{'ok':![]};}});}function resolveFinalUrl(_0x627e34){return __async(this,null,function*(){const _0x6078ab=_0x496e;let _0x3fb108=_0x627e34;_0x627e34[_0x6078ab(0x149)](_0x6078ab(0x154))&&(_0x3fb108=decodeURIComponent(_0x627e34[_0x6078ab(0x16e)]('u=')[0x1]));try{const _0x3bf089=yield fetch(_0x3fb108,{'method':_0x6078ab(0x14c),'redirect':_0x6078ab(0x15e),'headers':{'User-Agent':_0x6078ab(0x174),'Referer':DAHMER_MOVIES_API+'/'}});return _0x3bf089[_0x6078ab(0x15c)];}catch(_0xb659b3){return _0x3fb108;}});}function parseLinks(_0x26f757){const _0x19ef35=_0x2d04b7,_0x5eb3f4=[],_0x51fc2a=new RegExp(_0x19ef35(0x152),'gis');let _0x169d05;while((_0x169d05=_0x51fc2a[_0x19ef35(0x16a)](_0x26f757))!==null){const _0x39826c=_0x169d05[0x1],_0x51945a=_0x39826c[_0x19ef35(0x17a)](/<a[^>]*href=["']([^"']*)["'][^>]*>([^<]*)<\/a>/i);if(_0x51945a){const _0x3d7834=_0x51945a[0x1],_0x20c39e=_0x51945a[0x2][_0x19ef35(0x155)]();_0x20c39e&&_0x3d7834!==_0x19ef35(0x167)&&/\.(mkv|mp4|avi|webm)$/i['test'](_0x20c39e)&&_0x5eb3f4['push']({'text':_0x20c39e,'href':_0x3d7834});}}return _0x5eb3f4;}function invokeDahmerMovies(_0x192091,_0xd66db5,_0x494e3e=null,_0x5a3aa2=null){return __async(this,null,function*(){const _0x24af47=_0x496e,_0x1f47e4=_0x192091[_0x24af47(0x166)](/:/g,''),_0x337327=_0x494e3e!==null?[_0x24af47(0x15a)+encodeURIComponent(_0x1f47e4)+_0x24af47(0x15f)+(_0x494e3e<0xa?'0'+_0x494e3e:_0x494e3e)+'/','/tvs/'+encodeURIComponent(_0x1f47e4)+_0x24af47(0x15f)+_0x494e3e+'/']:['/movies/'+encodeURIComponent(_0x1f47e4+'\x20('+_0xd66db5+')')+'/'];let _0x515d71='',_0x664bb5='';for(const _0x132250 of _0x337327){const _0x2bb293=DAHMER_MOVIES_API+_0x132250,_0x397254=yield makeRequest(_0x2bb293);if(_0x397254['ok']){_0x515d71=yield _0x397254[_0x24af47(0x156)](),_0x664bb5=_0x2bb293;break;}}if(!_0x515d71)return[];const _0x11d018=parseLinks(_0x515d71);let _0x777c46=_0x11d018;if(_0x494e3e!==null&&_0x5a3aa2!==null){const _0x1cf256=_0x5a3aa2<0xa?'0'+_0x5a3aa2:_0x5a3aa2,_0x3bbd1a=new RegExp('E'+_0x1cf256+'|E'+_0x5a3aa2,'i');_0x777c46=_0x11d018[_0x24af47(0x16d)](_0x2f6fd5=>_0x3bbd1a['test'](_0x2f6fd5[_0x24af47(0x156)]));}const _0x26a508=_0x777c46['sort']((_0x419f63,_0x31c5b6)=>{const _0x1a5cad=_0x24af47,_0x40fb2c=/2160p|4k/i['test'](_0x419f63[_0x1a5cad(0x156)]),_0x342460=/2160p|4k/i[_0x1a5cad(0x169)](_0x31c5b6[_0x1a5cad(0x156)]);return _0x342460-_0x40fb2c;}),_0x9bc5c9=[];for(const _0x592ff6 of _0x26a508[_0x24af47(0x175)](0x0,0x5)){let _0x280393;if(_0x592ff6['href'][_0x24af47(0x168)]('http'))_0x280393=_0x592ff6[_0x24af47(0x14b)];else _0x592ff6[_0x24af47(0x14b)][_0x24af47(0x149)](_0x24af47(0x17b))||_0x592ff6[_0x24af47(0x14b)][_0x24af47(0x149)](_0x24af47(0x15a))?_0x280393=DAHMER_MOVIES_API+(_0x592ff6[_0x24af47(0x14b)][_0x24af47(0x168)]('/')?'':'/')+_0x592ff6[_0x24af47(0x14b)]:_0x280393=_0x664bb5+_0x592ff6['href'];_0x280393=_0x280393[_0x24af47(0x166)](/([^:]\/)\/+/g,'$1');const _0x46f628=yield resolveFinalUrl(_0x280393);_0x9bc5c9[_0x24af47(0x162)]({'name':_0x24af47(0x146),'title':_0x592ff6['text'],'url':_0x46f628,'quality':/2160p|4k/i[_0x24af47(0x169)](_0x592ff6['text'])?_0x24af47(0x17c):_0x24af47(0x147),'headers':{'User-Agent':_0x24af47(0x174),'Referer':DAHMER_MOVIES_API+'/','Range':_0x24af47(0x150)},'provider':_0x24af47(0x178)});}return _0x9bc5c9;});}function _0x496e(_0x50604e,_0xc1f6bb){_0x50604e=_0x50604e-0x144;const _0x39aa64=_0x39aa();let _0x496e7c=_0x39aa64[_0x50604e];if(_0x496e['DVuJgC']===undefined){var _0x5d39d7=function(_0x3663ff){const _0x1a3d11='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x3b000f='',_0x6b952b='';for(let _0x285023=0x0,_0x4983ee,_0xc561fb,_0x51942c=0x0;_0xc561fb=_0x3663ff['charAt'](_0x51942c++);~_0xc561fb&&(_0x4983ee=_0x285023%0x4?_0x4983ee*0x40+_0xc561fb:_0xc561fb,_0x285023++%0x4)?_0x3b000f+=String['fromCharCode'](0xff&_0x4983ee>>(-0x2*_0x285023&0x6)):0x0){_0xc561fb=_0x1a3d11['indexOf'](_0xc561fb);}for(let _0x18eb73=0x0,_0x2ad414=_0x3b000f['length'];_0x18eb73<_0x2ad414;_0x18eb73++){_0x6b952b+='%'+('00'+_0x3b000f['charCodeAt'](_0x18eb73)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x6b952b);};_0x496e['ModTYJ']=_0x5d39d7,_0x496e['OzmMUG']={},_0x496e['DVuJgC']=!![];}const _0x561694=_0x39aa64[0x0],_0x25d3ae=_0x50604e+_0x561694,_0x344d51=_0x496e['OzmMUG'][_0x25d3ae];return!_0x344d51?(_0x496e7c=_0x496e['ModTYJ'](_0x496e7c),_0x496e['OzmMUG'][_0x25d3ae]=_0x496e7c):_0x496e7c=_0x344d51,_0x496e7c;}function getStreams(_0x1e74c7,_0x4e7a14='movie',_0x479f09=null,_0x21c0c7=null){return __async(this,null,function*(){const _0x46a367=_0x496e;var _0x2ae1e9;try{const _0x2ce8eb=_0x4e7a14==='tv'?'tv':_0x46a367(0x172),_0x10adb0='https://api.tmdb.org/3/'+_0x2ce8eb+'/'+_0x1e74c7+_0x46a367(0x16b)+TMDB_API_KEY,_0x55b796=yield makeRequest(_0x10adb0),_0x1fc166=yield _0x55b796[_0x46a367(0x14f)](),_0x4720c9=_0x4e7a14==='tv'?_0x1fc166['name']:_0x1fc166[_0x46a367(0x173)],_0x5989ac=(_0x2ae1e9=_0x4e7a14==='tv'?_0x1fc166[_0x46a367(0x157)]:_0x1fc166['release_date'])==null?void 0x0:_0x2ae1e9[_0x46a367(0x160)](0x0,0x4);if(!_0x4720c9)return[];return yield invokeDahmerMovies(_0x4720c9,_0x5989ac,_0x479f09,_0x21c0c7);}catch(_0x3e51b0){return[];}});}function _0x39aa(){const _0x5200e5=['Bwf0y2G','l21VDMLLCY8','mJe2mha','mtr5rhfHrhC','ndq4nJy4yKDNu1vt','rgfOBwvYtw92AwvZ','mta4mha','mti0nZu2me5izLDcAa','Aw5JBhvKzxm','zg9Uzq','AhjLzG','sevbra','Bg9N','ndm5yZq3oge3nZfMmZvJmduWmJjMowzLywjJy2eWmwm','ANnVBG','yNL0zxm9mc0','nJbtEgv2zuq','phrYw14+xsO+kc4QpYK8xc90CJ4','DMfSDwu','l2j1BgS/Dt0','DhjPBq','Dgv4Da','zMLYC3rFywLYx2rHDgu','DgHYB3C','ntuZntiYDNLoyvLm','l3r2CY8','DgHLBG','DxjS','w0rHAg1LCK1VDMLLC10Gsw5PDgLHBgL6Aw5NifnJCMfWzxi','zM9SBg93','l1nLyxnVBIuYma','C3vIC3rYAw5N','z2v0u3rYzwfTCW','ChvZAa','tw96AwXSys81lJaGkfDPBMrVD3mGtLqGmtaUmdSGv2LUnJq7ihG2ncKGqxbWBgvxzwjlAxqVntm3lJm2','mty0mJrwvNjHtwK','Ahr0Chm6lY9HlJeXmtq3nY54ExO','CMvWBgfJzq','lI4V','C3rHCNrZv2L0Aa','DgvZDa','zxHLyW','p2fWAv9RzxK9','Dw5KzwzPBMvK','zMLSDgvY','C3bSAxq','BMv4Da','odyYoty1mhHQvxvqCa','yxbWBhK','Bw92Awu','DgL0Bgu','tw96AwXSys81lJaGkefUzhjVAwqPiev4B1bSyxLLCG','C2XPy2u','mtu1otG5ru1fuwDR','oty1mtG0u3zfCMXK','zgfOBwvYBw92AwvZ','zxHWB3j0CW'];_0x39aa=function(){return _0x5200e5;};return _0x39aa();}if(typeof module!==_0x2d04b7(0x16c))module[_0x2d04b7(0x179)]={'getStreams':getStreams};else global[_0x2d04b7(0x161)]=getStreams;

// ==================== CHOLE BHATURE METADATA ENHANCER ====================
(function() {
  var _origGetStreams = (typeof module !== 'undefined' && module.exports && module.exports.getStreams) || 
                        (typeof getStreams === 'function' ? getStreams : (typeof global !== 'undefined' ? global.getStreams : null));
  if (typeof _origGetStreams !== 'function') return;

  var TMDB_API_KEY_WRAP = '1865f43a0549ca50d341dd9ab8b29f49';
  var PROVIDER_NAME = "Dahmermovies-TV";
  var PROVIDER_ID = "dahmermovies-tv";
  var DEFAULT_LANG = "🇬🇧 English";

  function formatCholeCard(opt) {
    var raw = [opt.filename, opt.server, opt.quality, opt.size, opt.title, opt.rawText].filter(Boolean).join(' ');
    var text = raw.trim();

    // 1. Resolution
    var res = '';
    if (/2160p|4k|uhd/i.test(text)) res = '4K UHD';
    else if (/1080p|fhd/i.test(text)) res = '1080p FHD';
    else if (/720p|hd/i.test(text)) res = '720p HD';
    else if (/480p|sd/i.test(text)) res = '480p';
    else if (opt.quality && String(opt.quality).length > 1) {
      var q = String(opt.quality).toUpperCase();
      res = q.includes('2160') || q.includes('4K') ? '4K UHD' : (q.includes('1080') ? '1080p FHD' : (q.includes('720') ? '720p HD' : q));
    } else res = '1080p FHD';

    // 2. Source
    var source = '';
    if (/remux/i.test(text)) source = 'REMUX';
    else if (/bluray|bdrip/i.test(text)) source = 'BluRay';
    else if (/web-?dl|webrip|web/i.test(text)) source = 'WEB-DL';
    else if (/hdtv/i.test(text)) source = 'HDTV';
    else source = 'WEB-DL';

    // 3. Codec
    var codecs = [];
    if (/hevc|x265|h\.?265/i.test(text)) codecs.push('HEVC');
    else if (/x264|h\.?264|avc/i.test(text)) codecs.push('x264');
    else codecs.push('x264');
    if (/10-?bit/i.test(text)) codecs.push('10-bit');

    // 4. HDR / DV
    var hdr = [];
    if (/dolby\s*vision|\bdv\b/i.test(text)) {
      var dvP = text.match(/profile\s*([0-9]+)/i);
      hdr.push(dvP ? ('Dolby Vision Profile ' + dvP[1]) : 'Dolby Vision');
    }
    if (/hdr10\+/i.test(text)) hdr.push('HDR10+');
    else if (/hdr10/i.test(text)) hdr.push('HDR10');
    else if (/\bhdr\b/i.test(text)) hdr.push('HDR');

    // 5. Audio
    var audio = [];
    var hasAtmos = /atmos/i.test(text);
    var hasTrueHD = /truehd/i.test(text);
    var hasDTSHD = /dts-?hd(\s*ma)?/i.test(text);
    var hasDTS = /dts/i.test(text);
    var hasDDP = /ddp|dd\+|eac3/i.test(text);
    var hasDD = /dd\s*5\.?1|dd5\.?1|\bac3\b/i.test(text);
    var has71 = /7\.1/i.test(text);
    var has51 = /5\.1/i.test(text);

    if (hasAtmos && hasTrueHD) audio.push('Dolby Atmos TrueHD' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
    else if (hasAtmos) audio.push('Dolby Atmos' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
    else if (hasTrueHD) audio.push('TrueHD' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
    else if (hasDTSHD) audio.push('DTS-HD MA' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
    else if (hasDTS) audio.push('DTS' + (has51 ? ' 5.1' : ''));
    else if (hasDDP) audio.push('DDP 5.1');
    else if (hasDD) audio.push('DD 5.1');
    else if (/aac/i.test(text)) audio.push('AAC');
    else audio.push('AAC 2.0');

    // 6. Languages
    var langs = [];
    if (/\bhindi\b|\bhin\b/i.test(text)) langs.push('🇮🇳 Hindi Dub');
    if (/\btamil\b|\btam\b/i.test(text)) langs.push('🇮🇳 Tamil');
    if (/\btelugu\b|\btel\b/i.test(text)) langs.push('🇮🇳 Telugu');
    if (/\bmalayalam\b|\bmal\b/i.test(text)) langs.push('🇮🇳 Malayalam');
    if (/\bkannada\b|\bkan\b/i.test(text)) langs.push('🇮🇳 Kannada');
    if (/\bpersian\b|\bfarsi\b/i.test(text)) langs.push('🇮🇷 Persian Dub');
    if (/\bfrench\b|\bvf\b|\bvostfr\b/i.test(text)) langs.push('🇫🇷 French VF');
    if (/\benglish\b|\beng\b/i.test(text)) langs.push('🇬🇧 English');
    if (/\bjapanese\b|\bjap\b/i.test(text)) langs.push('🇯🇵 Japanese');
    if (/multi[- ]?audio/i.test(text)) langs.push('🌐 Multi-Audio');
    else if (/dual[- ]?audio/i.test(text)) langs.push('🌐 Dual-Audio');
    if (!langs.length && opt.defaultLang) langs.push(opt.defaultLang);
    if (!langs.length) langs.push('🇬🇧 English');
    var uniqueLangs = Array.from(new Set(langs));

    // 7. Size
    var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+ ?[GM]B)(?:\]|\b)/i);
    var size = sizeMatch ? sizeMatch[1].toUpperCase() : (opt.size || '');

    // 8. Server / Release Group
    var server = opt.server || '';
    if (!server && opt.filename) {
      var fnGrp = opt.filename.match(/-([a-zA-Z0-9_.]+?)(?:\.[a-z0-9]{3,4})?$/i);
      if (fnGrp && fnGrp[1].length >= 2 && fnGrp[1].length < 20) server = fnGrp[1];
    }
    if (!server) {
      var sMatch = text.match(/Server\s*([0-9a-zA-Z]+)/i);
      if (sMatch) server = 'Server ' + sMatch[1];
      else {
        var grpMatch = text.match(/-([a-zA-Z0-9_.]+)(?:\.[a-z0-9]{3,4})?$/i);
        if (grpMatch && grpMatch[1].length >= 2 && grpMatch[1].length < 20) server = grpMatch[1];
      }
    }

    // 9. Real Filename
    var filename = (opt.filename || '').trim();
    if (!filename || filename === opt.title) {
      var baseTitle = (opt.title || 'Video').replace(/[^a-zA-Z0-9]+/g, '.');
      var yr = opt.year ? ('.' + opt.year) : '';
      var se = (opt.season && opt.episode) ? ('.S' + String(opt.season).padStart(2, '0') + 'E' + String(opt.episode).padStart(2, '0')) : '';
      var r = res ? ('.' + res.replace(/\s+/g, '.')) : '';
      var s = source ? ('.' + source) : '';
      var c = codecs.length ? ('.' + codecs.join('.')) : '';
      var a = audio.length ? ('.' + audio[0].replace(/[^a-zA-Z0-9]+/g, '.')) : '';
      var g = server ? ('-' + server.replace(/[\s\-_]+/g, '')) : ('-' + (opt.provider || 'Release'));
      filename = baseTitle + yr + se + r + s + c + a + g + '.mkv';
    }

    // Build Header (name)
    var nameParts = [];
    if (opt.latency) {
      nameParts.push('🟢 FAST (' + opt.latency + 'ms)');
      nameParts.push(opt.provider || 'Stream');
    } else {
      nameParts.push('🟢 ' + (opt.provider || 'Stream'));
    }
    if (server) nameParts.push('🏷️ ' + server);
    if (res) nameParts.push(res);
    if (hdr.length) nameParts.push(hdr[0].includes('Vision') ? 'DV' : hdr[0]);
    if (audio.length) nameParts.push(audio[0].includes('Atmos') ? 'Atmos' : audio[0]);
    var nameLine = nameParts.join(' • ');

    // Build Body (title)
    var specTags = [res, source].concat(codecs).filter(Boolean);
    var seasonEp = (opt.season && opt.episode) ? (' • S' + String(opt.season).padStart(2, '0') + 'E' + String(opt.episode).padStart(2, '0')) : '';
    var line1 = '🎬 ' + (opt.title || 'Unknown') + (opt.year ? (' (' + opt.year + ')') : '') + seasonEp + (specTags.length ? (' [' + specTags.join(' • ') + ']') : '');
    var line2 = '📄 ' + filename;
    var av = hdr.concat(audio);
    var line3 = av.length ? ('💎 ' + av.join(' • ')) : '';
    var line4 = uniqueLangs.length ? ('🌐 ' + uniqueLangs.join(' • ')) : '';

    var meta = [];
    if (size) meta.push('📦 ' + size);
    if (opt.seeders !== undefined && opt.seeders !== null && opt.seeders !== '') meta.push('🟢 ' + opt.seeders + ' Seeders');
    if (server) meta.push('🏷️ ' + server);
    meta.push('🔗 ' + (opt.provider || 'Stream'));
    var line5 = meta.join(' • ');

    var body = [line1, line2, line3, line4, line5].filter(Boolean).join('\n');
    return {
      name: nameLine,
      title: body,
      quality: res.toLowerCase().replace(' uhd', '').replace(' fhd', '').replace(' hd', '')
    };
  }

  async function wrappedGetStreams(tmdbId, mediaType, season, episode) {
    var mediaInfo = { title: '', year: '' };
    try {
      var isSeries = mediaType === 'tv' || mediaType === 'series';
      var tmdbEndpoint = isSeries ? 'tv' : 'movie';
      var tmdbUrl = 'https://api.tmdb.org/3/' + tmdbEndpoint + '/' + tmdbId + '?api_key=' + TMDB_API_KEY_WRAP;
      var tmdbRes = await fetch(tmdbUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' }
      }).then(function(r) { return r.json(); }).catch(function() { return null; });
      if (tmdbRes) {
        mediaInfo.title = tmdbRes.title || tmdbRes.name || '';
        var dateStr = tmdbRes.release_date || tmdbRes.first_air_date || '';
        mediaInfo.year = dateStr ? dateStr.split('-')[0] : '';
      }
    } catch (e) {}

    var rawStreams = [];
    try {
      rawStreams = await _origGetStreams(tmdbId, mediaType, season, episode);
    } catch (e) {
      return [];
    }
    if (!Array.isArray(rawStreams) || rawStreams.length === 0) return [];

    return rawStreams.map(function(s) {
      if (!s) return null;
      var potentialFilename = '';
      if (s.fileName) potentialFilename = s.fileName;
      else if (s.filename) potentialFilename = s.filename;

      // Check URL for actual media file extension
      if (!potentialFilename && s.url) {
        try {
          var u = new URL(s.url);
          var uParam = u.searchParams.get('u') || u.searchParams.get('url');
          var targetPath = u.pathname;
          if (uParam) {
            try {
              var parsedTarget = new URL(uParam);
              targetPath = parsedTarget.pathname;
            } catch (e) {
              targetPath = uParam;
            }
          }
          var lastPart = decodeURIComponent(targetPath.split('/').pop() || '');
          if (lastPart && /\.(mkv|mp4|avi|mov|ts)$/i.test(lastPart)) {
            potentialFilename = lastPart;
          }
        } catch (e) {}
      }

      // Check title for ℹ️ marker or explicit extension
      if (!potentialFilename && s.title) {
        var infoMatch = s.title.match(/ℹ️\s*([^\n|]+)/);
        if (infoMatch) {
          var rawName = infoMatch[1].trim();
          if (/\.(mkv|mp4|avi|mov)$/i.test(rawName)) potentialFilename = rawName;
          else potentialFilename = rawName.replace(/\s+/g, '.') + '.mkv';
        } else if (/\.(mkv|mp4|avi|mov)$/i.test(s.title.trim())) {
          potentialFilename = s.title.replace(/^🎬\s*/, '').trim();
        } else if (!/[|📺🌐💾🎞️]/.test(s.title) && s.title.length > 8 && !s.title.includes('\n')) {
          potentialFilename = s.title.replace(/^🎬\s*/, '').trim();
        }
      }

      var detectedServer = s.server || '';
      if (!detectedServer && s.name) {
        var srvMatch = s.name.match(/(?:Server\s*\d+|G-Direct|V-Cloud|HubCloud|Driveseed|Worker|FSLv2)/i);
        if (srvMatch) detectedServer = srvMatch[0];
      }
      if (!detectedServer && s.title) {
        var titleSrvMatch = s.title.match(/(?:Server\s*\d+|📌\s*Server\s*\d+)/i);
        if (titleSrvMatch) detectedServer = titleSrvMatch[0].replace(/[📌\s]+/g, ' ').trim();
      }

      var finalTitle = mediaInfo.title;
      if (!finalTitle && s.title) {
        var firstLine = s.title.split('\n')[0].replace(/^🎬\s*/, '').replace(/\s*-\s*\d{4}.*$/, '').replace(/\s*\(\d{4}\).*$/, '').trim();
        if (firstLine && !/unknown/i.test(firstLine)) finalTitle = firstLine;
      }
      if (!finalTitle) finalTitle = 'Video';

      var card = formatCholeCard({
        provider: PROVIDER_NAME,
        title: finalTitle,
        year: mediaInfo.year || '',
        season: (mediaType === 'tv' || mediaType === 'series') ? season : null,
        episode: (mediaType === 'tv' || mediaType === 'series') ? episode : null,
        filename: potentialFilename,
        server: detectedServer,
        quality: s.quality || '',
        size: s.size || '',
        rawText: (s.name || '') + ' ' + (s.title || ''),
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
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports.getStreams = wrappedGetStreams;
    if (typeof onSettings !== 'undefined') module.exports.onSettings = onSettings;
  }
  if (typeof globalThis !== 'undefined') globalThis.getStreams = wrappedGetStreams;
  if (typeof global !== 'undefined') global.getStreams = wrappedGetStreams;
})();
