import { config } from "../patinoConfig.mjs";
import cheerio from 'cheerio';
import axios from 'axios';



export const imgSearch = async (args, imgDesc) => {
  let url = "https://results.dogpile.com/serp?qc=images&q=dua+lipa"
  let links = await extractLinks(url);
  //console.log(links)

}

const extractLinks = async (url) => {

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    },
  });

  try {
    const $ = cheerio.load(data);
    const links = Array.from($('a')).map((a) => {
        return $(a).attr('href')
    });
    console.log(links);

    // do something else here with these links, such as writing to a file or saving them to your database
  } catch (error) {
    console.log(error.response.body);
  }
};

