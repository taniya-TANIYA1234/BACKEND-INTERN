const express = require('express');
const app = express();
const auth = require('./routes/auth');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const task = require('./routes/task');
const admin =require("./routes/admin");
const User = require('./models/User.js');
const cors = require('cors');

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
    await mongoose.connect('mongodb://localhost:27017/task-manager');
}



app.use("/",(req, res) => {
  res.status(404).json({
    message: "Page does not exist"
  });
});

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
});
