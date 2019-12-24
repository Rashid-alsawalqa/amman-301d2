'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => {throw error;})

// Application Dependencies
const express = require('express');

// Application Setup
const PORT = process.env.PORT;
const server = express();

// Routes
server.get('/', (request, response) => {
  response.status(200).send('Hi Class');
});

server.get('/people', (request, response) => {
  // SQL query
  let sql = `SELECT * FROM people`;
  client.query(sql)
  .then((data)=>{
    // console.log(data.rows);
    response.status(200).json(data.rows);
  });
});

server.get('/add', (request, response) => {
  let first = request.query['first'];
  let last = request.query['last'];
  // console.log(first, last);

  let sql = `INSERT INTO people(first_name, last_name) VALUES ($1, $2) RETURNING *`;
  let queryData = [first, last];
  client.query(sql,queryData)
  .then((data)=>{
    response.status(200).send("Worked");
  });

});



// Error Handler Routes
server.use('*', (request,response) => {
    response.status(404).send('huh?');
});

server.use((error, request, response) => {
  response.status(500).send(error);
});


client.connect()
.then( () => {
  server.listen(PORT, () => console.log('Server up on', PORT));
})
.catch(err => {
  throw `Error happend ${err}`;
});

