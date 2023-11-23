import fs from "fs";
import csv from "csv-parser";
import translate from "google-translate-api-x";
import path from "path";

interface Langs {
  [key: number]: {
    [key: string]: string;
  };
}

const langs: Langs = {
  0: {},
  1: {},
  2: {},
  3: {},
  4: {},
};
const filePath = path.join(__dirname, "./input.csv");

async function translateText(text: string, toLang: string) {
  try {
    const res = await translate(text, { from: "en", to: toLang });
    return res.text;
  } catch (error) {
    console.error(`Translation error: ${error}`);
    return text;
  }
}

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", async (row) => {
    if (!row.key) {
      return;
    }
    const translatedTextHi = await translateText(row.key, "hi");
    const translatedTextMr = await translateText(row.key, "mr");
    const translatedTextGu = await translateText(row.key, "gu");
    const translatedTextTa = await translateText(row.key, "ta");

    row._1 = translatedTextHi;
    row._2 = translatedTextMr;
    row._3 = translatedTextGu;
    row._4 = translatedTextTa;
    fs.appendFileSync("./src/output.csv", `${Object.values(row).join(",")}\n`);

    let _values: string[] = Object.values(row);
    _values.forEach(async (d: string, i: number) => {
      langs[i][_values[0]] = d;
    });
    fs.writeFileSync("./src/languages.json", JSON.stringify(langs));
  })
  .on("end", () => {
    console.log(
      `Translation complete. The translated CSV and JSON file is stored.`
    );
  });
