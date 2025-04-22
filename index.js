const express = require('express')
const app = express() //import express from "express"
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/login', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})




app.listen(port, () => {
  console.log(`Listening at ${port}`)
})