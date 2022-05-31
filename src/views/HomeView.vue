<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <gourmetApi />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"
import gourmetApi from "@/components/gourmetApi.vue"

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    gourmetApi,
  },
}
</script>
