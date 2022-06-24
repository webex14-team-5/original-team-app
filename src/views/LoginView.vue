<template>
  <div>
    <Login @loginUid="uid = $event" @userData="userData = $event" />
    <Gourmet v-bind:uid="uid" v-bind:userData="userData" />
    <PlacesApi />
    {{ uid }}
  </div>
</template>

<script>
import Gourmet from "@/components/gourmetApi.vue"
import Login from "@/components/LoginComponents.vue"
import PlacesApi from "@/components/PlacesApiView.vue"

export default {
  components: {
    Gourmet,
    Login,
    PlacesApi,
  },
  data() {
    return {
      email: "",
      password: "",
      uid: "",
    }
  },
}
</script>
