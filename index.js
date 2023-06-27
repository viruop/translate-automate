const fs = require("fs");
const csv = require("csv-parser");
const translate = require("google-translate-api-x");
const langs = {
  0: {},
  1: {},
  2: {},
  3: {},
};

async function translateText(text, toLang) {
  try {
    const res = await translate(text, { from: "en", to: toLang });
    return res.text;
  } catch (error) {
    console.error(`Translation error: ${error}`);
    return text;
  }
}

fs.createReadStream("l.csv")
  .pipe(csv())
  .on("data", async (row) => {
    const translatedTextHi = await translateText(row.key, "hi");
    const translatedTextMr = await translateText(row.key, "mr");
    const translatedTextGu = await translateText(row.key, "gu");

    row._1 = translatedTextHi;
    row._2 = translatedTextMr;
    row._3 = translatedTextGu;

    fs.appendFileSync("./o.csv", `${Object.values(row).join(",")}\n`);
    // const translatedText = await translateText(row.key);
    // row._1 = translatedText;
    // fs.appendFileSync("./o.csv", `${Object.values(row).join(",")}\n`);

    let _values = Object.values(row);
    _values.forEach(async (d, i) => {
      langs[i][_values[0]] = d;
    });
    fs.writeFileSync("./languages.json", JSON.stringify(langs));
  })
  .on("end", () => {
    console.log(`Translation complete. The translated CSV file is stored.`);
  });
