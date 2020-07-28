
require('dotenv').config()
const mongodb = require("mongodb")

const connectionString = process.env.CONNECTION_STRING

mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
	module.exports = client
	const app = require("./app")
	app.listen(process.env.PORT, () => console.log("the app is established on port 3000"))
})