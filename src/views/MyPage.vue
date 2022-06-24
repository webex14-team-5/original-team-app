<template>
  <section>
    <Login @loginUid="uid = $event" @userData="userData = $event" />
  </section>
  <section class="my-page">
    <button class="btn btn--cubic btn--orange btn--shadow" v-on:click="show">
      表示する
    </button>
    <div>
      <h7>ニックネーム</h7>
      <h4>{{ this.UserName }}</h4>
    </div>
    <div>
      <h7>大学</h7>
      <h4>
        <div v-for="(univ, numbers) in myUniversities" :key="numbers">
          {{ univ }}
        </div>
      </h4>
    </div>
    <div>
      <h7>いいねしたお店</h7>
      <h4>
        <div v-for="(shop, numbers) in favShops" :key="numbers">
          店名：{{ shop[0] }}<br />ジャンル：{{ shop[2] }} <br />住所：{{
            shop[1]
          }}
        </div>
      </h4>
    </div>
  </section>
</template>

<script>
import Login from "@/components/LoginComponents.vue"
import { getDoc, doc } from "@firebase/firestore"
import { db } from "/firebase"

export default {
  components: {
    Login,
  },
  data() {
    return {
      UserName: "",
      myUniversities: [],
      favShops: [],
      favShopsId: [],
    }
  },
  methods: {
    async show() {
      console.log("show start")
      // user 情報の反映
      const userDataGet = await getDoc(doc(db, "users", this.uid))
      const userData = userDataGet.data()
      this.favShopsId = Object.values(userData.starPost)
      this.UserName = userData.nickName
      // 大学名の処理
      this.myUniversities = userData.myUniversity
      // 店の情報の取得
      console.log("shops start")
      for (let i = 0; i < this.favShopsId.length; i++) {
        console.log("loop" + String(i))
        // const document = this.favShops[i]
        const shopsDataGet = await getDoc(doc(db, "shops", this.favShopsId[i]))
        const shopsData = shopsDataGet.data()
        console.log(shopsDataGet)
        const aShopData = [shopsData.name, shopsData.address, shopsData.genre]
        this.favShops.push(aShopData)
        console.log("loop" + String(i) + " end")
      }
      console.log(this.favShops)
    },
  },
}
</script>

<style>
.my-page {
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  padding-top: 30px;
  width: 70%;
  margin: 50px auto;
  box-shadow: 15px 15px 0px rgba(0, 0, 0, 0);
  float: left;
}
h4 {
  text-align: center;
  padding: 10px;
  color: black;
  cursor: pointer;
  font-size: 1.5rem;
}
h7 {
  text-align: center;
  font-size: 1.5em;
  font-weight: 700;
  color: rgb(105, 101, 101);
  padding-top: 0.5rem;
}
</style>
