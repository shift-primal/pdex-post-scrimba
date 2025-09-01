import express from "express";
import db from "./database.js";

const app = express();
const port = 3000;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

app.get("/pokemon", (req, res) => {
	const limit = req.query.limit || 1025;
	const offset = req.query.offset || 0;

	const pokemon = db.prepare("SELECT * FROM pokemon LIMIT ? OFFSET ?").all(limit, offset);

	res.json(pokemon);
});

app.get("/pokemon/:id", (req, res) => {
	const id = req.params.id;

	const pokemon = db.prepare("SELECT * FROM pokemon WHERE id = ?").get(id);

	if (pokemon) {
		res.json(pokemon);
	} else {
		res.status(404).json({ error: "Pokemon not found" });
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
