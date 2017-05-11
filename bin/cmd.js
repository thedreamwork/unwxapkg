#!/usr/bin/env node

var Wxapkg = require('../');

const fs = require('fs')
const path = require('path');
const mkdirp = require('../mkdirp')

let file = fs.readFileSync(process.argv[2]);

let destination = process.argv[3]? process.argv[3] : 'wxapkg.unpack';
let wxapkg = new Wxapkg(file);
let files = wxapkg.decode();
files.forEach((f)=>{
    let filePath = __dirname + '/./' + destination + f.name;
    let dir = path.dirname(filePath);
    mkdirp(dir, function (err) {
        if (err) return cb(err);

        console.log(filePath)
        fs.writeFileSync(filePath, f.chunk, 'binary')
    });
})
