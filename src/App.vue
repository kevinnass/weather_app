<template>
  <div id="app"  :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main class="">
      <div class="search-box w-5/6 text-black m-auto flex">
        <input type="search" placeholder="Search for a city..."
        class="search-bar text-black mt-10"
        v-model="query"
        @keypress="fetchWeather"/>
      </div>
      <div class="flex justify-center">
        <div v-if="load" class=" mt-56 justify-center lds-ripple"><div></div><div></div></div>
        <div class="cc justify-center m-auto">
          <vue-country-code class="" @onSelect="onSelect"></vue-country-code>
        </div>
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
      <div v-if="error" class="text-black-600 shadow-2xl w-5/6 m-auto rounded-md h-16 py-4 border-black bg-gray-500 border font-bold text-center mt-56">No Result.</br> Search for an existing city</div>
      <div v-if="noLocalWeather" class="text-black-600 shadow-lg w-5/6 m-auto rounded-md h-16 py-4 border-black bg-gray-500 border font-bold text-center mt-56">Search for a city </br> to find its weather</div>
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
      load: false,
      code: '',
      error: false,
      noLocalWeather: false,
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
    setLoading () {
      this.load = false;
    },
    onSelect({name, iso2, dialCode}) {
      this.code = name;
      return {name, iso2, dialCode};
    },
    fetchWeather(e) {
      if (e.key ===  "Enter") {
        this.weather = {};
        this.load = true;
        this.noLocalWeather = false;
        this.error = false;
        http.get(this.url_base + 'weather?q=' + this.query + '&units=metric&appid=' + this.api_key)
        .then(response => {
          this.setLoading();
          return response;
        }).then(this.setResults)
        .catch(error => {
          this.setLoading();
          this.error = true;
        })
      }
    },
    localWeather() {
      let country = this.findCountry(this.code);
      country = country.join('');
      this.load = true;
      this.noLocalWeather = false;
      this.error = false;
      http.get(this.url_base + 'weather?q=' + country + '&units=metric&appid=' + this.api_key)
        .then(response => {
          this.setLoading();
          return response;
        }).then(this.setResults)
        .catch(error => {
          this.setLoading();
          this.noLocalWeather = true;
        })
    },
    findCountry(country) {
      let newCountry = [];
      for (let i = 0; country[i]; i++) {
        newCountry[i] = country[i];
        if (country[i + 1] === ' ') { return newCountry; }
      }
      return newCountry;
    }
  },
  mounted() {
    this.load = true;
    setTimeout(func => {
      this.localWeather()
    }, 3800);
  }
}
</script>

<style lang="scss">
.cc {
  display: none;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-size: cover;
  transition: 0.4s;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #000;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

body {
  font-family: 'montserrat', sans-serif;
  background-image: url("./assets/images/cold-bg.jpg");
}

#app.warm {
  background-image: url('./assets/images/warm-bg.jpg');
  transition: 0.4s;
}

main {
  min-height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.7));
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
