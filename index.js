const fs = require("fs");
const csv = require("csv-parser");
const translate = require("google-translate-api-x");
const langs = {
  0: {},
  1: {},
  2: {},
  3: {},
};

async function translateText(text) {
  try {
    const res = await translate(text, { from: "en", to: "hi" });
    console.log(res.text);
    return res.text;
  } catch (error) {
    console.error(`Translation error: ${error}`);
    return text;
  }
}

fs.createReadStream("l.csv")
  .pipe(csv())
  .on("data", async (row) => {
    const translatedText = await translateText(row.key);

    row.translatedText = translatedText;

    fs.appendFileSync("./o.csv", `${Object.values(row).join(",")}\n`);
    console.log(row);
    // let _values = Object.values(row);
    // _values.forEach((d, i) => {
    //   if (i > 0) {
    //     console.log(i - 1, _values[0], d);
    //     langs[i - 1][_values[0]] = d;
    //   }
    // });
  })
  .on("end", () => {
    console.log(`Translation complete. The translated CSV file is stored.`);
    // console.log(langs);
    // fs.writeFileSync("./languages.json", JSON.stringify(langs));
  });
