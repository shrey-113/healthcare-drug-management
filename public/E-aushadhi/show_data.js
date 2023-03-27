const mysql = require("mysql");

// Create a connection to the MySQL database
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

// // Fetch data from the "E Aushadhi" table and populate the table in the HTML code
// const eaushadhiTable = document.querySelector('#eaushadhi-table tbody');

// connection.query('SELECT * FROM Aushadhi_Details;', (error, results) => {
//   if (error) throw error;

//   // Loop through the data and create a new row for each record
//   results.forEach((record) => {
//     const row = eaushadhiTable.insertRow();

//     // Insert data into the row cells
//     const idCell = row.insertCell();
//     idCell.innerHTML = record.Unique_id;

//     const nameCell = row.insertCell();
//     nameCell.innerHTML = record.Drug_ID;

//     const priceCell = row.insertCell();
//     priceCell.innerHTML = record.Rate_per_Unit;
//   });
// });

connection1.query("SELECT * FROM Aushadhi_Details;", (error, results) => {
  if (error) throw error;

  // Loop through the data and create a new row for each record
  results.forEach((record) => {
    console.log(record.Unique_ID);
  });
});

// // Fetch data from the "E Hospital" table and populate the table in the HTML code
// const ehospitalTable = document.querySelector('#ehospital-table tbody');

// connection.query('SELECT * FROM ehospital', (error, results) => {
//   if (error) throw error;

//   // Loop through the data and create a new row for each record
//   results.forEach((record) => {
//     const row = ehospitalTable.insertRow();

//     // Insert data into the row cells
//     const idCell = row.insertCell();
//     idCell.innerHTML = record.id;

//     const patientNameCell = row.insertCell();
//     patientNameCell.innerHTML = record.patient_name;

//     const doctorNameCell = row.insertCell();
//     doctorNameCell.innerHTML = record.doctor_name;

//     const dateCell = row.insertCell();
//     dateCell.innerHTML = record.date;
//   });
// });

// Close the database connection when finished
connection1.end((err) => {
  if (err) throw err;
  console.log("Disconnected from the database!");
});
connection2.end((err) => {
  if (err) throw err;
  console.log("Disconnected from the database!");
});
