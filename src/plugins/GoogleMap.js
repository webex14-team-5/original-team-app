const GoogleMap = {
  install() {
    let mapLoaded = false
    const loadScript = () => {
      let script = document.createElement("script")
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAyAIhbvR6SvjdZtEbMwRmvRk3NQmyGg0M&callback=initMap"
      script.async = true
      document.head.appendChild(script)
    }

    loadScript()

    window.initMap = () => {
      mapLoaded = true
      console.log(mapLoaded)
    }
  },
}

export default GoogleMap
