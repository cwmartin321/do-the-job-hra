const https = require('https');

https.get('https://www.hracuity.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const cssLinks = [...data.matchAll(/href="([^"]+\.css[^"]*)"/g)].map(m => m[1]);
    console.log('Found CSS Links:', cssLinks);
    
    const hexColors = new Set([...data.matchAll(/#[0-9a-fA-F]{3,6}/g)].map(m => m[0].toUpperCase()));
    console.log('Hex Colors in HTML:', Array.from(hexColors));
    
    const fonts = new Set([...data.matchAll(/font-family:\s*([^;}]+)/g)].map(m => m[1].replace(/['"]/g, '').trim()));
    console.log('Fonts in HTML:', Array.from(fonts));
    
    const getCss = (url) => {
      https.get(url, (cRes) => {
        let cData = '';
        cRes.on('data', (chunk) => { cData += chunk; });
        cRes.on('end', () => {
          const cssHexColors = new Set([...cData.matchAll(/#[0-9a-fA-F]{3,6}/g)].map(m => m[0].toUpperCase()));
          console.log('Hex Colors in ' + url + ':', Array.from(cssHexColors).slice(0, 15));
          const cssFonts = new Set([...cData.matchAll(/font-family:\s*([^;}]+)/g)].map(m => m[1].replace(/['"]/g, '').trim()));
          console.log('Fonts in ' + url + ':', Array.from(cssFonts));
        });
      });
    };
    
    for (const link of cssLinks.slice(0, 3)) {
      const cssUrl = link.startsWith('http') ? link : new URL(link, 'https://www.hracuity.com/').href;
      getCss(cssUrl);
    }
  });
});
