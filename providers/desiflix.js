var _0x4d7322=_0x5931;(function(_0x274395,_0x42d5c2){var _0x5a6e0b={_0x535452:0x236,_0x3f0ba1:0x204,_0x449d58:0x23f,_0x246868:0x201,_0x58f74c:0x1ed},_0x1fad9e=_0x5931,_0x45ac1a=_0x274395();while(!![]){try{var _0x159651=-parseInt(_0x1fad9e(0x1ee))/0x1*(parseInt(_0x1fad9e(0x200))/0x2)+parseInt(_0x1fad9e(_0x5a6e0b._0x535452))/0x3+-parseInt(_0x1fad9e(_0x5a6e0b._0x3f0ba1))/0x4*(parseInt(_0x1fad9e(0x207))/0x5)+parseInt(_0x1fad9e(0x228))/0x6+parseInt(_0x1fad9e(0x21d))/0x7*(-parseInt(_0x1fad9e(_0x5a6e0b._0x449d58))/0x8)+-parseInt(_0x1fad9e(_0x5a6e0b._0x246868))/0x9+parseInt(_0x1fad9e(_0x5a6e0b._0x58f74c))/0xa*(parseInt(_0x1fad9e(0x21b))/0xb);if(_0x159651===_0x42d5c2)break;else _0x45ac1a['push'](_0x45ac1a['shift']());}catch(_0x21869f){_0x45ac1a['push'](_0x45ac1a['shift']());}}}(_0x27f4,0x21116));var __async=(_0x17326d,_0x3bf1f8,_0x9587a8)=>{return new Promise((_0x370d04,_0x1b7722)=>{var _0x10c202=_0x5931,_0x4088dc=_0x43429a=>{try{_0x259de0(_0x9587a8['next'](_0x43429a));}catch(_0x54d9d2){_0x1b7722(_0x54d9d2);}},_0x157564=_0x54cc36=>{var _0x34a148=_0x5931;try{_0x259de0(_0x9587a8[_0x34a148(0x239)](_0x54cc36));}catch(_0x41b979){_0x1b7722(_0x41b979);}},_0x259de0=_0x1f9f9b=>_0x1f9f9b[_0x10c202(0x234)]?_0x370d04(_0x1f9f9b[_0x10c202(0x235)]):Promise[_0x10c202(0x230)](_0x1f9f9b['value'])['then'](_0x4088dc,_0x157564);_0x259de0((_0x9587a8=_0x9587a8[_0x10c202(0x208)](_0x17326d,_0x3bf1f8))['next']());});},PROVIDER_NAME=_0x4d7322(0x1e8),DESIFLIX_BASE='https://manifest.desitvhub.eu.org',TMDB_API_KEY='1865f43a0549ca50d341dd9ab8b29f49',FETCH_TIMEOUT=0x2ee0,USER_AGENT=_0x4d7322(0x222);function log(_0x59bee8){console['log']('['+PROVIDER_NAME+']\x20'+_0x59bee8);}function err(_0x5738fe){var _0x222701={_0x243566:0x23d},_0x4244da=_0x4d7322;console[_0x4244da(_0x222701._0x243566)]('['+PROVIDER_NAME+']\x20'+_0x5738fe);}function _0x5931(_0x231e7e,_0x4320d7){_0x231e7e=_0x231e7e-0x1e5;var _0x27f487=_0x27f4();var _0x5931a0=_0x27f487[_0x231e7e];if(_0x5931['ivjWSM']===undefined){var _0x285f6b=function(_0x39a065){var _0x7b51e2='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x17326d='',_0x3bf1f8='';for(var _0x9587a8=0x0,_0x370d04,_0x1b7722,_0x4088dc=0x0;_0x1b7722=_0x39a065['charAt'](_0x4088dc++);~_0x1b7722&&(_0x370d04=_0x9587a8%0x4?_0x370d04*0x40+_0x1b7722:_0x1b7722,_0x9587a8++%0x4)?_0x17326d+=String['fromCharCode'](0xff&_0x370d04>>(-0x2*_0x9587a8&0x6)):0x0){_0x1b7722=_0x7b51e2['indexOf'](_0x1b7722);}for(var _0x157564=0x0,_0x259de0=_0x17326d['length'];_0x157564<_0x259de0;_0x157564++){_0x3bf1f8+='%'+('00'+_0x17326d['charCodeAt'](_0x157564)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x3bf1f8);};_0x5931['tOfbOo']=_0x285f6b,_0x5931['gSBcIf']={},_0x5931['ivjWSM']=!![];}var _0x2de63d=_0x27f487[0x0],_0x1837e9=_0x231e7e+_0x2de63d,_0x2c12f1=_0x5931['gSBcIf'][_0x1837e9];return!_0x2c12f1?(_0x5931a0=_0x5931['tOfbOo'](_0x5931a0),_0x5931['gSBcIf'][_0x1837e9]=_0x5931a0):_0x5931a0=_0x2c12f1,_0x5931a0;}function raceTimeout(_0x31afe2){var _0x49ec66={_0x331f6b:0x1e6};return new Promise(function(_0x256f83,_0x3b6322){setTimeout(function(){var _0x44c5ad=_0x5931;_0x3b6322(new Error(_0x44c5ad(_0x49ec66._0x331f6b)+_0x31afe2+'ms'));},_0x31afe2);});}function fetchJson(_0x568905){var _0x986e8e={_0x3b2ab1:0x1f4,_0x291655:0x205};return __async(this,null,function*(){var _0x1d0b41=_0x5931;try{var _0x4f618d=fetch(_0x568905,{'headers':{'User-Agent':USER_AGENT,'Accept':_0x1d0b41(0x215)}}),_0x3a7a18=yield Promise['race']([_0x4f618d,raceTimeout(FETCH_TIMEOUT)]);if(_0x3a7a18&&_0x3a7a18['ok'])return yield _0x3a7a18[_0x1d0b41(_0x986e8e._0x3b2ab1)]();}catch(_0x365175){err('fetch\x20failed:\x20'+_0x568905+_0x1d0b41(_0x986e8e._0x291655)+(_0x365175['message']||''));}return null;});}function _0x27f4(){var _0x2b69a5=['ihr5Cgu9','mZG5mZzNz0X6t3G','tva0','BwfSyxLHBgfT','vgLTzw91Dca','l3n0CMvHBs9ZzxjPzxmV','rgvZAuzSAxG','D2vICMLW','C3bSAxq','p2fWAv9RzxK9','zxH0zxjUywXvCMW','mJbbCfflr0C','mZC0vw1IywjQ','mJe2mha','ihm9','C29YDa','ihWG8j+sVIa','DxjS','ANnVBG','Agv2yW','uMvXDwvZDdOGDg1KyKLKpq','EwvHCG','nZiWCa','qufd','8j+tPsbxruiTreW','rg9SyNKGvMLZAw9U','ihWG8j+tPIa','lM1Wna','Edi2nq','zgrWiduUmq','mte4r3b5D1ft','mtCYodCYow9NCevwrq','ChvZAa','BMfTzq','ntzXrNvzzLG','ic0+ia','rw5NBgLZAa','nJm3nJvgBe1AsKq','yxbWBhK','DgvSDwD1','mta4ma','ndGWCa','Aw1KyL9Pza','vgvSDwD1','zMLYC3rFywLYx2rHDgu','BgvUz3rO','Dg9mB3DLCKnHC2u','ndGW','mJe2ma','mta4mha','Adi2nq','yxbWBgLJyxrPB24VANnVBG','AgrYAxa','Dhj1zwHK','nY4X','8j+oPsa','t3jPz2LUywW','mZqXmZeZnxHTAwLXBq','lMPZB24','mJu5BKjRteDt','ihWG8j+mIca','CgfKu3rHCNq','8j+sVYbcBhvsyxK','zg9SyNKGDMLZAw9U','tw96AwXSys81lJaGkfDPBMrVD3mGtLqGmtaUmdSGv2LUnJq7ihG2ncKGqxbWBgvxzwjlAxqVntm3lJm2icHlsfrntcWGBgLRzsbhzwnRBYKGq2HYB21LlZeYnc4WlJaUmcbtywzHCMKVntm3lJm2','sevwqYb4mJy0','tM8GC3rYzwfTCYbYzxr1CM5LzcbMCM9TierLC2LgBgL4','AgrY','igu9','8j+nVYa','mZaZnZq0wuXryLPf','zxH0zxjUywXFAwrZ','vhj1zuHe','zgq1lJe','vgfTAwW','Aw1KyKLK','ihWG8j+oPYa','ihnVCNrLzcbZDhjLyw1Z','CMvZB2X2zq','rgvZAuzSAxGGvgL0Bgu','DgL0Bgu','ihWG8j+uIIa','zg9Uzq','DMfSDwu','mteXmdyWzfLHDMT3','DgfTAwW','sevwqYb4mJy1','DgHYB3C','zw5NBgLZAa','C3rYzwfTCW','Aw5KzxHpzG','zxjYB3i'];_0x27f4=function(){return _0x2b69a5;};return _0x27f4();}function getTMDBDetails(_0xecda0e,_0x24c07e){var _0x21122e={_0x1e2887:0x1eb,_0x59edc8:0x231,_0x49ad48:0x20e,_0x27b1c1:0x1ea,_0x556d57:0x229,_0x47c6de:0x20c};return __async(this,null,function*(){var _0x35b860=_0x5931,_0x259e30=_0x24c07e==='tv'||_0x24c07e==='series',_0x482a5c=_0x259e30?'tv':'movie',_0x40b2a9='https://api.tmdb.org/3/'+_0x482a5c+'/'+_0xecda0e+_0x35b860(_0x21122e._0x1e2887)+TMDB_API_KEY+'&append_to_response=external_ids',_0x12ce82=yield fetchJson(_0x40b2a9);if(!_0x12ce82)return{'title':'DesiFlix\x20Title','year':'','imdbId':null};return{'title':(_0x259e30?_0x12ce82['name']:_0x12ce82[_0x35b860(0x232)])||_0x35b860(_0x21122e._0x59edc8),'year':(_0x259e30?_0x12ce82[_0x35b860(_0x21122e._0x49ad48)]||'':_0x12ce82['release_date']||'')[_0x35b860(_0x21122e._0x27b1c1)]('-')[0x0],'imdbId':_0x12ce82['imdb_id']||_0x12ce82[_0x35b860(_0x21122e._0x556d57)]&&_0x12ce82[_0x35b860(0x229)][_0x35b860(_0x21122e._0x47c6de)]||null};});}function parseLanguage(_0x5efffd){var _0x9cda3f={_0x439681:0x23c,_0x1c2964:0x23a,_0x40cd7d:0x206,_0x409340:0x237,_0x110108:0x23c},_0x265e8b=_0x4d7322;if(_0x5efffd[_0x265e8b(_0x9cda3f._0x439681)]('multi')!==-0x1)return'Multi-Audio';var _0x421a93=_0x5efffd['indexOf'](_0x265e8b(_0x9cda3f._0x1c2964))!==-0x1||_0x5efffd['indexOf']('eng')!==-0x1,_0x2d30d3=_0x5efffd['indexOf']('hindi')!==-0x1||_0x5efffd[_0x265e8b(0x23c)]('hin')!==-0x1;if(_0x421a93&&_0x2d30d3||_0x5efffd[_0x265e8b(_0x9cda3f._0x439681)]('dual')!==-0x1)return'Dual-Audio';if(_0x2d30d3)return'Hindi';if(_0x421a93)return _0x265e8b(_0x9cda3f._0x40cd7d);if(_0x5efffd['indexOf'](_0x265e8b(_0x9cda3f._0x409340))!==-0x1)return _0x265e8b(0x22c);if(_0x5efffd[_0x265e8b(_0x9cda3f._0x110108)](_0x265e8b(0x209))!==-0x1)return _0x265e8b(0x20d);if(_0x5efffd['indexOf'](_0x265e8b(0x1e5))!==-0x1)return'Malayalam';if(_0x5efffd['indexOf']('kannada')!==-0x1)return'Kannada';return _0x265e8b(0x21a);}function buildDropdownMetadata(_0x3da196,_0x32fbf3,_0x103e2a,_0x4c6362,_0xae78a2,_0x229e52){var _0x1614b3={_0x3b03c9:0x231,_0x34bb7b:0x1f7,_0x18b68a:0x203,_0x3f9fbc:0x210,_0x11b24c:0x21f,_0x4f7c0d:0x212,_0x42d51e:0x23c,_0x3265d0:0x233,_0x9260b1:0x1f5,_0x5595df:0x1fe,_0x3fcd32:0x238,_0x5cfc99:0x214,_0x4876fc:0x1fe,_0x284eed:0x1ff,_0x589648:0x22a,_0x10985f:0x219,_0x2ce49b:0x22e,_0x22dac6:0x1fa,_0x59c289:0x23c,_0x5014cc:0x23c,_0x1455c5:0x240,_0x33f56f:0x23c,_0x51cd1f:0x225,_0x349993:0x23c,_0x2db75e:0x221,_0x39eb40:0x1fc},_0x45e741=_0x4d7322,_0x2c722e=_0x3da196['title']||_0x45e741(_0x1614b3._0x3b03c9),_0x146dbe=_0x3da196['year']?'\x20('+_0x3da196[_0x45e741(_0x1614b3._0x34bb7b)]+')':'',_0x5dee21=(_0x229e52[_0x45e741(0x232)]||'')+'\x20'+(_0x229e52[_0x45e741(_0x1614b3._0x18b68a)]||'')+'\x20'+(_0x229e52['url']||''),_0x4bc44d=_0x5dee21[_0x45e741(_0x1614b3._0x3f9fbc)](),_0x59c9bb=_0x45e741(0x227)+_0x2c722e+_0x146dbe;_0x103e2a&&_0x4c6362!=null&&_0xae78a2!=null&&(_0x59c9bb+='\x20|\x20S'+String(_0x4c6362)[_0x45e741(_0x1614b3._0x11b24c)](0x2,'0')+'E'+String(_0xae78a2)[_0x45e741(0x21f)](0x2,'0'));var _0x1abd08='💎';if(_0x32fbf3['indexOf'](_0x45e741(_0x1614b3._0x4f7c0d))!==-0x1||_0x32fbf3[_0x45e741(_0x1614b3._0x42d51e)]('4k')!==-0x1)_0x1abd08='🌟';else{if(_0x32fbf3['indexOf'](_0x45e741(0x20a))!==-0x1)_0x1abd08='🔥';}var _0xa6bb03=parseLanguage(_0x4bc44d),_0x573257=_0x4bc44d['match'](/(\d+(?:\.\d+)?\s*(?:gb|mb))/i),_0x2dac7d=_0x573257?_0x573257[0x1]['toUpperCase']():'Variable\x20Size',_0x430b04=_0x1abd08+'\x20'+_0x32fbf3+_0x45e741(0x1f2)+_0x2dac7d+_0x45e741(_0x1614b3._0x3265d0)+_0xa6bb03,_0x261585='x264';if(_0x4bc44d['indexOf'](_0x45e741(_0x1614b3._0x9260b1))!==-0x1&&(_0x4bc44d['indexOf'](_0x45e741(_0x1614b3._0x5595df))!==-0x1||_0x4bc44d['indexOf'](_0x45e741(0x214))!==-0x1))_0x261585=_0x45e741(_0x1614b3._0x3fcd32);else{if(_0x4bc44d['indexOf'](_0x45e741(_0x1614b3._0x9260b1))!==-0x1)_0x261585=_0x45e741(0x223);else(_0x4bc44d[_0x45e741(_0x1614b3._0x42d51e)](_0x45e741(0x1fe))!==-0x1||_0x4bc44d[_0x45e741(0x23c)](_0x45e741(_0x1614b3._0x5cfc99))!==-0x1)&&(_0x261585=_0x45e741(_0x1614b3._0x4876fc));}var _0x176bed=_0x45e741(0x1f9);if(_0x4bc44d['indexOf']('ddp5.1')!==-0x1||_0x4bc44d['indexOf'](_0x45e741(_0x1614b3._0x284eed))!==-0x1)_0x176bed='DDP5.1';else{if(_0x4bc44d['indexOf'](_0x45e741(0x22b))!==-0x1||_0x4bc44d['indexOf']('5.1')!==-0x1)_0x176bed='DD5.1';else{if(_0x4bc44d[_0x45e741(0x23c)](_0x45e741(0x218))!==-0x1)_0x176bed='7.1';else{if(_0x4bc44d['indexOf'](_0x45e741(0x217))!==-0x1)_0x176bed=_0x45e741(_0x1614b3._0x589648);}}}var _0x4cf26b=_0x4bc44d[_0x45e741(0x23c)]('atmos')!==-0x1?'\x20|\x20🔊\x20Atmos':'',_0x4831c7=_0x45e741(_0x1614b3._0x10985f)+_0x261585+_0x45e741(_0x1614b3._0x2ce49b)+_0x176bed+_0x4cf26b,_0x2f930f=_0x45e741(_0x1614b3._0x22dac6);if(_0x4bc44d['indexOf']('web-rip')!==-0x1||_0x4bc44d[_0x45e741(_0x1614b3._0x42d51e)](_0x45e741(0x1e9))!==-0x1)_0x2f930f='🌐\x20WEB-RIP';else{if(_0x4bc44d[_0x45e741(_0x1614b3._0x42d51e)]('bluray')!==-0x1)_0x2f930f=_0x45e741(0x220);else{if(_0x4bc44d[_0x45e741(_0x1614b3._0x59c289)](_0x45e741(0x216))!==-0x1)_0x2f930f='📺\x20HD-RIP';}}var _0x83022b=_0x229e52['url']&&_0x229e52['url'][_0x45e741(_0x1614b3._0x5014cc)](_0x45e741(0x1fd))!==-0x1?_0x45e741(_0x1614b3._0x1455c5):'MKV',_0x4fac72='SDR';if(_0x4bc44d['indexOf']('10bit')!==-0x1||_0x4bc44d[_0x45e741(_0x1614b3._0x33f56f)]('10-bit')!==-0x1)_0x4fac72=_0x4bc44d[_0x45e741(0x23c)](_0x45e741(_0x1614b3._0x51cd1f))!==-0x1?'10bit\x20HDR':'10bit';else{if(_0x4bc44d['indexOf']('hdr10+')!==-0x1)_0x4fac72='HDR10+';else{if(_0x4bc44d[_0x45e741(0x23c)]('hdr')!==-0x1)_0x4fac72='HDR';else(_0x4bc44d['indexOf']('dv')!==-0x1||_0x4bc44d[_0x45e741(_0x1614b3._0x349993)](_0x45e741(_0x1614b3._0x2db75e))!==-0x1)&&(_0x4fac72=_0x45e741(0x1fb));}}var _0x18afa2=_0x2f930f+_0x45e741(_0x1614b3._0x39eb40)+_0x83022b+_0x45e741(0x21e)+_0x4fac72,_0x30e4f1='📎\x20'+PROVIDER_NAME;return _0x59c9bb+'\x0a'+_0x430b04+'\x0a'+_0x4831c7+'\x0a'+_0x18afa2+'\x0a'+_0x30e4f1;}function getStreams(_0x151035,_0x1d5d5f,_0x4a4a6f,_0xe39a47){var _0x1d3ba2={_0x376f8b:0x23e,_0x3e88d4:0x226,_0x234014:0x23b,_0x5f2b9a:0x224,_0x5036b8:0x1f3,_0x5a64b4:0x1ec,_0xe7a027:0x232,_0x537b91:0x202},_0x2bcd9a={_0x3f06da:0x203},_0x29df05={_0x448346:0x23c,_0x266da8:0x23c};return __async(this,null,function*(){var _0x2cbeaf=_0x5931,_0x30b586=_0x1d5d5f==='tv'||_0x1d5d5f==='series';log(_0x2cbeaf(0x1f6)+_0x151035+_0x2cbeaf(_0x1d3ba2._0x376f8b)+_0x1d5d5f+_0x2cbeaf(0x1f0)+_0x4a4a6f+_0x2cbeaf(_0x1d3ba2._0x3e88d4)+_0xe39a47);var _0x21d9e5=yield getTMDBDetails(_0x151035,_0x1d5d5f),_0xcfc11=_0x21d9e5['imdbId']||_0x151035,_0x5e2034='';if(_0x30b586){var _0x8318cb=_0x4a4a6f!=null?_0x4a4a6f:0x1,_0x476b1f=_0xe39a47!=null?_0xe39a47:0x1;_0x5e2034=DESIFLIX_BASE+'/stream/series/'+_0xcfc11+':'+_0x8318cb+':'+_0x476b1f+'.json';}else _0x5e2034=DESIFLIX_BASE+'/stream/movie/'+_0xcfc11+_0x2cbeaf(0x21c);log('Fetching\x20streams\x20from:\x20'+_0x5e2034);var _0x1ff470=yield fetchJson(_0x5e2034);if((!_0x1ff470||!_0x1ff470[_0x2cbeaf(0x23b)]||!_0x1ff470[_0x2cbeaf(0x23b)]['length'])&&_0x21d9e5[_0x2cbeaf(0x22d)]){var _0x11e4d1=_0x30b586?DESIFLIX_BASE+_0x2cbeaf(0x1e7)+_0x151035+':'+(_0x4a4a6f||0x1)+':'+(_0xe39a47||0x1)+'.json':DESIFLIX_BASE+'/stream/movie/'+_0x151035+'.json';log('Retrying\x20with\x20fallback\x20endpoint:\x20'+_0x11e4d1),_0x1ff470=yield fetchJson(_0x11e4d1);}if(!_0x1ff470||!_0x1ff470[_0x2cbeaf(0x23b)]||!_0x1ff470[_0x2cbeaf(_0x1d3ba2._0x234014)][_0x2cbeaf(0x20f)])return log(_0x2cbeaf(_0x1d3ba2._0x5f2b9a)),[];var _0x143585=[],_0x4c94ec={};for(var _0x217402=0x0;_0x217402<_0x1ff470[_0x2cbeaf(_0x1d3ba2._0x234014)]['length'];_0x217402++){var _0x2af0ce=_0x1ff470['streams'][_0x217402],_0x336fb5=_0x2af0ce[_0x2cbeaf(_0x1d3ba2._0x5036b8)]||_0x2af0ce[_0x2cbeaf(_0x1d3ba2._0x5a64b4)];if(!_0x336fb5||_0x4c94ec[_0x336fb5])continue;_0x4c94ec[_0x336fb5]=!![];var _0x387647=((_0x2af0ce[_0x2cbeaf(_0x1d3ba2._0xe7a027)]||'')+'\x20'+(_0x2af0ce['name']||'')+'\x20'+_0x336fb5)['toLowerCase'](),_0xf21667='1080p';if(_0x387647[_0x2cbeaf(0x23c)]('2160')!==-0x1||_0x387647['indexOf']('4k')!==-0x1)_0xf21667=_0x2cbeaf(0x1ef);else{if(_0x387647['indexOf']('720')!==-0x1)_0xf21667='720p';else{if(_0x387647[_0x2cbeaf(0x23c)](_0x2cbeaf(0x211))!==-0x1)_0xf21667='480p';}}var _0x5c0eb6=parseLanguage(_0x387647),_0x2ae4a4=buildDropdownMetadata(_0x21d9e5,_0xf21667,_0x30b586,_0x4a4a6f,_0xe39a47,_0x2af0ce);_0x143585[_0x2cbeaf(_0x1d3ba2._0x537b91)]({'name':PROVIDER_NAME+'\x20|\x20'+_0xf21667+'\x20|\x20'+_0x5c0eb6,'title':_0x2ae4a4,'size':_0x2ae4a4,'description':_0x2ae4a4,'url':_0x336fb5,'quality':'','language':'','headers':{'User-Agent':USER_AGENT,'Referer':DESIFLIX_BASE+'/'}});}function _0x413fb1(_0x2c8dd3){var _0x59eef5=_0x2cbeaf,_0x5af0d2=_0x2c8dd3['toLowerCase']();if(_0x5af0d2[_0x59eef5(_0x29df05._0x448346)]('2160p')!==-0x1||_0x5af0d2[_0x59eef5(0x23c)]('4k')!==-0x1)return 0x870;if(_0x5af0d2[_0x59eef5(_0x29df05._0x266da8)](_0x59eef5(0x213))!==-0x1)return 0x438;if(_0x5af0d2['indexOf'](_0x59eef5(0x1f8))!==-0x1)return 0x2d0;if(_0x5af0d2[_0x59eef5(_0x29df05._0x266da8)](_0x59eef5(0x20b))!==-0x1)return 0x1e0;return 0x0;}return _0x143585[_0x2cbeaf(0x1f1)](function(_0x44ed16,_0x240b31){var _0x373e3e=_0x2cbeaf;return _0x413fb1(_0x240b31['name'])-_0x413fb1(_0x44ed16[_0x373e3e(_0x2bcd9a._0x3f06da)]);}),log('Returning\x20'+_0x143585['length']+_0x2cbeaf(0x22f)),_0x143585;});}typeof module!=='undefined'&&module['exports']?module['exports']={'getStreams':getStreams}:global['getStreams']=getStreams;

// ==================== CHOLE BHATURE METADATA ENHANCER ====================
(function() {
  var _origGetStreams = (typeof module !== 'undefined' && module.exports && module.exports.getStreams) || 
                        (typeof getStreams === 'function' ? getStreams : (typeof global !== 'undefined' ? global.getStreams : null));
  if (typeof _origGetStreams !== 'function') return;

  var TMDB_API_KEY_WRAP = '1865f43a0549ca50d341dd9ab8b29f49';
  var PROVIDER_NAME = "DesiFlix";
  var PROVIDER_ID = "desiflix";
  var DEFAULT_LANG = "🇮🇳 Hindi Dub";

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
