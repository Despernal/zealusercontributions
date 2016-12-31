var express = require("express");

var app = express();

app.set("port", (process.env.PORT || 8080));

app.get("/", function (request, response) {
    response.send("Working");
});

app.listen(app.get("port"), function () {
    console.log("App Running on port", app.get("port"));
});