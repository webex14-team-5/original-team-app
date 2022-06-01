<template>
  <div>
    <h2>登録</h2>
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" />
    <br /><br />
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    <!-- <br /><br />
    <label for="userName">User Name</label>
    <input id="userName" type="userName" v-model="userName" />
    <br /><br />
    <label for="university">University</label>
    <input id="university" type="university" v-model="university" /> -->
    <br /><br />
    <button v-on:click="register">登録</button>
  </div>
</template>

<script>
import axios from "@/axios-auth"
export default {
  data() {
    return {
      email: "",
      password: "",
      //   userName: "",
      //   university: "",
    }
  },
  methods: {
    register() {
      axios
        .post("/accounts:signUp?key=AIzaSyAZMtb3rWXyqz6zo_BEmbSNEkuyBP6A_0U", {
          email: this.email,
          password: this.password,
          //   userName: this.userName,
          //   university: this.university,
          returnSecureToken: true,
        })
        .then((response) => {
          console.log(response)
        })
    },
  },
}
</script>
