<template>
  <div>
    <h2>ログイン</h2>
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" />
    <br /><br />
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    <br /><br />
    <button v-on:click="login">{{ LoginStatus }}</button>
  </div>
</template>

<script>
import axios from "@/axios-auth"

export default {
  data() {
    return {
      LoginStatus: "ログイン",
    }
  },
  methods: {
    login() {
      axios
        .post(
          "/accounts:signInWithPassword?key=AIzaSyAZMtb3rWXyqz6zo_BEmbSNEkuyBP6A_0U",
          {
            email: this.email,
            password: this.password,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          console.log(response.data.localId)
          this.$emit("loginUid", response.data.localId)
          return response.data.localId
        })
        .then(() => {
          this.LoginStatus = "ログインしました"
        })
    },
  },
}
</script>
