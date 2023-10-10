var express = require('express');
const fs = require('fs');

 

var team = require('../data/team')
var router = express.Router();

 

 

let read_json_file = () => {
    let file = './data/dvd.json';
    return fs.readFileSync(file);
}

 

exports.list = () => {
    return JSON.parse(read_json_file());
};

 

function computePrice(json, percent) {
    taxPercentage = taxPercentage / 100;
    for (let book of json) {
        console.log(book.price);
        book.price =book.price+ ( book.price * (percent));
        book.taxPercentage = percent;
        console.log(book.price);
    }
    console.log(json);
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
        } else if (location === 'IR') {
            console.log("TEST");
            json_result = computePrice(json_result, 23);
        } 
        else if (location === 'US-NC') {
            console.log("TEST");
            json_result = computePrice(json_result, 8);
        }else {
            console.log('not a valid location');
        }
    }
    res.json(json_result);
});

router.get('/search',(req,res,next)=>{
    const {minprice, maxprice, rating, brand} = req.params;

    let jsonResult = JSON.parse(read_json_file);

    
})

 

router.get('/team', function(req, res, next) {
    res.json(team)
})

 

router.get('/:')

 

module.exports = router;