const { get } = require('mongoose');
const Nage = require('../models/agemodel');

exports.getdata=async(req , res)=>{
const nameage = await Nage.find();
res.json(nameage);
}