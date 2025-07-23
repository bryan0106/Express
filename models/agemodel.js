const mongoose = require('mongoose');

const Ageinterface = new mongoose.Schema({
name:{
    type:String,
    required:true
},
age:{
    type:Number,
    required:true,
    default:1
}
});
const Nage = mongoose.model('Nage',Ageinterface)
module.exports = Nage;