const express = require('express');
const agecon = require('../Controller/agecontroller');

const apiRdata = express.Router();
const apiRschool = express.Router();
const apiRschoolexep = express.Router();
const apiRservice = express.Router();
const apiRskill = express.Router();
const apiRproj = express.Router();
const apiRStack = express.Router();
const postMessage = express.Router();



apiRdata.get('/data',agecon.getdata);
apiRschool.get('/school', agecon.getschool);
apiRschoolexep.get('/experience', agecon.getexper);
apiRservice.get('/service', agecon.getservice);
apiRskill.get('/skills',agecon.getskill);
apiRproj.get('/project',agecon.getproj);
apiRStack.get('/stack',agecon.getstack);

postMessage.post('/addMessage',agecon.createmessage)


module.exports = {apiRschool , apiRdata,apiRschoolexep,apiRservice,apiRskill,apiRproj,apiRStack,postMessage};

