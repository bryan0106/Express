const mongoose = require('mongoose');

const Ageinterface = new mongoose.Schema({
name:{
    type:String,
    required:true
},
age:{
   type:String,
    required:true
}
});



const Skillinterface = new mongoose.Schema({
name:{
    type:String,
    required:true
},
imgurl:{
   type:String,
    required:true
}
});


const Educinterface = new mongoose.Schema({
school:{
    type:String,
    required:true
},
address:{
   type:String,
    required:true
}
});


const Expinterface = new mongoose.Schema({
company:{
    type:String,
    required:true
},
postion:{
   type:String,
    required:true
},
address:{
   type:String,
    required:true
},
jobdesc1:{
   type:String,
    required:true
},
jobdesc2:{
   type:String,
    required:true
},
jobdesc3:{
   type:String,
    required:true
}
});



const Serinterface = new mongoose.Schema({
No:{
    type:String,
    required:true
},
Title:{
   type:String,
    required:true
},
Desc:{
   type:String,
    required:true
}
});

const Projinterface = new mongoose.Schema({
imgurl:{
   type:String,
    required:true
},
    Title:{
    type:String,
    required:true
},
purpose:{
   type:String,
    required:true
},
Desc:{
   type:String,
    required:true
}
});

const Stackinterface = new mongoose.Schema({
imgurl:{
   type:String,
    required:true
},
    Title:{
    type:String,
    required:true
},
name:{
   type:String,
    required:true
}
});

const Emailinterface = new mongoose.Schema({
  name:{
   type:String,
    required:true
},
    email:{
    type:String,
    required:true
},
    message:{
    type:String,
    required:true
}
});



const Skil = mongoose.model('skills',Skillinterface)
const Educ = mongoose.model('educs',Educinterface)
const Nage = mongoose.model('nages',Ageinterface)
const Exp = mongoose.model('exps',Expinterface)
const Ser = mongoose.model('sers',Serinterface)
const Proj = mongoose.model('projs',Projinterface)
const Stack = mongoose.model('stacks',Stackinterface)

const Message = mongoose.model('messages',Emailinterface)
module.exports = {Educ,Nage,Exp,Skil,Ser,Proj,Stack,Message};