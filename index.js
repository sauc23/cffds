const http = require('http');
const https = require('https');
const { URL } = require('url');

const BASE_DOMAIN = "https://ftryr4e535tyujhgfdsx.global.ssl.fastly.net";

const PROXY_CONFIG = {
  "ufc-313": "/v4/9a/3v6aia/",
  "ufc-314": "/v4/db/n8y855/",
  "ufc-316": "/v4/ek/tarrn3/",
  "ufc-317": "/v4/gee/jcuc5g/",
  "ufc-318": "/v4/xq/6snqfn/",
  "wwe-nxt-new-years-evil-2025": "/v4/js/un5ti1/",
  "wwe-royal-rumble-2025": "/v4/xy/3axbnz/",
  "wwe-night-of-champions-2025": "/v4/gee/ojv5gq/",
  "aew-dynasty-2025": "/v4/61/hlc93j/",
  "aew-all-in-2025": "/v4/vz1/pucoym/",
  "ucl-final-2025": "/v4/vz1/n8l9yq/",
  "2025-nba-finals-game-1": "/v4/6hp/jc9uyr/",
  "2025-nba-finals-game-2": "/v4/mf/ureswn/",
  "2025-nba-finals-game-3": "/v4/6hp/vzj8se/",
  "2025-nba-finals-game-4": "/v4/xy/x6aw9i/",
  "2025-nba-finals-game-5": "/v4/5c/8tuofv/",
  "2025-nba-finals-game-6": "/v4/5c/pkmgqd/",
  "2025-nba-finals-game-7": "/v4/vz1/isy9py/",
  "ring-iii": "/v4/8q/puccd9/",
  "usyk-vs-dubois-ii": "/v4/rw/6snqub/",
  "pacquiao-vs-barrios": "/v4/ho/85xgw8/",
  "evw18": "/v4/xy/gezbw3/",
  "paul-vs-chavezjr": "/v4/pp/luik6o/",
  "wilder-vs-herndon": "/v4/9a/pk69zz/",
  "f1-2025-australia-gp": "/v4/6hp/3vny3q/",
  "f1-2025-china-gp": "/v4/bgm/hlmnkd/",
  "f1-2025-japan-gp": "/v4/gee/pk6qui/",
  "f1-2025-bahrain-gp": "/v4/gee/jcuz85/",
  "back-to-the-beginning-2025": "/v4/8q/qtzz5o/",
  "zlthlchlwlmuqimu4isp": "/v4/6hp/xildkx/"
};

http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = reqUrl.pathname;

  const key = Object.keys(PROXY_CONFIG).find(k => pathname.startsWith(`/${k}/`));
  if (!key) {
    res.writeHead(404, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
    return res.end('Not found');
  }

  let proxyPath = pathname.replace(`/${key}/`, '');
  if (proxyPath === 'video.m3u8') {
    proxyPath = 'cf-master.txt';
  }

  const targetUrl = new URL(PROXY_CONFIG[key] + proxyPath, BASE_DOMAIN);
  const lib = https;

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
