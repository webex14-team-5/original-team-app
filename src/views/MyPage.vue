<template>
  <section>
    <Login @loginUid="uid = $event" @userData="userData = $event" />
  </section>
  <section>
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
import { getDoc, getDocs, doc, collection } from "@firebase/firestore"
import { db } from "/firebase"

export default {
  props: ["uId"],
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
  async created() {
    const userDataGet = await getDoc(doc(db, "users", this.uId))
    const userData = userDataGet.data()
    this.Username = userData.nickName
    this.myUniversities = userData.myUniversity
    this.favShops = userData.starPost
    // 店の情報
    const shopsDataGet = await getDocs(collection(db, "shops"))
    const shopsData = shopsDataGet.data()
    shopsData.docs.forEach((doc) => {
      const aShopData = [
        doc.data().name,
        doc.data().address,
        doc.data().genre.name,
      ]
      this.favShops.push(aShopData)
    })
  },
}
</script>
