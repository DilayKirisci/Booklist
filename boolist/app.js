//Node packages
const express = require("express");

const bodyParser = require("body-parser");
const request = require("request");
const { application } = require("express");
const port = 3000;

const app = express();
app.use(express.static(__dirname)); // send everything to the client side
app.use(bodyParser.urlencoded({ extended: true }));

// send the file
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const data = firstName + "-" + lastName + "-" + email;
	res.sendFile(__dirname + "/success.html");
});

app.listen(port, function () {
	console.log(`port: ${port}`);
});
