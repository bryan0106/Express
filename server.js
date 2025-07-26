
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const server = express();


const mongoose = require('mongoose');
const cors = require('cors');


const PORT = process.env.PORT || 3000;
const FRONTEND_URI = process.env.FRONTEND_URI;
const MONGO_URI = process.env.MONGO_URI;

// --- MongoDB Connection Function ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));

//'https://mongfe.netlify.app'
// --- Middleware Setup ---
//server.use(cors()); // Enable CORS for all routes
server.use(cors({
    origin: FRONTEND_URI,    
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'], 
}));

server.use(express.json()); // Enable parsing of JSON request bodies

// --- API Router ---

const {apiRdata , apiRschool,apiRschoolexep, apiRservice,apiRskill, apiRproj, apiRStack,postMessage} = require('./Router/agerouter');

server.use('/api', apiRdata); 
server.use('/api', apiRschool); 
server.use('/api', apiRschoolexep);
server.use('/api', apiRservice);
server.use('/api', apiRskill);
server.use('/api', apiRproj);
server.use('/api', apiRStack);
server.use('/api', postMessage);


const {Nage,Educ,Exp, Ser, Skil,Proj,Stack, Message} = require('./models/agemodel');
server.get('/', (req, res) => {
    const dbName = mongoose.connection.name;
    const Namecoll = Nage.collection.name;
 const Educcoll = Educ.collection.name;
  const Expccoll = Exp.collection.name;
    const Serccoll = Ser.collection.name;
      const Skilccoll = Skil.collection.name;
      const Projcoll = Proj.collection.name;
         const Stackcoll = Stack.collection.name;
    const Messcoll = Message.collection.name;
    res.send(`
        <h1>API is running...</h1>
        <p><strong>Database Name:</strong> ${dbName}</p>
        <p><strong>Collection Name for Aboutme entries:</strong> ${Namecoll}</p>
         <p><strong>Collection Name for Education entries:</strong> ${Educcoll}</p>
         <p><strong>Collection Name for Experience entries:</strong> ${Expccoll}</p>
           <p><strong>Collection Name for Services entries:</strong> ${Serccoll}</p>
           <p><strong>Collection Name for Skills entries:</strong> ${Skilccoll}</p>
           <p><strong>Collection Name for Projects entries:</strong> ${Projcoll}</p>
            <p><strong>Collection Name for Stack SKlls entries:</strong> ${Stackcoll}</p>
          <p><strong>Collection Name for CreateMessage entries:</strong> ${Messcoll}</p>


         <p>Age API GET available at http://localhost:${PORT}/api/data</p>
        <p>Age API GET available at http://localhost:${PORT}/api/school</p>
  <p>Age API GET available at http://localhost:${PORT}/api/experience</p>
        <p>Age API GET available at http://localhost:${PORT}/api/service</p>
          <p>Age API GET available at http://localhost:${PORT}/api/skills</p>
        <p>Age API GET available at http://localhost:${PORT}/api/project</p>
          <p>Age API GET available at http://localhost:${PORT}/api/stack</p>

        <p>Age API POST available at http://localhost:${PORT}/api/addMessage</p>



    `);
});



// --- Server Listen ---
server.listen(PORT, () => { // Use PORT here
  console.log(`Server running on port ${PORT}`);
  console.log(`MAIN API at: http://localhost:${PORT}/api`);
});