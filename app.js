var express 	= require("express");
var	app	= express(); 

/********************** DATABASE STUFF ************************************************************************************************/
var mongoose    = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://mongorootuser:7cU7KqmwItQlBJi7@cluster0-mcbfw.mongodb.net/pamzc?retryWrites=true", { useNewUrlParser: true });
//mongoose.connect("mongodb+srv://mongorootuser:7cU7KqmwItQlBJi7@cluster0-sxdoy.mongodb.net/pamzc?retryWrites=true", { useNewUrlParser: true });

var requestInfoSchema = new mongoose.Schema ({
	'ip':						String,
	'host':  					String,
	'connection':   			String,
	'pragma':      				String,
	'cache-control':  			String,
	'upgrade-insecure-requests':String,
	'user-agent':   			String,
	'accept': 					String,
	'accept-encoding':   		String,
	'accept-language':   		String,
	'created_at': { type: Date, default: Date.now()}
	});

// Where "Requestinfo" will determine the the collection name to "requestinfo" (lowercase and pluralized).
var Requestinfo = mongoose.model("Requestinfo", requestInfoSchema);  
/*************************************************************************************************************************************/

// We need these next two lines to get params/fields values from your forms request
var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({extended: true}));
// This line avoid you need to write the .ejs extension on ejs files name.
app.set("view engine", "ejs"); 
// Looking for resources also in the  public directory.

var path = require('path');

app.use(express.static(path.join(__dirname + "/public"))); 
console.log(__dirname);

app.get("/", function(req, res){
       
	console.log(req.ip);
	req.headers.ip = req.ip;
	req.headers.created_at = Date.now();
	Requestinfo.create( req.headers, function (err, newReqinfo) {
		if (err) {
			console.log(err);
		} else {	
			console.log("info create with success " + newReqinfo._id);
		}

	});

	res.render("index");
});

app.get("*", function(req, res){
	res.send("This page does not exist!");
});

app.listen(process.env.PORT || 8080, process.env.IP, function( ){
 	console.log("PAMZC has started!");
});


