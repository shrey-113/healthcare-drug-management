const mysql = require("mysql");
const util = require("util");

const updateData = async (drugid, dname, quantity, price, hospID) => {
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
  console.log(rdate);

  const q1 = util.promisify(connection1.query).bind(connection1);
  const q2 = util.promisify(connection2.query).bind(connection2);

  await q2(
    `Update Hospital_Details Set Qtn_in_hand = Qtn_in_hand + ${quantity} where Entry_ID = '${drugid}';`
  );

  let rem = 0;

  let results = await q2(
    `SELECT * FROM Hospital_Details where Entry_ID = '${drugid}';`
  );

  rem = results[0].Qtn_in_hand;
  console.log(results, rem);

  await q1(
    `Insert into Aushadhi_Details values ('${drugid}', '${dname}', NULL, NULL, ${quantity}, '${rdate}', NULL, NULL, NULL, '${price}', NULL, NULL, NULL, NULL, '${hospID}', NULL, NULL, NULL, NULL, ${rem});`
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

module.exports = updateData;
