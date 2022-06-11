<template>
  <div>
    <h2>ログイン</h2>
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" />
    <br /><br />
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    <br /><br />
    <button v-on:click="login">ログイン</button>
  </div>
</template>

<script>
import axios from "@/axios-auth"
import { collection, addDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "firebase/firestore"

export default {
  data() {
    return {
      email: "",
      password: "",
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
          console.log(response)
        })
        .then(() => {
          const auth = getAuth()
          return auth.currentUser
        })
        .then((user) => {
          addDoc(collection(db, "users"), {
            uid: user.uid,
          })
          console.log(user.uid)
        })
    },
  },
}
</script>
