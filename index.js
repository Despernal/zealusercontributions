"use strict";
const express = require("express");
const axios   = require("axios");
const _       = require("lodash");

const app = express();

const CDNs = ["", "sanfrancisco.", "newyork.", "london.", "frankfurt."];
app.set("port", (process.env.PORT || 8080));


let getDocsets = function () {
    return new Promise(function (resolve, reject) {
        axios
            .get(`http://kapeli.com/feeds/zzz/user_contributed/build/index.json`)
            .then((data) => {
                let docsets = data.data.docsets;
                let list = _.map(docsets, function (val, key) {
                    let object = _.clone(val);
                    try {
                        delete object["icon"];
                        delete object["icon@2x"];
                    }catch(e){}
                    object.name = key;
                    object.urls = _.map(CDNs, (city)=>{
                        return `http://${city}kapeli.com/feeds/zzz/user_contributed/build/${key}/${val.archive}`
                    });
                    return object;
                });
                resolve(list);
            })
            .catch((err)=>{
                reject({"error": "An Error Happens", "data": err});
            });
    });
};


function xmlify(list) {
    return _.join(_.map(list, function (docset) {
        let urls = _.join(
            _.map(docset.urls, function (url) {
                return `    <url>${url}</url>`
            }), "\n"
        );

        let other = _.join(_.map(docset.specific_versions, function (v) {
            return `        <version><name>${v.version}</name></version>`;
        }), "\n");

        return `\
<entry>
    <name>${docset.name}</name>
    <version>${docset.version}</version>
${urls}
    <other-versions>
${other}
    </other-versions>
</entry>`
    }), "\n");
}

/* VIEWs */
app.get("/", function (request, response) {
    response.json("Building...");
});

app.get("/feeds.json", function (request, response) {
    getDocsets()
        .then((list)=>{
            response.json(list);
        }).catch((err)=>{
            response.json(err);
        });
});


app.get("/feeds.xml", function (request, response) {
    getDocsets()
        .then((list)=>{
            response.set('Content-Type', 'text/xml');
            response.send(xmlify(list));
        }).catch((err)=>{
        response.json(err);
    });
});

app.listen(app.get("port"), function () {
    console.log("App Running on port", app.get("port"));
});