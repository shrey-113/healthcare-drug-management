const mysql = require("mysql");
const util = require("util");

const aggregate = async () => {
  const connection1 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shreyansh",
    database: "E_AUSHADHI",
  });

  // Connect to the database
  connection1.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
  });

  const q1 = util.promisify(connection1.query).bind(connection1);

  let results = await q1(
    "Select SUM(Receipt_Cost) AS Cost from Aushadhi_Details WHERE Institute_ID=002897;"
  );

  let hosp1SUM = results[0].Cost;
  console.log(hosp1SUM);

  results = await q1(
    "Select SUM(Receipt_Cost) AS Cost from Aushadhi_Details WHERE Institute_ID=528457;"
  );

  let hosp2SUM = results[0].Cost;
  console.log(hosp2SUM);

  results = await q1("Select SUM(Receipt_Cost) AS Cost from Aushadhi_Details;");

  let totSUM = results[0].Cost;
  console.log(totSUM);

  connection1.end((err) => {
    if (err) throw err;
    console.log("Disconnected from the database!");
  });

  return { hosp1SUM, hosp2SUM, totSUM };
};

module.exports = aggregate;
