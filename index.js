"use strict";
const express = require("express");
const axios   = require("axios");
const _       = require("lodash");

const app = express();

const CDNs = ["", "sanfrancisco.", "newyork.", "london.", "frankfurt."];
app.set("port", (process.env.PORT || 8080));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


let getDocsets = function (filterName) {
    return new Promise(function (resolve, reject) {
        axios
            .get(`http://kapeli.com/feeds/zzz/user_contributed/build/index.json`)
            .then((data) => {
                let docsets;
                if(_.isUndefined(filterName) || _.isEmpty(filterName)){
                    docsets = data.data.docsets;
                }else {
                    let t = {};
                    if(_.isUndefined(data.data.docsets[filterName]) || _.isEmpty(data.data.docsets[filterName])){
                        t[filterName] = {};
                    }else {
                        t[filterName] = data.data.docsets[filterName];
                    }
                    docsets = t;
                }
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
    response.sendFile(__dirname+"/index.html");
});

app.use(express.static(__dirname + "/public"));

app.get("/feeds.json", function (request, response) {
    getDocsets()
        .then((list)=>{
            response.json(_.map(list, (docset)=>{
                docset.feed = `${request.protocol}://${request.get('host')}/docsets/${docset.name}.xml`;
                return docset;
            }));
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

app.get("/docsets/:name.xml", function (request, response) {
    getDocsets(request.params.name).then((list)=>{
        response.set('Content-Type', 'text/xml');
        response.send(xmlify(list));
    }).catch((err)=>{
        response.json(err);
    });
});

app.get("/index.json", function (request, response) {
    axios
        .get(`http://kapeli.com/feeds/zzz/user_contributed/build/index.json`)
        .then((data) => {
            response.json(data.data);
        })
        .catch((err)=>{
            response.end();
        });
});

app.listen(app.get("port"), function () {
    console.log("App Running on port", app.get("port"));
});