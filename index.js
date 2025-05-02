const express = require('express')
const app = express() //import express from "express"
const mongoose = require('mongoose')
const Path = require('path')
const port = 3000

app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/login');
const db = mongoose.connection;
db.once('open', ()=>{
  console.log("mongo db connectes succesfully!!!")
})

const userSchema = new mongoose.Schema({
  Username: { type: String },
  Password: { type: String }

});

const users = mongoose.model("data", userSchema)

app.get('/', (req, res) => {
  res.sendFile(Path.join(__dirname, 'index.html'));
});



app.post('/', async(req, res)=>{
  const { Username, Password } = req.body;
  const user = new users({
    Username, Password
  });
  try{
  await user.save();
  console.log("saved to db", user);
  res.send("Form submitted successfully!!!");
  } catch(error){
    console.log("Error saving to db", err);
    res.status(500).send("error saving data");
  }
});



app.listen(port, () => {
  console.log(`Listening at ${port}`)
})