const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PropertiesFormSchema = new Schema({
    userId: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        default: ''
    },
    majorCategory: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    },
    bedrooms: {
        type: String,
        default: ''
    },
    bathrooms: {
        type: String,
        default: ''
    },
    furnishing: {
        type: String,
        default: ''
    },
    constructionstatus: {
        type: String,
        default: ''
    },
    listedby: {
        type: String,
        default: ''
    },
    SBArea: {
        type: Number,
        default: ''
    },
    carpetArea: {
        type: Number,
        default: ''
    },
    bachelorsallowed: {
        type: String,
        default: ''
    },
    maintenance: {
        type: Number,
        default: ''
    },
    totalFloors: {
        type: Number,
        default: ''
    },
    floorNumber: {
        type: Number,
        default: ''
    },
    carparking: {
        type: String,
        default: ''
    },
    facing: {
        type: String,
        default: ''
    },
    projectname: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    selectedImage: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("PropertiesForm", PropertiesFormSchema);
