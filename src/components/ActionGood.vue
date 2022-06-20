<template>
  <div>
    <button v-on:click="good">いいね！</button>
  </div>
</template>

<script>
import { doc, updateDoc, arrayUnion } from "@firebase/firestore"
import { db } from "/firebase"

export default {
  props: ["uId", "shopId"],
  async created() {
    // user の starPost に存在するか
    const userDataGet = await getDoc(doc(db, "users", this.uId))
    const userData = userDataGet.data()
    console.log(userData)
    const starPost = userData.starPost
    console.log(starPost)
    // user の starPost に存在しない => result = -1
    const result = starPost.lastIndexOf(this.shop.id)
    console.log("result: " + result)
    if (result == -1) {
      this.done = "いいねしてください！"
    } else {
      this.done = "いいね！しました。"
    }
  },
  methods: {
    good() {
      console.log("start")
      console.log(this.shopId)
      console.log(this.uId)
      updateDoc(doc(db, "users", this.uId), {
        starPost: arrayUnion(this.shopId),
      })
      console.log("succuss")
    },
  },
}
</script>
