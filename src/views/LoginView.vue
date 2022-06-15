<template>
  <div>
    <Login @loginUid="uid = $event" />
    <Gourmet v-bind:uid="uid" />
    <SendUid v-bind:uIdForSendUid="uid" />
    {{ uid }}
  </div>
</template>

<script>
import Gourmet from "@/views/gourmetApi.vue"
import Login from "@/components/LoginComponents.vue"
import SendUid from "@/components/SendUid.vue"

export default {
  components: {
    SendUid,
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
