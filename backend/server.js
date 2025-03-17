const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const axios = require("axios");
app.get("/weather", (req, res) => {
  const city = req.query.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=92fd0a3705ae65b6b8bf3c44076445d0`;
  axios
    .get(url)
    .then((response) => {
      const weatherData = {
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      };
      console.log(response);
      res.json(weatherData);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
