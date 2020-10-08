const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// const countryModel = require('./database/country');

mongoose.connect('mongodb://localhost:27017/CountryStateCity', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected');
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


// app.get('/', (req, res) => {
//     let resX = []
//     let countries = require('./DATA/country.json');
//     for (let i = 0; i < countries.length; i++) {
//         resX.push(countries[i]);
//         // console.log(countries[1])
//     }
//     res.send(resX);
// });

// app.post('/:country', (req, res) => {
//     let state = require('./DATA/state');
//     res.send(state[req.params.country]);
// });

// app.post('/:country/:state', (req, res)=>{
//     let cities = require('./DATA/city.json');
//     res.send(cities[req.params.state]);
// });


app.get('/', (req, res) => {
    let resX = [];
    mongoose.connection.db.collection('country', function (err, collection) {
        collection.find({}).toArray((err, data) => {

            for (let index = 0; index < data.length; index++) {
                resX.push(data[index].name);
            }
            res.send(resX);
        });
    });
});


app.get('/:country', (req, res) => {
    let resX = [];

    try {

        mongoose.connection.db.collection('country', function (err, collection) {
            collection.find({
                name: req.params.country
            }).toArray((err, data) => {
                if(err){
                    res.send(err);
                }
                else{
                    for (let index = 0; index < data[0].state.length; index++) {
                        resX.push(data[0].state[index].state_name);
                    }
    
                    res.send(resX);
                }
    
            });
        });
        
    } catch (error) {
        res.send(error);
    }
    
});

app.get('/:country/:state', (req, res) => {
    let resX = [];
    mongoose.connection.db.collection('country', function (err, collection) {
        collection.find({
            name: req.params.country
        }, {
            state_name: req.params.state
        }).toArray((err, data) => {

            data[0].state.forEach(element => {
                // console.log(element.state_name)
                if (element.state_name == req.params.state) {
                    res.send(element.cities)
                }
            });
            // console.log(data[0].state[0].state_name)
            // console.log(data[0].state[1].state_name)
        });
    });
});


app.listen(8000, () => {
    console.log('server is start');
})