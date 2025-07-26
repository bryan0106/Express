const { get } = require('mongoose');
const {Nage,Educ,Exp,Ser,Skil,Proj,Stack,Message} = require('../models/agemodel');


exports.getdata=async(req , res)=>{
const nameage = await Nage.find();
res.json(nameage);
}

exports.getschool=async(req , res)=>{
    const educd = await Educ.find();
    res.json(educd);
}

exports.getexper=async(req , res)=>{
    const exp = await Exp.find();
    res.json(exp);
}

exports.getservice=async(req , res)=>{
    const ser = await Ser.find();
    res.json(ser);
}

exports.getskill=async(req , res)=>{
    const sks = await Skil.find();
    res.json(sks);
}

exports.getproj=async(req , res)=>{
    const proj = await Proj.find();
    res.json(proj);
}

exports.getstack=async(req , res)=>{
    const stack = await Stack.find();
    res.json(stack);
}


exports.createmessage=async(req ,res)=>{
const {name , email , message} = req.body;
const newmess = new  Message(  {name , email , message});
try{
const saveemail = await newmess.save();
res.status(201).json(saveemail);

} catch{}



}