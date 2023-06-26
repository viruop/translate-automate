const csv = require("csv-parser");
const fs = require("fs");

const langs = {
  0: {},
  1: {},
  2: {},
  3: {},
};

fs.createReadStream("o.csv")
  .pipe(csv())
  .on("data", (data) => {
    console.log("data", data);
    let _values = Object.values(data);
    _values.forEach((d, i) => {
      console.log(i, _values[0], d);
      let _temp = {};
      langs[i][_values[0]] = d;
    });
  })
  .on("end", () => {
    // console.log(langs);
    fs.writeFileSync("./languages.json", JSON.stringify(langs));
  });
