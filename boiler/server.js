// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

const express = require("express");
const app = express();
const staticRoute = process.env.STATIC_DIR || "client/";
const { resolve } = require("path");
const bodyParser = require("body-parser");
const emailservice = require("@afriddev/emailservice/core/index");
const EmailValidator = require("email-deep-validator");

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json()); // Parse JSON data from the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticRoute));

app.get("/", (req, res) => {
	const path = resolve(staticRoute + "pages/index.html");
	res.sendFile(path);
});

app.post("/send", async (req, res) => {
	let toEmail = req.body.email;
	const emailValidator = new EmailValidator();
	const { wellFormed, validDomain } = await emailValidator.verify(toEmail);

	if (wellFormed && validDomain) {
		const text =
			"Hey there, \n\nThis is a notification form the nodejs app boiler plate \n\nNode App";
		const response = await emailservice({
			toEmail: toEmail,
			title: "Node app (Boiler Plate)",
			subject: "Email notification",
			body: text,
		});

		res.send({
			response: response,
			wellFormed: wellFormed,
			validDomain: validDomain,
			ok: true,
		});
		return;
	}
	res.send({
		response: `${toEmail} is not a valid email`,
		wellFormed: wellFormed,
		validDomain: validDomain,
		ok: false,
	});
});

app.listen(PORT, () =>
	console.log(`Node server listening at http://localhost:${PORT}`)
);
