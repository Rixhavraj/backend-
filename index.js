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
  res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background:rgb(0, 0, 0);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .login-container {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          width: 300px;
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        input[type="text"],
        input[type="password"] {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="login-container">
        <h2>Login</h2>
        <form method="POST" action="/backand/index.js">
          <input name="Username" type="text" placeholder="Username" required />
          <input name="Password" type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </body>
    </html>`)
});


app.post('/', async(req, res)=>{
  const { Username, Password } = req.body;
  const user = new user({
    Username, Password
  });
  try{
  await user.save();
  console.log("saved to db", user);
  res.send("Form submitted successfully!!!");
  } catch(err){
    console.log("Error saving to db", err);
    res.status(500).send("error saving data");
  }
});



app.listen(port, () => {
  console.log(`Listening at ${port}`)
})