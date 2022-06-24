<template>
  <div class="form">
    <h1><span>ataoka</span> グルメ</h1>
    <!-- <label for="email">Email</label> -->
    <input placeholder="Email" id="email" type="email" v-model="email" />
    <br /><br />
    <!-- <label for="password">Password</label> -->
    <input
      placeholder="Password"
      id="password"
      type="password"
      v-model="password"
    />
    <br /><br />
    <!-- <label for="userName">User Name</label> -->
    <input
      placeholder="User Name"
      id="userName"
      type="userName"
      v-model="userName"
    />
    <br /><br />
    <!-- <label for="university">University Ctrlで複数選択</label> -->
    <select
      id="university"
      name="university"
      v-model="university"
      onchange="populate(this.id, 'slct1')"
    >
      <option value="">大学を選択してください。</option>
      <option value="東京大学">東京大学</option>
      <option value="京都大学">京都大学</option>
      <option value="立命館大学">立命館大学</option>
      <option value="明治大学">明治大学</option>
    </select>
    <br /><br />
    <button class="btn" v-on:click="register">登録</button
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

<style>
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
nav,
section {
  display: block;
}
html {
  font-size: 100%;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

input:focus,
textarea:focus {
  outline: none;
}

label,
select,
button,
input[type="submit"],
input[type="radio"],
input[type="checkbox"] input[type="button"] {
  cursor: pointer;
}

a,
a:visited,
a:active {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

::selection {
  background: #ed327b;
  color: #fff;
}

::-moz-selection {
  background: #ed327b;
  color: #fff;
}

* {
  font-size: 100%;
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
body {
  background: #ecc674;
}

* {
  font-family: "Helvetica Neue", Helvetica, Arial;
}

h5 {
  text-align: center;
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.3);
}

h5 > a,
a:visited {
  color: #fff;
  text-decoration: underline;
}

h5 > a:hover {
  text-decoration: none;
}

.form {
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  padding-top: 30px;
  width: 400px;
  margin: 50px auto;
  box-shadow: 15px 15px 0px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 2.5em;
  font-weight: 700;
  color: rgb(105, 101, 101);
  margin-bottom: 24px;
}

span {
  font-weight: 200;
}

input {
  width: 100%;
  background: #f5f5f5;
  border: 0;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid #eee;
}

.btn {
  position: relative;
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  border: 0;
  background: #f26964;
  font-size: 1.2em;
  color: #fff;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 0px #c1524e;
}

.btn:active {
  top: 3px;
  box-shadow: none;
}
h6 {
  text-align: center;
  padding: 20px;
  padding-top: 35px;
  color: #777;
  cursor: pointer;
}
</style>
