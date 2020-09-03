const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

module.exports = function (app) {
	// GET `*` - Should return the `index.html` file
	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, "/public/index.html"));
	});

	// GET `/notes` - Should return the `notes.html` file.
	app.get("/notes", function (req, res) {
		res.sendFile(path.join(__dirname, "/public/notes.html"));
	});

	// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
	app.get("/api/notes", function (req, res) {
		fs.readFile("db/db.json", "utf8", function (error, data) {
			res.json(JSON.parse(data));
		});
	});

	app.post("/api/notes", function (req, res) {
		var newNote = req.body;
		newNote.id = uuidv4();
		fs.readFile("db/db.json", "utf8", function (error, data) {
			var data = JSON.parse(data);
			data.push(newNote);
			fs.writeFile("db/db.json", JSON.stringify(data), function (error) {
				if (error) throw error;
				console.log("Written Successfully");
			});
		});
		res.json(newNote);
	});

	// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
	app.delete("/api/notes/:id", function (req, res) {
		fs.readFile("db/db.json", "utf8", function (error, data) {
			let noteId = req.params.id;
			let noteData = JSON.parse(data);
			noteData = noteData.filter(function (note) {
				if (noteId != note.id) {
					return true;
				} else {
					return false;
				}
			});
			fs.writeFile("db/db.json", JSON.stringify(noteData), function (error) {
				if (error) throw error;
				res.end(console.log("Deleted Successfully"));
			});
		});
	});
};

app.listen(PORT, function () {
	console.log("App listening on PORT " + PORT);
});
