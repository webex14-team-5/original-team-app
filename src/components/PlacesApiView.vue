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
  <div class="google_map_parent">
    <h1>Google Map</h1>
    <div class="google_map" ref="map" style="height: 500px; width: 800px"></div>
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
  },
}
</script>

<style>
.google_map_parent {
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  padding-top: 30px;
  margin: 50px auto;
  box-shadow: 15px 15px 0px rgba(0, 0, 0, 0.1);
  float: right;
  vertical-align: middle;
  width: 100%;
}
.google_map {
  float: center;
  padding: 30px;
  position: relative;
  left: 25%;
}
</style>
