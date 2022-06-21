<template>
  <section>
    <Login @loginUid="uid = $event" @userData="userData = $event" />
  </section>
  <section>
    <div>your name: {{ UserName }}</div>
    <div>your fav Univ. : {{ myUniversities }}</div>
    <div>your fav shops : {{ starPost }}</div>
  </section>
</template>

<script>
import Login from "@/components/LoginComponents.vue"

export default {
  components: {
    Login,
  },
}
</script>
