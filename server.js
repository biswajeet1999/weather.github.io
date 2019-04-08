const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')


let app = express();
app.set('view engine', 'hbs')

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname+'/public/images'));
app.use(express.static(__dirname+'/public/css'));
app.use(express.static(__dirname+'/public/js'))

const port = process.env.port || 1234;

app.listen(port, () => {
    console.log(`Hosted at ${port}`)
})

var OAuth = require('oauth');
var header = {
    "X-Yahoo-App-Id": "JRME0E52"
};
var request = new OAuth.OAuth(
    null,
    null,
    'dj0yJmk9NjgzNmtzQmhVaHVOJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWM0',
    '5836de61fd8670d406eb8eb14c8780856bf01908',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);



app.get('/', (req, res) => {
    res.render('weather.hbs');
});


app.post('/result', urlencodedParser,(req, res) => {
    
    request.get(
                `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${req.body.city},in&format=json&u=c`,
                null,
                null,
                function (err, data, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result)
                        //console.log(JSON.parse(data, undefined, 2));
                        res.send();
                    }
                }
            
            );
    
});
