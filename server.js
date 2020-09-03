const express = require("express");
const app = express();
let PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./apiRoutes")(app);
require("./htmlRoutes")(app);

app.listen(PORT, function () {
	console.log("App listening on PORT " + PORT);
});
