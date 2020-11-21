const express = require('express')
const https = require('https')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res) {

    const apiKEY = process.env.API_KEY
    const query = req.body.cityName
    const unit = 'metric'

    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKEY}&q=${query}&units=${unit}`

    https.get(url, function(response) {
        
        response.on('data', function(data) {

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconURL = 'http://openweathermap.org/img/wn/'
            const imageURL = iconURL + icon +  '@2x.png'
            
            res.write('<h1>The temperature in ' + capitalizeFirstLetter(query) + ' is ' + Math.floor(temp) + ' degree Celcius</h1>')
            res.write('<p>The weather is currently ' + desc + '</p>')
            res.write('<img src='+ imageURL + '>')
            res.send()

        })
    
    })

})


app.listen(port, function() {
    console.log(`server is running on port ${port}`);
})
