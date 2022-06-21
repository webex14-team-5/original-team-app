<template>
  <!-- <section>
    <header>("Access-Control-Allow-Origin: *")</header>
    <input class="search_word" type="text" v-model="inputText" />
    <button v-on:click="getPlaceId">検索</button>
  </section> -->

  <!-- <section>
    <div v-for="(shop, numbers) in mapData.results" :key="numbers">
      <div v-if="exit">{{ numbers + 1 }}{{ shop.name }}</div>
    </div>
  </section> -->
  <div>
    <h1>Google Map</h1>
    <div ref="map" style="height: 500px; width: 800px"></div>
  </div>
</template>

<script>
let associativeArrayGoogle = {}
export default {
  data() {
    return {
      myLatLng: { lat: 34.65594, lng: 135.007768 },
      shopData: {},
    }
  },
  mounted() {
    if (!window.mapLoadStarted) {
      window.mapLoadStarted = true
      let script = document.createElement("script")
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAyAIhbvR6SvjdZtEbMwRmvRk3NQmyGg0M&callback=initMap&libraries=places"
      script.async = true
      document.head.appendChild(script)
    }

    window.initMap = () => {
      window.mapLoaded = true
    }
    // let pyrmont = new window.google.maps.LatLng(35.714, 139.797)

    const request = {
      location: this.myLatLng,
      radius: "1000",
      type: ["restaurant"],
    }

    let timer = setInterval(() => {
      if (window.mapLoaded) {
        clearInterval(timer)
        let map = new window.google.maps.Map(this.$refs.map, {
          center: this.myLatLng,
          zoom: 10,
        })
        new window.google.maps.Marker({ position: this.myLatLng, map })
        let service = new window.google.maps.places.PlacesService(map)

        service.nearbySearch(request, this.callback)
        // this.associateArray()
      }
    }, 500)
  },
  methods: {
    callback: function (results, status) {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          // console.log(results[i])
          const lat = results[i].geometry.viewport.Ab.lo
          const lng = results[i].geometry.viewport.Ua.lo
          const name = results[i].name
          const place = String(lat) + String(lng)
          console.log(place)
          associativeArrayGoogle[place] = name
        }
        console.log(this.associativeArrayGoogle)
      }
    },
    // associateArray: function () {
    //   console.log(this.shopData)
    //   for (let i = 0; i < this.shopData.length; i++) {}
    //   // console.log(associativeArrayGoogle)
    // },
  },
}
</script>

<!-- <script>
import axios from "axios"
// import google from "google"
//import fetchJsonp from "fetch-jsonp"
const map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: -33.8666, lng: 151.1958 },
  zoom: 15,
})

export default {
  data() {
    return {
      map: new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.8666, lng: 151.1958 },
        zoom: 15,
      }),
      query: "",
      mapData: {},
      exit: false,
      placeIds: [],
    }
  },
  created() {
    // function initialize() {
    //   // Create a map centered in Pyrmont, Sydney (Australia).
    //   map = new google.maps.Map(document.getElementById("map"), {
    //     center: { lat: -33.8666, lng: 151.1958 },
    //     zoom: 15,
    //   })
    // }
  },
  methods: {
    async findPlace() {
      this.query = this.inputText
      const URL =
        "https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyAyAIhbvR6SvjdZtEbMwRmvRk3NQmyGg0M&query=" +
        this.query
      // const res = await fetchJsonp(
      //   "https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyAyAIhbvR6SvjdZtEbMwRmvRk3NQmyGg0M&format=jsonp&query=" +
      //     this.query
      // )

      axios
        .get(URL)
        .then((response) => {
          this.mapData = response.data.results
          this.addLocationsToGoogleMaps()
        })
        .catch((error) => {
          console.log(error.message)
        })

      // const res = await axios.get(URL)
      // const data = await res.json()
      // this.mapData = data
      console.log(this.mapData)
      // 条件合致する店が存在するかどうか
      if (this.mapData != "") {
        this.exit = true
      }
    },
    async getPlaceId() {
      let request = {
        query: this.inputText,
      }
      let service = new google.maps.places.PlacesService(map)
      service.textSearch(request, this.callback_placeId)
      for (let i = 0; i < this.placeIds.length; i++) {
        this.getPlace(i)
      }
    },
    getPlace: function (i) {
      let request = {
        placeId: this.placeIds[i],
        fields: ["name", "rating", "open", "photos"],
      }
      let service = new google.maps.places.PlacesService(map)
      service.textSearch(request, this.callback_search)
    },
    callback_search: function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 1; i < results.length; i++) {
          this.placeIds.push(results[i].place_id)
        }
      }
    },
    callback_placeId: function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 1; i < results.length; i++) {
          this.mapData.push(results[i])
        }
      }
    },
  },
}
</script> -->
