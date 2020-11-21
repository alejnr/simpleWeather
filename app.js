const express = require('express')
const https = require('https')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.get('/', function(req, res){

    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.API_KEY}&q=parma&units=metric`

    https.get(url, function(response) {
        
        response.on('data', function(data) {

            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconURL = 'http://openweathermap.org/img/wn/'
            const imageURL = iconURL + icon +  '@2x.png'
            
            res.write('<h1>The temprature in Parma is ' + Math.floor(temp) + ' degree Celcius</h1>')
            res.write('<p>The weather is currently ' + desc + '</p>')
            res.write('<img src='+ imageURL + '>')
            res.send()

        })
    
    })

})


app.listen(process.env.PORT, function() {
    console.log(`server is running on port ${process.env.PORT}`);
})
