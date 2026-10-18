
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const request = require('request');
const apiKey = '71c406cd0696048af1069afda7277927';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(req, res){
  res.render('index');
 
})









app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  console.log(req.body.city);
  
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)

      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
		let message = `It's ${weather.main.temp} degrees in
               ${weather.name}!`;
			   console.log(message);
      }
    }
  });
});





let city = 'delhi';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

request(url, function (err, response, body) {
let weather = JSON.parse(body);
let message = `It's ${weather.main.temp} degrees in
               ${weather.name}!`;
console.log(message);
});



app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), function(){
      console.log('Server listening on port ' +app.get('port'));
});





