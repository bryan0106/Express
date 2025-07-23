const express = require('express');
const agecon = require('../Controller/agecontroller');
const apirouter = express.Router();

apirouter.get('/same',agecon.getdata);
module.exports = apirouter;
