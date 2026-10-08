var _0x226edf=_0xe0f7;(function(_0x26ecc8,_0x1d359f){var _0x75b539={_0x424e46:0x195,_0x54ee72:0x180,_0x513888:0x18f,_0x4c9f38:0x199,_0x408640:0x185,_0x2685ba:0x170},_0x4c42b5=_0xe0f7,_0x1dee5d=_0x26ecc8();while(!![]){try{var _0x12853c=parseInt(_0x4c42b5(0x1af))/0x1+-parseInt(_0x4c42b5(_0x75b539._0x424e46))/0x2*(parseInt(_0x4c42b5(0x181))/0x3)+parseInt(_0x4c42b5(_0x75b539._0x54ee72))/0x4+-parseInt(_0x4c42b5(0x1a0))/0x5+parseInt(_0x4c42b5(0x182))/0x6*(parseInt(_0x4c42b5(_0x75b539._0x513888))/0x7)+-parseInt(_0x4c42b5(_0x75b539._0x4c9f38))/0x8*(parseInt(_0x4c42b5(_0x75b539._0x408640))/0x9)+-parseInt(_0x4c42b5(_0x75b539._0x2685ba))/0xa*(parseInt(_0x4c42b5(0x189))/0xb);if(_0x12853c===_0x1d359f)break;else _0x1dee5d['push'](_0x1dee5d['shift']());}catch(_0x1989d0){_0x1dee5d['push'](_0x1dee5d['shift']());}}}(_0x213d,0x9974b));var __async=(_0x44489b,_0x513ad7,_0x17bbab)=>{return new Promise((_0xfaba12,_0x4970ca)=>{var _0x1bfe9d={_0x5f0012:0x16e},_0x1b09cf=_0xe0f7,_0x14fcd8=_0x5d8e00=>{try{_0x2b8ad7(_0x17bbab['next'](_0x5d8e00));}catch(_0x365111){_0x4970ca(_0x365111);}},_0x1dfcd1=_0x296e8a=>{var _0x5aab52=_0xe0f7;try{_0x2b8ad7(_0x17bbab[_0x5aab52(_0x1bfe9d._0x5f0012)](_0x296e8a));}catch(_0x26d4b3){_0x4970ca(_0x26d4b3);}},_0x2b8ad7=_0x5608a2=>_0x5608a2['done']?_0xfaba12(_0x5608a2[_0x1b09cf(0x176)]):Promise[_0x1b09cf(0x1b5)](_0x5608a2['value'])['then'](_0x14fcd8,_0x1dfcd1);_0x2b8ad7((_0x17bbab=_0x17bbab['apply'](_0x44489b,_0x513ad7))[_0x1b09cf(0x19f)]());});},PROVIDER_NAME=_0x226edf(0x1b9),PERSIAN_BASE=_0x226edf(0x16f),TMDB_API_KEY=_0x226edf(0x1ac),FETCH_TIMEOUT=0x2ee0,USER_AGENT='Mozilla/5.0\x20(Windows\x20NT\x2010.0;\x20Win64;\x20x64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/124.0.0.0\x20Safari/537.36';function log(_0x149898){var _0x3c644c={_0x217a55:0x1a1},_0x336321=_0x226edf;console[_0x336321(_0x3c644c._0x217a55)]('['+PROVIDER_NAME+']\x20'+_0x149898);}function err(_0x3da78e){console['error']('['+PROVIDER_NAME+']\x20'+_0x3da78e);}function _0x213d(){var _0x602545=['4PY077Ipia','DMfSDwu','CMvSzwfZzv9KyxrL','qxrTB3m','C3rYzwfTCW','ihm9','p2fWAv9RzxK9','8j+mUca','req1lJe','ipcFLlNWN4Yzia','ihr5Cgu9','mZu2mJK4mgHPyvnvAq','mJy1nJjAwKP0se4','mtjlu2jfD0O','BMfTzq','ihWG','oxPmENz3Ca','8j+sJIa','8j+tNca','ipcFLlKG','mJjHqvfRt2y','ipcFLlKGuW','AgrY','uMv0CNLPBMCGD2L0AcbMywXSyMfJAYbLBMrWB2LUDdOG','v0vclvjPCa','zMLYC3rFywLYx2rHDgu','mZm0nda0n1rXwwrNrW','rMv0y2HPBMCGC3rYzwfTCYbMCM9ToIa','z2v0u3rYzwfTCW','l3n0CMvHBs9TB3zPzs8','sersmta','vhj1zuHe','nhvny0Tssa','zgq1lJe','BgvUz3rO','ANnVBG','nJa1oty4ohLQtKnmuq','yxrTB3m','zxH0zxjUywXFAwrZ','iokaOIa','tM8GC3rYzwfTCYbYzxr1CM5LzcbMCM9TifbLCNnPyw5tDhjLBwLV','ugvYC2LHBLn0CMvTAw8GvgL0Bgu','BMv4Da','nJGXnJi1Evr5AK5X','Bg9N','C2vYAwvZ','ndGWCa','lMPZB24','u0rs','Dhj1zwHK','ihWGrhvHBc1bDwrPBW','Dg9mB3DLCKnHC2u','ic0+ia','DgL0Bgu','l3n0CMvHBs9ZzxjPzxmV','ndm5yZq3oge3nZfMmZvJmduWmJjMowzLywjJy2eWmwm','Aw1KyL9Pza','Cg9W','ndKWnduYC2vJD2LW','ChvZAa','Edi2nq','mta4mha','mtbIAxq','v0vclurm','CMvZB2X2zq','uMvXDwvZDdOGDg1KyKLKpq','8j+pM++4JYa','ipcFLlNWN6E/ia','ugvYC2LHBLn0CMvTAw8','tva0','Aw5KzxHpzG','DgHYB3C','Ahr0Chm6lY9WzxjZAwfUC3rYzw1PBY52zxjJzwWUyxbW','mZK4mJK1mhjlz0THDa','sevwqW','DxjS','mtaTyML0','zxHWB3j0CW'];_0x213d=function(){return _0x602545;};return _0x213d();}function raceTimeout(_0x5f3a4d){return new Promise(function(_0x162460,_0x341542){setTimeout(function(){_0x341542(new Error('Timeout\x20'+_0x5f3a4d+'ms'));},_0x5f3a4d);});}function fetchJson(_0x5eff64){return __async(this,null,function*(){var _0x1d23a0=_0xe0f7;try{var _0x4b935b=fetch(_0x5eff64,{'headers':{'User-Agent':USER_AGENT,'Accept':'application/json'}}),_0x198c46=yield Promise['race']([_0x4b935b,raceTimeout(FETCH_TIMEOUT)]);if(_0x198c46&&_0x198c46['ok'])return yield _0x198c46[_0x1d23a0(0x198)]();}catch(_0x12d83d){err('fetch\x20failed:\x20'+_0x5eff64+_0x1d23a0(0x1a9)+(_0x12d83d['message']||''));}return null;});}function getTMDBDetails(_0x4cfbe0,_0x4adee2){var _0x20e62c={_0x56bed7:0x19e,_0x3d6ffd:0x1aa,_0x55d33f:0x1ad};return __async(this,null,function*(){var _0x3342f9=_0xe0f7,_0x36bc82=_0x4adee2==='tv'||_0x4adee2===_0x3342f9(0x1a2),_0x2d8ff2=_0x36bc82?'tv':'movie',_0x1fcbf0='https://api.tmdb.org/3/'+_0x2d8ff2+'/'+_0x4cfbe0+_0x3342f9(0x17b)+TMDB_API_KEY+'&append_to_response=external_ids',_0x12f02f=yield fetchJson(_0x1fcbf0);if(!_0x12f02f)return{'title':_0x3342f9(_0x20e62c._0x56bed7),'year':'','imdbId':null};return{'title':(_0x36bc82?_0x12f02f['name']:_0x12f02f[_0x3342f9(_0x20e62c._0x3d6ffd)])||'PersianStremio\x20Title','year':(_0x36bc82?_0x12f02f[_0x3342f9(0x18e)]||'':_0x12f02f[_0x3342f9(0x177)]||'')['split']('-')[0x0],'imdbId':_0x12f02f['imdb_id']||_0x12f02f[_0x3342f9(0x19b)]&&_0x12f02f['external_ids'][_0x3342f9(_0x20e62c._0x55d33f)]||null};});}function buildDropdownMetadata(_0x8b1315,_0xd0cc58,_0x3ce2ce,_0x4031db,_0x456e8d,_0x5d46fb){var _0x2c2fcd={_0xc08232:0x1a8,_0x4de14a:0x187,_0x22990f:0x186,_0xf6fd7c:0x16d,_0x517e1a:0x1b4,_0x3272bb:0x16d,_0x481e01:0x1a5,_0x2eb890:0x1b3,_0x15e823:0x1b1,_0x77634a:0x172,_0x2efe85:0x175,_0xc5f031:0x1b8,_0x4f4476:0x196,_0x2db90c:0x16d,_0x31ecdc:0x1b0,_0x146bc4:0x178,_0xdbbc27:0x19c},_0x132e26=_0x226edf,_0xcdbaa2=_0x8b1315['title']||'PersianStremio\x20Title',_0x6a110d=_0x8b1315['year']||'',_0x27ad12=(_0x5d46fb['title']||'')+'\x20'+(_0x5d46fb[_0x132e26(0x183)]||'')+'\x20'+(_0x5d46fb['url']||''),_0x3529a4=_0x27ad12[_0x132e26(_0x2c2fcd._0xc08232)](),_0x1667db=_0x132e26(_0x2c2fcd._0x4de14a)+_0xcdbaa2;if(_0x6a110d)_0x1667db+=_0x132e26(0x188)+_0x6a110d;_0x3ce2ce&&_0x4031db!=null&&_0x456e8d!=null&&(_0x1667db+=_0x132e26(0x18a)+_0x4031db+'E'+_0x456e8d);var _0x32cb83=_0x132e26(_0x2c2fcd._0x22990f);if(_0xd0cc58[_0x132e26(_0x2c2fcd._0xf6fd7c)]('2160')!==-0x1||_0xd0cc58[_0x132e26(0x16d)]('4k')!==-0x1)_0x32cb83='✨\x20';var _0xc84a08=_0x132e26(_0x2c2fcd._0x517e1a);if(_0x3529a4['indexOf']('web-rip')!==-0x1||_0x3529a4[_0x132e26(0x16d)]('webrip')!==-0x1)_0xc84a08=_0x132e26(0x18d);else{if(_0x3529a4['indexOf']('bluray')!==-0x1||_0x3529a4[_0x132e26(_0x2c2fcd._0x3272bb)]('blu-ray')!==-0x1)_0xc84a08='Blu-Ray';}var _0x20e497=_0x32cb83+_0xd0cc58+_0x132e26(0x17e)+_0xc84a08,_0x12ae7c=_0x132e26(_0x2c2fcd._0x481e01);if(_0x3529a4['indexOf']('hdr10+')!==-0x1)_0x12ae7c='HDR10+';else{if(_0x3529a4[_0x132e26(0x16d)]('hdr10')!==-0x1)_0x12ae7c=_0x132e26(0x193);else{if(_0x3529a4[_0x132e26(_0x2c2fcd._0xf6fd7c)](_0x132e26(0x18b))!==-0x1)_0x12ae7c='HDR';}}var _0x1c4cc5='';(_0x3529a4[_0x132e26(0x16d)](_0x132e26(_0x2c2fcd._0x2eb890))!==-0x1||_0x3529a4['indexOf'](_0x132e26(0x173))!==-0x1)&&(_0x1c4cc5='\x20|\x20🌈\x2010Bit');var _0x507fa4='x264';if(_0x3529a4[_0x132e26(0x16d)]('dv')!==-0x1||_0x3529a4['indexOf']('dovi')!==-0x1||_0x3529a4['indexOf']('dolby\x20vision')!==-0x1)_0x507fa4='DV';else{if(_0x3529a4['indexOf']('hevc')!==-0x1)_0x507fa4=_0x132e26(0x171);else{if(_0x3529a4[_0x132e26(0x16d)]('x265')!==-0x1||_0x3529a4['indexOf']('h265')!==-0x1)_0x507fa4=_0x132e26(_0x2c2fcd._0x15e823);}}var _0x4dc057=_0x5d46fb[_0x132e26(_0x2c2fcd._0x77634a)]&&_0x5d46fb[_0x132e26(0x172)]['indexOf']('.mp4')!==-0x1?_0x132e26(0x16c):'MKV',_0x454773=_0x132e26(_0x2c2fcd._0x2efe85)+_0x12ae7c+_0x1c4cc5+_0x132e26(_0x2c2fcd._0xc5f031)+_0x507fa4+'\x20🔹💠\x20'+_0x4dc057,_0x13aaf2='AAC';if(_0x3529a4['indexOf']('ddp5.1')!==-0x1||_0x3529a4['indexOf']('ddp\x205.1')!==-0x1)_0x13aaf2='DDP5.1';else(_0x3529a4[_0x132e26(0x16d)](_0x132e26(_0x2c2fcd._0x4f4476))!==-0x1||_0x3529a4['indexOf']('dd\x205.1')!==-0x1||_0x3529a4['indexOf']('5.1')!==-0x1)&&(_0x13aaf2=_0x132e26(0x17d));var _0x2d4dd2='🌍\x20Dual-Audio\x20-\x20🇺🇸\x20|\x20🇮🇷\x20🔹🎧\x20'+_0x13aaf2,_0x34cc20=[];if(_0x3529a4[_0x132e26(_0x2c2fcd._0x3272bb)](_0x132e26(0x1a6))!==-0x1)_0x34cc20['push'](_0x132e26(0x194));if(_0x3529a4[_0x132e26(_0x2c2fcd._0x2db90c)](_0x132e26(0x19a))!==-0x1)_0x34cc20[_0x132e26(_0x2c2fcd._0x31ecdc)](_0x132e26(_0x2c2fcd._0x146bc4));_0x34cc20['length']>0x0&&(_0x2d4dd2+='\x20🔹🔊\x20'+_0x34cc20['join'](_0x132e26(_0x2c2fcd._0xdbbc27)));var _0x1f16ba=_0x5d46fb['url']?_0x5d46fb['url']['split']('/')[_0x132e26(0x1ae)]():PROVIDER_NAME;try{_0x1f16ba=decodeURIComponent(_0x1f16ba);}catch(_0x230a8c){}var _0x17855d=_0x132e26(0x1b7)+(_0x5d46fb[_0x132e26(0x1aa)]||_0x1f16ba||PROVIDER_NAME);return _0x1667db+'\x0a'+_0x20e497+'\x0a'+_0x454773+'\x0a'+_0x2d4dd2+'\x0a'+_0x17855d;}function getStreams(_0x4cbac1,_0x51e9db,_0x395c2c,_0xc0c870){var _0x36a50c={_0xc4d59b:0x17a,_0x2907a8:0x1a4,_0x536976:0x1a4,_0x178c2f:0x179,_0x9da3f0:0x197,_0x3d3d24:0x1a7},_0x4711eb={_0x447e67:0x183},_0x30c1fb={_0x4605d4:0x16d};return __async(this,null,function*(){var _0x40b5ec=_0xe0f7,_0x415fbd=_0x51e9db==='tv'||_0x51e9db==='series';log(_0x40b5ec(0x1b6)+_0x4cbac1+_0x40b5ec(0x17f)+_0x51e9db+_0x40b5ec(_0x36a50c._0xc4d59b)+_0x395c2c+'\x20e='+_0xc0c870);var _0x26624d=yield getTMDBDetails(_0x4cbac1,_0x51e9db),_0x32fa61=_0x26624d['imdbId']||_0x4cbac1,_0x3e0677='';if(_0x415fbd){var _0x1dc1cc=_0x395c2c!=null?_0x395c2c:0x1,_0x962507=_0xc0c870!=null?_0xc0c870:0x1;_0x3e0677=PERSIAN_BASE+_0x40b5ec(0x1ab)+_0x32fa61+':'+_0x1dc1cc+':'+_0x962507+_0x40b5ec(_0x36a50c._0x2907a8);}else _0x3e0677=PERSIAN_BASE+'/stream/movie/'+_0x32fa61+_0x40b5ec(_0x36a50c._0x536976);log(_0x40b5ec(0x190)+_0x3e0677);var _0x2463f6=yield fetchJson(_0x3e0677);if((!_0x2463f6||!_0x2463f6['streams']||!_0x2463f6['streams']['length'])&&_0x26624d['imdbId']){var _0x2bfe87=_0x415fbd?PERSIAN_BASE+_0x40b5ec(0x1ab)+_0x4cbac1+':'+(_0x395c2c||0x1)+':'+(_0xc0c870||0x1)+'.json':PERSIAN_BASE+_0x40b5ec(0x192)+_0x4cbac1+'.json';log(_0x40b5ec(0x18c)+_0x2bfe87),_0x2463f6=yield fetchJson(_0x2bfe87);}if(!_0x2463f6||!_0x2463f6['streams']||!_0x2463f6[_0x40b5ec(_0x36a50c._0x178c2f)][_0x40b5ec(_0x36a50c._0x9da3f0)])return log(_0x40b5ec(0x19d)),[];var _0x5740f5=[],_0xe6fa96={};for(var _0x5a422b=0x0;_0x5a422b<_0x2463f6['streams']['length'];_0x5a422b++){var _0x11517e=_0x2463f6['streams'][_0x5a422b],_0x1459df=_0x11517e[_0x40b5ec(0x172)]||_0x11517e['externalUrl'];if(!_0x1459df||_0xe6fa96[_0x1459df])continue;_0xe6fa96[_0x1459df]=!![];var _0x312a58=((_0x11517e[_0x40b5ec(0x1aa)]||'')+'\x20'+(_0x11517e['name']||'')+'\x20'+_0x1459df)['toLowerCase'](),_0xc390a4='1080p';if(_0x312a58['indexOf']('2160')!==-0x1||_0x312a58[_0x40b5ec(0x16d)]('4k')!==-0x1)_0xc390a4='2160p';else{if(_0x312a58['indexOf']('720')!==-0x1)_0xc390a4='720p';else{if(_0x312a58['indexOf']('480')!==-0x1)_0xc390a4=_0x40b5ec(0x1a3);}}var _0x20536a=buildDropdownMetadata(_0x26624d,_0xc390a4,_0x415fbd,_0x395c2c,_0xc0c870,_0x11517e);_0x5740f5['push']({'name':_0x40b5ec(0x17c)+PROVIDER_NAME+_0x40b5ec(0x184)+_0xc390a4+_0x40b5ec(_0x36a50c._0x3d3d24),'title':_0x20536a,'size':_0x20536a,'description':_0x20536a,'url':_0x1459df,'quality':'','language':'','headers':{'User-Agent':USER_AGENT,'Referer':PERSIAN_BASE+'/'}});}function _0x139acb(_0x451f59){var _0xd797f5=_0x40b5ec,_0x33ab7a=_0x451f59[_0xd797f5(0x1a8)]();if(_0x33ab7a['indexOf']('2160p')!==-0x1||_0x33ab7a[_0xd797f5(0x16d)]('4k')!==-0x1)return 0x870;if(_0x33ab7a[_0xd797f5(_0x30c1fb._0x4605d4)](_0xd797f5(0x1b2))!==-0x1)return 0x438;if(_0x33ab7a[_0xd797f5(_0x30c1fb._0x4605d4)]('720p')!==-0x1)return 0x2d0;if(_0x33ab7a['indexOf'](_0xd797f5(0x1a3))!==-0x1)return 0x1e0;return 0x0;}return _0x5740f5['sort'](function(_0x2302ac,_0x34163b){var _0xaf7c6a=_0x40b5ec;return _0x139acb(_0x34163b['name'])-_0x139acb(_0x2302ac[_0xaf7c6a(_0x4711eb._0x447e67)]);}),log('Returning\x20'+_0x5740f5['length']+'\x20sorted\x20streams'),_0x5740f5;});}function _0xe0f7(_0x416102,_0x29ac04){_0x416102=_0x416102-0x16c;var _0x213d4=_0x213d();var _0xe0f7cd=_0x213d4[_0x416102];if(_0xe0f7['OiObII']===undefined){var _0x19848d=function(_0x117ba2){var _0xc18f14='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x44489b='',_0x513ad7='';for(var _0x17bbab=0x0,_0xfaba12,_0x4970ca,_0x14fcd8=0x0;_0x4970ca=_0x117ba2['charAt'](_0x14fcd8++);~_0x4970ca&&(_0xfaba12=_0x17bbab%0x4?_0xfaba12*0x40+_0x4970ca:_0x4970ca,_0x17bbab++%0x4)?_0x44489b+=String['fromCharCode'](0xff&_0xfaba12>>(-0x2*_0x17bbab&0x6)):0x0){_0x4970ca=_0xc18f14['indexOf'](_0x4970ca);}for(var _0x1dfcd1=0x0,_0x2b8ad7=_0x44489b['length'];_0x1dfcd1<_0x2b8ad7;_0x1dfcd1++){_0x513ad7+='%'+('00'+_0x44489b['charCodeAt'](_0x1dfcd1)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x513ad7);};_0xe0f7['QXBngl']=_0x19848d,_0xe0f7['eCBsUU']={},_0xe0f7['OiObII']=!![];}var _0x12386a=_0x213d4[0x0],_0x381fee=_0x416102+_0x12386a,_0x34a699=_0xe0f7['eCBsUU'][_0x381fee];return!_0x34a699?(_0xe0f7cd=_0xe0f7['QXBngl'](_0xe0f7cd),_0xe0f7['eCBsUU'][_0x381fee]=_0xe0f7cd):_0xe0f7cd=_0x34a699,_0xe0f7cd;}typeof module!=='undefined'&&module[_0x226edf(0x174)]?module[_0x226edf(0x174)]={'getStreams':getStreams}:global[_0x226edf(0x191)]=getStreams;

// ==================== CHOLE BHATURE METADATA ENHANCER ====================
(function() {
  var _origGetStreams = (typeof module !== 'undefined' && module.exports && module.exports.getStreams) || 
                        (typeof getStreams === 'function' ? getStreams : (typeof global !== 'undefined' ? global.getStreams : null));
  if (typeof _origGetStreams !== 'function') return;

  var TMDB_API_KEY_WRAP = '1865f43a0549ca50d341dd9ab8b29f49';
  var PROVIDER_NAME = "PersianStremio";
  var PROVIDER_ID = "persianstremio";
  var DEFAULT_LANG = "🇮🇷 Persian Dub";

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
