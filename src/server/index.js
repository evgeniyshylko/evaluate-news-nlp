const dotenv = require('dotenv');
const cors = require('cors');
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'))

var textapi = process.env.API_KEY;

const request = require('request');

const url = 'https://api.meaningcloud.com/sentiment-2.1';

// Replace 'Your text to analyze' with the text you want to analyze
const text = 'This is a great example to understand API integration!';
const lang = 'en'; // ISO 639-1 code for the language of the text

const mockAPIResponse = require('./mockAPI.js')


console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/analyse', function (req, res) {
    let sentimentResult = '';
    const options = {
        url: url,
        method: 'POST',
        form: {
            key: textapi,
            txt: req.body.text,
            lang: lang,
        },
    };
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('API Response:', body);
            sentimentResult = JSON.parse(body);
        } else {
            console.error('Error:', error);
            console.log('StatusCode:', response && response.statusCode);
        }
        res.send(sentimentResult);
    });
})




