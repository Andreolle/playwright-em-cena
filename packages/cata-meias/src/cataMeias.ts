import { chromium } from 'playwright';

export async function cataMeias() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
  });
  const page = await context.newPage();

  await page.goto('https://www.cea.com.br/al-search/meia%20infantil%20menino?_gl=1*1uz259i*_up*MQ..*_gs*MQ..&gclid=Cj0KCQjw7dm-BhCoARIsALFk4v-cNAqHKh00tuEu7uwDfZ2QTEvgTqJFLxhF7_wFnCTRWH58CN5dDzUaApbtEALw_wcB');

  const selector = '[class*="ais-Hits-item"] > article';
  await page.waitForSelector(selector);
  const elements = await page.$$(selector);
  const items = []
  
  for (const element of elements) {
    const item = {
      text: '',
      images: []
    }

    item.text = await element.innerText();

    // Seleciona todas as imagens dentro do elemento atual
    const images = await element.$$('img');

    // Itera sobre as imagens e obtém o atributo src de cada uma
    for (const image of images) {
      const src = await image.getAttribute('src');
      if (src) {
        item.images.push(src)
      }
    }

    items.push(item)
  }

  await browser.close();

  return items
}
