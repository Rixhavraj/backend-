const express = require('express')
const app = express() //import express from "express"
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f0f2f5;
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
        <form>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </body>
    </html>
  `);
});



app.listen(port, () => {
  console.log(`Listening at ${port}`)
})