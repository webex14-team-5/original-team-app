<template>
  <div>
    <h2>登録</h2>
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" />
    <br /><br />
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    <br /><br />
    <label for="userName">User Name</label>
    <input id="userName" type="userName" v-model="userName" />
    <br /><br />
    <label for="university">University Ctrlで複数選択</label>
    <select id="university" name="university" v-model="university" multiple>
      <option value="東京大学">東京大学</option>
      <option value="京都大学">京都大学</option>
      <option value="立命館大学">立命館大学</option>
      <option value="明治大学">明治大学</option>
    </select>
    <br /><br />
    <button v-on:click="register">登録</button>
  </div>
</template>

<script>
import axios from "@/axios-auth"
import { doc, setDoc } from "@firebase/firestore"
import { db } from "/firebase"

export default {
  data() {
    return {
      email: "",
      password: "",
      userName: "",
      university: "",
      myUniversity: [],
      starPost: [],
      uId: "",
    }
  },
  methods: {
    register() {
      axios
        .post("/accounts:signUp?key=AIzaSyAZMtb3rWXyqz6zo_BEmbSNEkuyBP6A_0U", {
          email: this.email,
          password: this.password,
          returnSecureToken: true,
        })
        .then((response) => {
          console.log(response)
          // uid を返す
          this.uId = response.data.localId
          // myUniversity 配列確認
          console.log(this.university)
          // myUniversity に配列にして入れる
          this.myUniversity = Object.values(this.university)
          console.log(this.myUniversity)
        })
        .then(() => {
          setDoc(doc(db, "users", this.uId), {
            UID: this.uId,
            nickName: this.userName,
            myUniversity: this.myUniversity,
            starPost: this.starPost,
          })
        })
    },
  },
}
</script>
