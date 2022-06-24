<template>
  <section>
    <Login @loginUid="uid = $event" @userData="userData = $event" />
  </section>
  <section>
    <button v-on:click="show">表示する</button>
    <div>your name: {{ this.UserName }}</div>
    <div>your fav Univ. : {{ this.myUniversities }}</div>
    <div>
      your fav shops :
      <div v-for="(shop, numbers) in favShops" :key="numbers">
        {{ shop }}
      </div>
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
      this.myUniversities = userData.myUniversity
      this.favShopsId = Object.values(userData.starPost)
      this.UserName = userData.nickName
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
