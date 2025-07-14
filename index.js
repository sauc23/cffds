const http = require('http');
const https = require('https');
const { URL } = require('url');

const PROXY_CONFIG = {
  "ufc-313": "https://ftryr4e535tyujhgfdsx.global.ssl.fastly.net/v4/9a/3v6aia/",
  "ufc-314": "https://ftryr4e535tyujhgfdsx.global.ssl.fastly.net/v4/db/n8y855/",
  "ufc-316": "https://ftryr4e535tyujhgfdsx.global.ssl.fastly.net/v4/ek/tarrn3/",
  "wwe-nxt-new-years-evil-2025": "https://s6sy.sewwhitema.sbs/v4/js/un5ti1/",
  "wwe-royal-rumble-2025": "https://ftryr4e535tyujhgfdsx.global.ssl.fastly.net/v4/xy/3axbnz/",
  "wwe-night-of-champions-2025": "https://sunl.restationaggregate.cyou/v4/gee/ojv5gq/",
  "aew-dynasty-2025": "https://sr81.pouloszcleed.sbs/v4/61/hlc93j/",
  "aew-all-in-2025": "https://ftryr4e535tyujhgfdsx.global.ssl.fastly.net/v4/vz1/pucoym/",
  "ucl-final-2025": "https://smeb.yevettesha.sbs/v4/vz1/n8l9yq/",
  "2025-nba-finals-game-1": "https://snc9.sewwhitema.sbs/v4/6hp/jc9uyr/",
  "2025-nba-finals-game-2": "https://sqtd.catherinakatha.sbs/v4/mf/ureswn/",
  "2025-nba-finals-game-3": "https://sdqm.cedekkerohartf.sbs/v4/6hp/vzj8se/",
  "2025-nba-finals-game-4": "https://snc9.yevettesh.sbs/v4/xy/x6aw9i/",
  "2025-nba-finals-game-5": "https://sqtd.gomesscheerer.sbs/v4/5c/8tuofv/",
  "2025-nba-finals-game-6": "https://s6sy.mcgaugheyjyiy.sbs/v4/5c/pkmgqd/",
  "2025-nba-finals-game-7": "https://sbi6.vivianorovc.sbs/v4/vz1/isy9py/",
  "evw18": "https://sxic.swobodafocht.sbs/v4/xy/gezbw3/",
  "ufc-317": "https://snc9.catherinakatha.sbs/v4/gee/jcuc5g/",
  "paul-vs-chavezjr": "https://sipt.sipeskrlbtru.sbs/v4/pp/luik6o/",
  "wilder-vs-herndon": "https://s8v3.squiressill.sbs/v4/9a/pk69zz/",
  "f1-2025-australia-gp": "https://sskt.activaterevolution.online/v4/6hp/3vny3q/",
  "f1-2025-china-gp": "https://snc9.guardconnect.shop/v4/bgm/hlmnkd/",
  "f1-2025-japan-gp": "https://sj3l.momentumresponse.sbs/v4/gee/pk6qui/",
  "f1-2025-bahrain-gp": "http://s8v3.koontzhittpittman.sbs/v4/gee/jcuz85/",
  "f1-2025-saudi-arabia-gp": "http://spok.feistjmyrodne.sbs/v4/xy/pk6qk6/",
  "f1-2025-miami-gp": "https://sxix.paxtoncloudou.sbs/v4/pp/q3o15b/",
  "f1-2025-imola-gp": "https://sqtd.disalvozunigam.sbs/v4/pp/pk6qoz/",
  "f1-2025-monaco-gp": "https://slob.performanceactivation.shop/v4/pp/vz8gfd/",
  "f1-2025-spain-gp": "https://sqtd.forecastinggalactic.shop/v4/mf/mi1ke1/",
  "f1-2025-canada-gp": "https://s8v3.encryptiontransmit.cyou/v4/vz1/6hyurg/",
  "f1-2025-austria-gp": "https://s8v3.boehmerrbfjx.sbs/v4/bgm/5wqzoy/",
  "f1-2025-britan-gp": "https://snc9.cryptologydashboard.sbs/v4/6hp/dqcoje/",
  "back-to-the-beginning-2025": "https://ftryr4e535tyujhgfdsx.global.ssl.fastly.net/v4/8q/qtzz5o/",
  "zlthlchlwlmuqimu4isp": "https://spok.visualizeencryption.sbs/v4/6hp/xildkx/",
};

http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = reqUrl.pathname;

  // Find matching key
  const key = Object.keys(PROXY_CONFIG).find(k => pathname.startsWith(`/${k}/`));
  if (!key) {
    res.writeHead(404, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
    return res.end('Not found');
  }

  const baseUrl = PROXY_CONFIG[key];
  let proxyPath = pathname.replace(`/${key}/`, '');

  if (proxyPath === 'video.m3u8') {
    proxyPath = 'cf-master.txt';
  }

  const targetUrl = new URL(proxyPath, baseUrl);
  const isHttps = targetUrl.protocol === 'https:';
  const lib = isHttps ? https : http;

  const options = {
    method: req.method,
    headers: {
      ...req.headers,
      'Host': targetUrl.host,
      'Origin': 'https://timstreams.upn.one',
      'Referer': 'https://timstreams.upn.one/',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Priority': 'u=1, i',
      'Sec-Ch-Ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Chrome OS"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    }
  };

  const proxyReq = lib.request(targetUrl, options, proxyRes => {
    res.writeHead(proxyRes.statusCode, {
      ...proxyRes.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': '86400',
    });
    proxyRes.pipe(res);
  });

  proxyReq.on('error', err => {
    res.writeHead(500, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
    res.end('Error: ' + err.message);
  });

  req.pipe(proxyReq);
}).listen(8080, () => {
  console.log('Proxy server running at http://localhost:8080');
});
