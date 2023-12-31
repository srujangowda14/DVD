var express = require('express');
const fs = require('fs');


var team = require('../data/team.js')
var router = express.Router();

 
let read_json_file = () => {
    let file = './data/dvd.json';
    return fs.readFileSync(file);
}

exports.list = () => {
    return JSON.parse(read_json_file());
};

exports.compute_price = (json, percent) => {
    taxPercentage = percent / 100;
    for (let dvd of json) {
        // console.log(dvd.price);
        dvd.price =dvd.price+ ( dvd.price * (taxPercentage));
        dvd.tax_percentage = percent;
        // console.log(dvd.price);
    }
    // console.log(json);
    return json
}

function computePrice(json, percent) {
    taxPercentage = percent / 100;
    for (let dvd of json) {
        // console.log(dvd.price);
        dvd.price =dvd.price+ ( dvd.price * (taxPercentage));
        dvd.tax_percentage = percent;
        // console.log(dvd.price);
    }
    // console.log(json);
    return json
}

/* GET users listing. */
router.get('/all/:location?', function(req, res, next) {
    let json_result = JSON.parse(read_json_file());
    let location = req.params.location;
    if (location) {
        console.log(`received location: ${location}`);
        if (location === 'IN') {
            json_result = computePrice(json_result, 18);
        } else if (location === 'IE') {
            json_result = computePrice(json_result, 23);
        } 
        else if (location === 'US-NC') {
            json_result = computePrice(json_result, 8);
        }else {
            return res.status(400).json();
        }
    }
    const {minprice, maxprice, rating, brand} = req.query;

    const filteredData = json_result.filter((dvd) => {
 
    if (minprice !== undefined && dvd.price < minprice) {
      return false;
    }

    if (maxprice !== undefined && dvd.price > maxprice) {
       return false;
    }

    if (rating !== undefined && dvd.rating < rating) {
        console.log(`rating: ${rating}`)
       return false;
    }

    if (brand !== undefined && dvd.brand !== brand) {
       return false;
    }

    return true;
   });
    res.json(filteredData); 

});


router.get('/team', function(req, res, next) {
    res.json(team)
})

router.get('/:')

module.exports =  router;