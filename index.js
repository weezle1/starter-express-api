/***const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!!!!!')
})
app.listen(process.env.PORT || 3000)
***/

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/4da02459e0-------";
  //const url = "";
  const options = {
    method: "POST",
    auth: "west-:9a3a63103d84c3f946d1222d73b64976-us21-"
  }

  // post requests
  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      console.log("success");
      res.sendFile(__dirname + "/success.html");
    }else{
      console.log("failure");
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

//app.listen(3000, function(){
app.listen(process.env.PORT || 3000, function(){
  console.log("server is up and running");
});

// api key: 9a3a63103d84c3f946d1222d73b64976-us21

// audience/list id: 4da02459e0
