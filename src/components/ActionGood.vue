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
