var express = require('express');
const fs = require('fs');


var team = require('../data/team');
var router = express.Router();

let read_json_file = () => {
    let file = '../data/dvd.json';
    return fs.readFileSync(file);
}

exports.list = () =>{
    return JSON.parse(read_json_file());
}

function computePriceAfterTax(jsonData, taxPercentage){
    taxPercentage = taxPercentage/100;
    for(let eachDvd of jsonData){
        console.log(eachDvd.price);
        eachDvd.price = eachDvd.price * (1 + percent);
        console.log(eachDvd.price);
    }

    return jsonData;
}

router.get('/dvd/all/:location?', (req,res,next)=>{
     let jsonData = JSON.parse(read_json_file());

     let location = req.params.location;

     console.log(`Got this location ${location}`);

     if(location === "US-NC"){
        jsonData = computePriceAfterTax(jsonData, 8);
     }else if(location === "IE"){
        jsonData = computePriceAfterTax(jsonData, 23);
     }else if(location === "IN"){
        jsonData = computePriceAfterTax(jsonData, 18);
     }else{
        console.log('Not a valid location');
     }

     res.json(jsonData);
});

router.get('/dvd/team',(req,res,next)=>{
    res.json(team);
});


module.exports = router;