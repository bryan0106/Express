const express = require('express');
const server = express();

const mongoose = require('mongoose');
const port=500;
const mydb= 'mongodb://127.0.0.1:27017/todoApsp';

const cors = require('cors');

const apirouter = require('./Router/agerouter');


 mongoose.connect(mydb)
server.use(cors());
server.use(express.json());
server.use('/api',apirouter)

server.listen(port,()=>{
  console.log(` http://localhost:${port}/api/same`);

});