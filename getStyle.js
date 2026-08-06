const { execSync } = require('child_process');
try {
  execSync('npm install puppeteer', { stdio: 'inherit' });
  const puppeteer = require('puppeteer');
  
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.hracuity.com/', { waitUntil: 'networkidle2' });
    
    const styles = await page.evaluate(() => {
      const computedStyle = window.getComputedStyle(document.body);
      const elements = document.querySelectorAll('h1, h2, a, button, .btn, header');
      const colors = new Set();
      const bgColors = new Set();
      const fonts = new Set();
      
      fonts.add(computedStyle.fontFamily);
      colors.add(computedStyle.color);
      bgColors.add(computedStyle.backgroundColor);
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        fonts.add(style.fontFamily);
        colors.add(style.color);
        bgColors.add(style.backgroundColor);
      });
      
      return {
        bodyFont: computedStyle.fontFamily,
        allFonts: Array.from(fonts),
        textColors: Array.from(colors),
        bgColors: Array.from(bgColors)
      };
    });
    
    console.log(JSON.stringify(styles, null, 2));
    await browser.close();
  })();
} catch (e) {
  console.error(e);
}
