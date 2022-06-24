<template>
  <div>
    <h2>ログイン</h2>
    <input id="email" type="email" v-model="email" placeholder="Email" />
    <br /><br />
    <input
      id="password"
      type="password"
      v-model="password"
      placeholder="PassWord"
    />
    <br /><br />
    <button class="btn btn--cubic btn--orange btn--shadow" v-on:click="login">
      {{ LoginStatus }}
    </button>
    <router-link to="/register" class="black_char"
      >アカウントをお持ちでない方はこちらから</router-link
    >
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

<style>
.btn--orange {
  color: #fff;
  background-color: #eb6100;
  border-bottom: 5px solid #b84c00;
}
.btn--orange:hover {
  margin-top: 3px;
  color: #fff;
  background: #f56500;
  border-bottom: 2px solid #b84c00;
}
.btn--shadow {
  -webkit-box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
}
router-link {
  color: black;
}
</style>
