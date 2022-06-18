<template>
  <div>
    <Login @loginUid="uid = $event" @userData="userData = $event" />
    <Gourmet v-bind:uid="uid" v-bind:userData="userData" />
    {{ uid }}
  </div>
</template>

<script>
import Gourmet from "@/views/gourmetApi.vue"
import Login from "@/components/LoginComponents.vue"

export default {
  components: {
    Gourmet,
    Login,
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
