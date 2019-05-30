const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb+srv://demo:demo@cluster0-nevpd.mongodb.net/angular-heroes?retryWrites=true";


module.exports = (app) => {
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
        .then(db => {
	    db = db.db("angular-heroes");
            app.heroes = db.collection("heroes");
            console.log("Database connection established")
        })
        .catch((err) => console.error(err))

};
