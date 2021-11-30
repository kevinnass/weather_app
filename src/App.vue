<template>
  <div id="app"  :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main class="">
      <div class="search-box w-5/6 m-auto flex">
        <input type="search" placeholder="Search.."
        class="search-bar mt-10"
        v-model="query"
        @keypress="fetchWeather"/>
      </div>
      <div class="weather-wrap mt-20" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date mt-3">{{ dataBuilder() }}</div>
        </div>

        <div class="weather-box text-center">
          <div class="temp mt-5">{{ Math.round(weather.main.temp) }}°c</div>
          <div class="weather mt-3">{{ weather.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import http from './plugins/http'

export default {
  data() {
    return {
      api_key: '95388c805d3d33d24bf32f4de85841fe',
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: '',
      weather: {}
    }
  },
  methods: {
    setResults (results) {
      this.weather = results
    },
    dataBuilder() {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    },
    fetchWeather(e) {
      if (e.key ===  "Enter") {
        http.get(this.url_base + 'weather?q=' + this.query + '&units=metric&appid=' + this.api_key)
        .then(response => {
          return response
        }).then(this.setResults)
      }
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-size: cover;
  transition: 0.4s;
}

body {
  font-family: 'montserrat', sans-serif;
  background-color: red;
  background-image: url("./assets/images/cold-bg.jpg");
}

#app.warm {
  background-image: url('./assets/images/warm-bg.jpg');
  transition: 0.4s;
}

main {
  min-height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.7));
  //background-image: url("./assets/images/cold-bg.jpg");
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 10px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 10px 0px 16px 0px;
}

.location-box .location {
  color: white;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: white;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: white;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: white;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
