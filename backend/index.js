const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');
const notesRoute = require('./routes/notes');


dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Database connection successfull");})
.catch((err)=>{console.log(err);})

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/notes",notesRoute);

app.listen(8901,()=>{
    console.log("Backend Server is running");
})