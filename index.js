/*
REQUIRES 
*/


const express = require("express");
const dbo = require("./db/db");
const bodyParser = require('body-parser');
var cors = require('cors')


/*
VARIABLES 
*/


const app = express();
const port = 4444;
const jsonParser = bodyParser.json()


/* 
ACTIONS
*/


// URL Encoding
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


// Allowing the app to run when an action happens
app.listen(port, function () {
  console.log(`POKEDEX DE ZINZIN IS STARTING IN PORT : ${port}!`);
});


// Connecting the database to the server
dbo.connectToServer();


/*
INTERACTION WITH THE LIST OF POKEMONS (POKEMON)
*/


// Gets all the pokemons registered in the pokemon list
app.get("/pokedex/pokemon/", function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("Pokemon")
    .find({}) 
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error : Pokemons in Pokedex-De-Zinzin not found.");
      } else {
        res.json(result);
      }
    });
  });


// Adds a pokemon in the pokemon list
app.post('/pokemon/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("Pokemon")
    .insert({...body})
  res.json(body);
});


// Changes a pokemon in the pokemon list
app.post('/pokemon/update', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("Pokemon")
    .update({ name : body.name },
            { $set: {PokedexNb : body.update.PokedexNb, name : body.update.name, type: body.update.type, img: body.update.img} })
  res.json(body);
});


// Deletes a pokemon in the pokemon list
app.delete('/pokemon/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("Pokemon")
    .deleteOne({...body})
  res.json(body);
});


/*
INTERACTION WITH THE LIST OF POKEMON OWNED (POKEDEX)
*/


// Gets the list of pokemons owned
app.get("/pokedex/pokedex/", function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("Pokedex")
    .find({}) 
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error : Pokemons of Pokedex-De-Zinzin not found.");
      } else {
        res.json(result);
      }
    });
});


// Adds a pokemon in the pokemons owned list
app.post('/pokedex/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
      .collection("Pokedex")
      .insertOne({...body})
  res.json(body);
});


// Deletes a pokemon in the pokemons owned list
app.delete('/pokedex/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
      .collection("Pokedex")
      .deleteOne({...body})
  res.json(body);
});


/*
INTERACTION WITH THE LIST OF TYPES (TYPES)
*/


// Gets all the types registered in the type list
app.get("/pokedex/types/", function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("Types")
    .find({}) 
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error : Types in Pokedex-De-Zinzin not found.");
      } else {
        res.json(result);
      }
    });
  });


// Adds a type in the types list
app.post('/types/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("Types")
    .insert({...body})
  res.json(body);
});


// Changes a type in the types list
app.post('/types/update', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("Types")
    .update({ name : body.name },
    { $set: { name : body.newName } })
  res.json(body);
});


// Deletes a type in the types list
app.delete('/types/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("Types")
    .deleteOne({...body})
  res.json(body);
});