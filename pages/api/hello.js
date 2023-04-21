// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const scrape = require("./scrape.json");

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

async function scrapeData({url, identifier}) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const aList = $(identifier);
    const arr = [];
    aList.each((_i, el) => {
      const title = $(el).text();
      const link = $(el).attr("href");
      if (title && title !== "" && isValidUrl(link)) {
        arr.push({ title, link });
      }
    });
    fs.writeFile("pages/api/scrape.json", JSON.stringify(arr, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });
    return arr;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export default async function handler(req, res) {
  let data;
  if (req.method === "GET") {
    data = scrape;
  } else if (req.method === "POST") {
    data = await scrapeData(req.body);
  }
  res.status(200).json({ data });
}
