const mysql = require("mysql");
const util = require("util");
const updateData = require("./UpdateData");

const approveRequest = async (
  drugid,
  dname,
  price,
  quantity,
  cost,
  rdate,
  rem,
  hospID
) => {
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

  await q1(`delete from requests where Drug_ID='${drugid}';`);

  connection1.end((err) => {
    if (err) throw err;
    console.log("Disconnected from the database!");
  });

  await updateData(drugid, dname, quantity, cost, rdate, price, hospID);
};

module.exports = approveRequest;
