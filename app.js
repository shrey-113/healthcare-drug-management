const path = require("path");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const ejs = require("ejs");

app.use(express.static(__dirname + "/views/"));
app.use(express.static(__dirname + "/E-hospital/"));
app.set("view engine", "ejs");
app.set("views", "views");

const fetchData = require("./controllers/fetchData");
const updateData = require("./controllers/UpdateData");
const deductData = require("./controllers/Deduct");
const sendRequest = require("./controllers/sendRequest");
const fetchRequests = require("./controllers/fetchRequests");
const approveRequest = require("./controllers/approveRequest");
const aggregate = require("./controllers/aggregate");
const fetchDrugDetails = require("./controllers/fetchDrugDetails");

var lastUpdated = new Date();

app.get("/test", (req, res) => {
  console.log("Hit!");
  res.send("Helloo!");
});

app.post("/test", (req, res) => {
  console.log("Hit!!");
  console.log(req.body);
});

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

app.post("/eaushadhi/requests/approve", async (req, res) => {
  let drugid = req.body.drugid;
  let dname = req.body.drugname;
  let price = req.body.price;
  let quantity = req.body.quantity;
  let cost = req.body.cost;
  let rdate = req.body.rdate;
  let rem = req.body.rem;
  let hospid = req.body.hospid;
  await approveRequest(
    drugid,
    dname,
    price,
    quantity,
    cost,
    rdate,
    rem,
    hospid
  );

  res.redirect("/eaushadhi/requests");
});

app.post("/ehospital/sendrequest/send", async (req, res) => {
  let drugid = req.body.drugId;
  let quantity = req.body.quantity;
  let hospID = req.body.hospitalID;
  console.log(drugid, quantity, hospID);
  await sendRequest(drugid, quantity, hospID);
  console.log("REDIRECT??");
  res.redirect("/ehospital");
});

app.get("/ehospital/sendrequest", async (req, res) => {
  drugDet = await fetchDrugDetails();
  res.render("E-hospital/send_request", drugDet);
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

app.get("/eaushadhi/requests", async (req, res) => {
  const dataArr = await fetchRequests();
  var lastUpdated = await new Date();

  res.render("E-aushadhi/show_requests", {
    data: dataArr,
    dnt: lastUpdated,
  });
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

app.get("/admin", async (req, res) => {
  const { detArr1, detArr2 } = await fetchData();
  var lastUpdated = await new Date();
  const { hosp1SUM, hosp2SUM, totSUM } = await aggregate();
  res.render("admin/admin", {
    data: detArr1,
    data2: detArr2,
    totSUM,
    hosp1SUM,
    hosp2SUM,
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
