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


app.get('/', (req, res) => {
    let resX = []
    let countries = require('./DATA/country.json');
    for (let i = 0; i < countries.length; i++) {
        resX.push(countries[i].name);
    }
    res.send(resX);
});

app.post('/:country', (req, res) => {
    let state = require('./DATA/state');
    res.send(state[req.params.country]);
});


app.post('/:country/:state', (req, res)=>{

    let cities = require('./DATA/city.json');
    res.send(cities[req.params.state]);

});









// app.post('/', async(req, res) => {



//     mongoose.connection.db.collection('country',  async function  (err, collection) {

//         collection.find({}).toArray((err, data)=>{

//             res.send(data);

//         });

//     });

// });

// app.post('/:country',  (req, res)=>{
//     // res.send(req.params.id);
//     c = req.params.country;
//     // res.send(c);
//     mongoose.connection.db.collection('country',  async function  (err, collection) {

//         collection.find( { state : c } ).toArray((err, data)=>{ 
//             res.send(data[0]);
//         });
//     });
// });

// app.post('/:ccode', async(req, res) => {

//     // ids = Number(req.params.id)
//     ccodes = req.params.ccode;
//     // scodes = Number(req.params.scode);

//     mongoose.connection.db.collection('state',  async function  (err, collection) {
//         collection.find({ ccode: ccodes}).toArray((err, data)=>{
//             res.send(data);
//         });
//     });
// });

// app.post('/:ccode/:scode', async(req, res) => {

//     mongoose.connection.db.collection('country',  async function  (err, collection) {
//         collection.find({ id: ids}).toArray((err, data)=>{
//             res.send(data);
//         });
//     });
// });

app.listen(8000, () => {
    console.log('server is start');
})