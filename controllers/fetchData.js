const mysql = require("mysql");
const util = require("util");

const fetchData = async () => {
  const connection1 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shreyansh",
    database: "E_AUSHADHI",
  });

  const connection2 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shreyansh",
    database: "E_HOSP",
  });

  // Connect to the database
  connection1.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
  });
  connection2.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
  });

  let detArr1 = [];
  let detArr2 = [];

  const q1 = util.promisify(connection1.query).bind(connection1);
  const q2 = util.promisify(connection2.query).bind(connection2);

  let results = await q1("SELECT * FROM Aushadhi_Details;");

  results.forEach((record) => {
    // Insert data into the row cells
    var detail = {
      name: record.Unique_ID,
      Drug_ID: record.Drug_ID,
      Price: record.Rate_per_unit,
      Quantity: record.Quantity,
      rcost: record.Receipt_Cost,
      RDate: record.Receipt_Dt,
      Remaining: record.Remaining,
      hospid: record.Institute_ID,
    };

    detArr1.push(detail);
  });

  results = await q2("SELECT * FROM Hospital_Details ORDER BY Hospital_ID;");

  results.forEach((record) => {
    // Insert data into the row cells
    var detail = {
      name: record.Entry_ID,
      Drug_ID: record.Item_ID,
      Price: record.Pur_Price,
      Quantity: record.Qtn_in_hand,
      hospid: record.Hospital_ID,
    };

    detArr2.push(detail);
  });

  connection1.end((err) => {
    if (err) throw err;
    console.log("Disconnected from the database!");
  });
  connection2.end((err) => {
    if (err) throw err;
    console.log("Disconnected from the database!");
  });
  // console.log(detArr1, detArr2);
  return { detArr1, detArr2 };
};

module.exports = fetchData;
