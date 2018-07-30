var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require("mongoose")




app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



var dbUrl = 'mongodb://user:yangI0bmsn@ds257241.mlab.com:57241/user'

var House = mongoose.model('House',{
	Address: String,
	Sqfeet: Number,
	Price: Number,
	OwnerName: String
})


app.get('/getAllHouses',(req,res) =>{
	House.find().then((house)=>{
		res.status(200).send(house)
	}).catch(e=>{
		res.status(400).send(e);

	});
});



app.post('/addNewHouses', (req,res) => {
	
	var house = new House(req.body)

	var newHouse = house.save().then((result)=>{
 		console.log("Successfully Saved", result)
 		res.status(200).json({
 			message: 'Success'
 		})
	}).catch(err => {
		console.log("Failed to save",err)	
		res.status(500).json({
			message: 'Failed to save House.'
		})
	})

	

	console.log(req.body)
	


})


app.get('/message',(req,res) =>{
	res.send("hello")

})



var server = app.listen(8080,function(err){
	if (!err){
		mongoose.connect(dbUrl, { useNewUrlParser: true },(err)=>{
	console.log('mongo db connection', err)
	if(err){
		server.close()
	}else{
		console.log("connected to db")
	}
})

	}else throw err;
})

console.log("App listening on port 8080")