var express = require('express')
var app = express()



app.get('/message',(req,res) =>{
res.send("hello")

})



app.listen(8080)

console.log("App listening on port 8080")