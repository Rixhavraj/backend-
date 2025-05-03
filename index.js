const express = require('express')
const app = express() //import express from "express"
const mongoose = require('mongoose')
const Path = require('path')
require('dotenv').config()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.once('open', ()=>{
  console.log("mongo db connectes succesfully!!!")
})

const userSchema = new mongoose.Schema({
  Username: { type: String },
  Password: { type: String }

});

const users = mongoose.model("data", userSchema)

app.use('/', express.static(Path.join(__dirname)))

app.get('/', (req, res) => {
  res.sendFile(Path.join(__dirname, 'index.html'));
});


app.use('/shayari', express.static(Path.join(__dirname, '../shayari')))

app.post('/shayari', async (req, res) => {
  const { Username, Password } = req.body;
  const user = new users({ Username, Password });

  try {
    await user.save();
    console.log("saved to db", user);
    res.redirect('shayari')
  } catch (err) {
    console.log("Error saving to db", err);
    res.status(500).send("error saving data");
  }
});


app.listen(port, () => {
  console.log(`Listening at port ${port}`)
})