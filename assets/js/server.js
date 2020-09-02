const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const db = [];

var PORT = process.env.PORT || 3001;
app.get("/", function (req, res) {
	res.json(path.join(__dirname, "index.html"));
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET `*` - Should return the `index.html` file
app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

// GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function (req, res) {
	res.sendFile(path.join(__dirname, "notes.html"));
});

// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.post("/api/notes", function (req, res) {
	let newNote = req.body;
	db.push(newNote);
	return res.json(db);
});

// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.

app.delete("/api/notes/:id", function (req, res) {});

app.listen(PORT, function () {});
