import { config } from "../config.mjs";
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export const imgSearch = async (args, imgDesc) => {
  
  let url = `https://results.dogpile.com/serp?qc=images&q=${imgDesc}`;

  let links = await extractLinks(url);
  args.channel.send(links[Math.floor(Math.random() * links.length)]);

}

async function extractLinks (url){

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const links = await page.evaluate(()=>{
    return Array.from(document.querySelectorAll('.image img')).map(el=>el.src)
  })
  
  return links;

};



