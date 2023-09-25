const mysql = require("mysql");
const util = require("util");

const fetchDrugDetails = async () => {
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

  let drugDet = [];

  const q1 = util.promisify(connection1.query).bind(connection1);

  let results = await q1("SELECT * FROM Drug_Details;");

  results.forEach((record) => {
    // Insert data into the row cells
    var detail = {
      name: record.Name,
      Drug_ID: record.Drug_ID,
      Price: record.Price,
    };

    drugDet.push(detail);
  });

  connection1.end((err) => {
    if (err) throw err;
    console.log("Disconnected from the database!");
  });

  // console.log(detArr1, detArr2);
  return drugDet;
};

module.exports = fetchDrugDetails;
