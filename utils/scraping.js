import puppeteer from "puppeteer"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const escrapingUtils = async (pais, browser) => {
  const pathCaptura = path.join(__dirname, '../capturas', pais)
  const page = await browser.newPage();
  try {
    if (!fs.existsSync(pathCaptura)) {
      fs.mkdirSync(pathCaptura, { recursive: true }) // importante recursive si hay subcarpetas
    }
    await page.setViewport({ width: 375, height: 520 })
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    await page.goto(`https://www.avianca.com/es/?poscode=${pais}`, { waitUntil: ['domcontentloaded', 'networkidle2'], timeout: 60000})

    // Aceptar cookies si aparece el popup
    try {
      await page.waitForSelector('#onetrust-accept-btn-handler', { timeout: 5000 });
      await page.click('#onetrust-accept-btn-handler');
      await page.waitForTimeout(1000); // Esperar a que se cierre el popup
    } catch (err) {
      console.log('No apareció el popup de cookies o ya fue aceptado.');
    }
   
   
   
    const selector = '.grid.main-banner--section-offer.main-banner--section--has-logo'
    await page.waitForSelector(selector)

    const clip = await page.$eval(selector, el => {
      const { top, left, width, height } = el.getBoundingClientRect()
      return {
        x: left,
        y: top,
        width: width,
        height: document.body.scrollHeight - top
      }
    })

    const screenshotPath = path.join(pathCaptura, 'captura.png')

    await page.screenshot({
      path: screenshotPath,
      clip: clip,
      fullPage: false
    })
    console.log(`Captura guardada en: ${screenshotPath}`)
  } catch (error) {
    console.error("Error al capturar:", error)
  }
}

const escraping = async () => {
  const paises = ["AR", "BO", "BR", "CA", "CL", "CO", "CR", "EC", "SV", "EU", "US", "GT", "HN", "MX", "NI", "OTHER", "PA", "PY", "PE", "UK", "DO", "UY"];
  const browser = await puppeteer.launch({ headless: true });

  for (const pais of paises) {
    await escrapingUtils(pais, browser);
  }

  await browser.close();
};
escraping()
