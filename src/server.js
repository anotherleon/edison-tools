const express = require("express");
const open = require("open");
const app = express();

//allow custom header and CORS
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
        res.send(200);
    } else {
        next();
    }
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/ip", (req, res) => {
    res.send(getIPAddress());
});

app.get("/qrcode.js", function (req, res) {
    res.sendFile(__dirname + "/qrcode.js");
});

var server = app.listen(3000, function () {
    const port = server.address().port;
    open(`http://127.0.0.1:${port}`);
    console.log("应用实例，访问地址为 ", `http://127.0.0.1:${port}`);
});

function getIPAddress() {
    var interfaces = require("os").networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
                return alias.address;
            }
        }
    }
}
