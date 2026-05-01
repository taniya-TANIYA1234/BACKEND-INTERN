const express = require('express');
const app = express();
const auth = require('./routes/auth');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const task = require('./routes/task');
const admin =require("./routes/admin");
const User = require('./models/User.js');
const cors = require('cors');
const path = require('path');  

app.use(cors());


dotenv.config();



app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/tasks', task);
app.use("/api/admin", admin );




main().then(()=>{
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

app.use(express.static(path.join(__dirname, "../client/build")));

app.use( (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});



app.listen(process.env.Port || 5000, ()=>{
    console.log('Server is running on port 5000');
});


