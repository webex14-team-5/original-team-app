<template>
  <div>
    <Login @loginUid="uid = $event" />
    <Gourmet v-bind:uid="uid" />
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
