const { MongoClient } = require("mongodb");
const connectionString =
  "mongodb+srv://PokedexDeZinzin:MDPduPokedex@cluster0.0sch4qd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return err;
      }
      
      dbConnection = db.db("Pokedex");
      console.log("Successfully connected to MongoDB.");
    });
  },

  getDb: function () {
    return dbConnection;
  },
};