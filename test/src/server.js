const express = require("express");
const app = express();
const { resolve } = require("path");

// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 8080;

app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
	const path = resolve(process.env.STATIC_DIR + "pages/index.html");
	res.sendFile(path);
});

app.listen(PORT, () =>
	console.log(`Node server listening at http://localhost:${PORT}`)
);
