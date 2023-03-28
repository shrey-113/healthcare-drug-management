const mysql = require("mysql");
const util = require("util");

const fetchRequests = async () => {
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

  let detArr1 = [];

  const q1 = util.promisify(connection1.query).bind(connection1);

  let results = await q1("SELECT * FROM requests;");

  results.forEach((record) => {
    // Insert data into the row cells
    var detail = {
      name: record.Unique_ID,
      Drug_ID: record.Drug_ID,
      Price: record.Rate_per_unit,
      Quantity: record.Quantity,
      RDate: record.Receipt_Dt,
      cost: record.Receipt_Cost,
      Remaining: record.Remaining,
      hospid: record.Institute_ID,
    };

    detArr1.push(detail);
  });

  connection1.end((err) => {
    if (err) throw err;
    console.log("Disconnected from the database!");
  });

  // console.log(detArr1, detArr2);
  return detArr1;
};

module.exports = fetchRequests;
