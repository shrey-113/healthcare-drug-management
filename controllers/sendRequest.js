const mysql = require("mysql");
const util = require("util");

const sendRequest = async (drugid, dname, quantity, hospID) => {
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

  rdate = await new Date().toJSON().slice(0, 10);

  const q1 = util.promisify(connection1.query).bind(connection1);
  const q2 = util.promisify(connection2.query).bind(connection2);

  let results = await q1(
    `Select * from Drug_Details where Drug_ID='${drugid}';`
  );

  let price = results[0].Price;

  let rem = 0;

  let results1 = await q2(
    `SELECT * FROM Hospital_Details where Entry_ID = '${drugid}';`
  );

  rem = results1[0].Qtn_in_hand;

  let cost = price * quantity;

  await q1(
    `Insert into requests values ('${drugid}', '${dname}', ${price}, ${quantity}, ${cost},'${rdate}', ${rem}, '${hospID}');`
  );

  connection1.end((err) => {
    if (err) throw err;
    console.log("Disconnected from the database!");
  });
  connection2.end((err) => {
    if (err) throw err;
    console.log("Disconnected from the database!");
  });
};

module.exports = sendRequest;
