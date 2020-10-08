const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({

    
    id: {
        type:Number
    },
    country: {
        type: String
    }

}, {collection: 'country'});

module.exports = mongoose.model('country', countrySchema);