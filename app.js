const path = require("path");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const ejs = require("ejs");

app.use(express.static(__dirname + "/views/"));
app.use(express.static(__dirname + "/E-hospital/"));
app.set("view engine", "ejs");
app.set("views", "views");

const fetchData = require("./controllers/fetchData");
const updateData = require("./controllers/UpdateData");
const deductData = require("./controllers/Deduct");
const sendRequest = require("./controllers/sendRequest");

// var { detArr1, detArr2 } = fetchData();
// console.log(detArr1, detArr2);
var lastUpdated = new Date();

app.post("/eaushadhi/showdata/update", async (req, res) => {
  var { detArr1, detArr2 } = await fetchData();
  var lastUpdated = await new Date();
  res.redirect("/eaushadhi/showdata");
});

app.post("/ehospital/deduct/update", async (req, res) => {
  let drugid = req.body.drugId;
  let quantity = req.body.quantity;
  await deductData(drugid, quantity);
  res.redirect("/ehospital");
});

app.post("/ehospital/sendrequest/send", async (req, res) => {
  let drugid = req.body.drugId;
  let dname = req.body.name;
  let quantity = req.body.quantity;
  let hospID = req.body.hospitalID;
  await sendRequest(drugid, dname, quantity, hospID);
  res.redirect("/ehospital");
});

app.post("/eaushadhi/update_data/update", async (req, res) => {
  let drugid = req.body.drugId;
  let dname = req.body.name;
  let quantity = req.body.quantity;
  let hospID = req.body.hospitalID;
  await updateData(drugid, dname, quantity, price, hospID);
  res.redirect("/eaushadhi");
});

app.get("/ehospital/sendrequest", (req, res) => {
  res.render("E-hospital/send_request");
});

app.get("/ehospital/deduct", (req, res) => {
  res.render("E-hospital/deduct");
});

app.get("/ehospital/showdata", async (req, res) => {
  const { detArr1, detArr2 } = await fetchData();
  var lastUpdated = await new Date();

  res.render("E-hospital/show_data", {
    data: detArr1,
    data2: detArr2,
    dnt: lastUpdated,
  });
});

app.get("/eaushadhi/update_data", (req, res) => {
  res.render("E-aushadhi/update_data");
});

app.get("/eaushadhi/showdata", async (req, res) => {
  const { detArr1, detArr2 } = await fetchData();
  var lastUpdated = await new Date();

  res.render("E-aushadhi/show_data", {
    data: detArr1,
    data2: detArr2,
    dnt: lastUpdated,
  });
});

app.get("/eaushadhi", (req, res) => {
  res.render("E-aushadhi/e_aushadhi");
});

app.get("/ehospital", (req, res) => {
  res.render("E-hospital/e_hospital");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});
