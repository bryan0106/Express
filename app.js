const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3000;
//const dbURI = 'mongodb://127.0.0.1:27017/todoApsp'; 
const dbURI = process.env.MONGO_URI;
require('dotenv').config();


mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));


const ageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: String,
        required: true,
        trim: true
    }

});


const Nage = mongoose.model('nages', ageSchema);

//app.use(cors());

app.use(cors({
    origin: 'https://mongfe.netlify.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'], 
}));



app.use(express.json());




const addAge = async (req, res) => {
    const { name, age } = req.body; 
    if (!name || !age) {return res.status(400).json({ message: 'Both name and age are required.' });}
    
    const newAgeEntry = new Nage({name,age});
    try {
        const savedAge = await newAgeEntry.save();
        res.status(201).json(savedAge);
    } catch (err) { console.error('Error adding age entry:', err.message);
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(el => el.message);
            return res.status(400).json({ message: 'Validation failed', errors });
        }
res.status(500).json({ message: 'Server error: Could not add age entry.' });
    }
};


const getAge = async (req, res) => {
    try { const ages = await Nage.find(); 
            res.status(200).json(ages);
    } catch (err) { console.error('Error fetching age entries:', err.message);
res.status(500).json({ message: 'Server error: Could not retrieve age entries.' });
    }
};
// --- CORRECTED deleteAge FUNCTION ---
const deleteAge = async (req, res) => { 
    const { id } = req.params; 
    try { // CRITICAL FIX: Wrap your logic inside the try block
        const result = await Nage.findByIdAndDelete(id); // Use the ID from params

        if (!result) {
            // If result is null, no document with that ID was found
            return res.status(404).json({ message: 'Age entry not found.' });
        }

        // Respond with a success message (or the deleted document)
        res.status(200).json({ message: 'Age entry deleted successfully!', deletedId: id });

    } catch (err) { // CRITICAL FIX: Catch the error object and log it
        console.error('Error deleting age entry:', err.message);

        // Handle invalid MongoDB ID format (e.g., not a 24-character hex string)
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }
        
        // Generic 500 server error for other unexpected issues
        res.status(500).json({ message: 'Server error: Could not delete age entry.' });
    }
};


const apiRouter = express.Router(); 
apiRouter.post('/add', addAge);
apiRouter.get('/', getAge); 
apiRouter.delete('/:id', deleteAge);



app.use('/api/age', apiRouter);

app.get('/', (req, res) => {
    // Get database name from the Mongoose connection
    const dbName = mongoose.connection.name;
    // Get collection name from the Nage model
    const collectionName = Nage.collection.name;

    res.send(`
        <h1>API is running...</h1>
        <p><strong>Database Name:</strong> ${dbName}</p>
        <p><strong>Collection Name for Age entries:</strong> ${collectionName}</p>
        <p>Age API POST available at http://localhost:${port}/api/age/add</p>
        <p>Age API GET available at http://localhost:${port}/api/age/</p>
        <p>Age API DELETE available at http://localhost:${port}/api/age/:id</p>
    `);
});

// --- Server Start ---
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Age API POST available at http://localhost:${port}/api/age/add`);
    console.log(`Age API GET available at http://localhost:${port}/api/age/`);
});