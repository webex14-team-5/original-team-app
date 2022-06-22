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
    }
  },
  methods: {
    async show() {
      console.log("show start")
      // user 情報の反映
      const userDataGet = await getDoc(doc(db, "users", this.uid))
      const userData = userDataGet.data()
      this.myUniversities = userData.myUniversity
      this.favShops = Object.values(userData.starPost)
      this.UserName = userData.nickName
      // 店の情報の取得
      console.log("shops start")
      for (let i = 0; i < this.favShops.length; i++) {
        console.log("loop" + String(i))
        // const document = this.favShops[i]
        const shopsDataGet = await getDoc(db, "shops", "J000760558")
        const shopsData = shopsDataGet.data()
        console.log(shopsDataGet)
        const aShopData = [
          shopsData.name,
          shopsData.address,
          shopsData.genre.name,
        ]
        // shopsData.docs.forEach((doc) => {
        //   const aShopData = [
        //     doc.data().name,
        //     doc.data().address,
        //     doc.data().genre.name,
        //   ]
        //   this.favShops.push(aShopData)
        // })
        this.favShops.push(aShopData)
      }
      console.log(this.favShops)
    },
  },
}
</script>
