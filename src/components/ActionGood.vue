<template>
  <div>
    <button v-on:click="good">いいね！</button>
  </div>
</template>

<script>
import { doc, setDoc, updateDoc, arrayUnion } from "@firebase/firestore"
import { db } from "/firebase"

export default {
  props: ["uId", "shop"],
  methods: {
    good() {
      console.log("start")
      console.log(this.shop)
      console.log(this.uId)
      updateDoc(doc(db, "users", this.uId), {
        starPost: arrayUnion(this.shop.id),
      })
      setDoc(doc(db, "shops", this.shop.id), {
        address: this.shop.address,
        budget: this.shop.budget.name,
        genre: this.shop.genre.name,
        name: this.shop.name,
        open: this.shop.open,
      })
      console.log("succuss")
    },
  },
}
</script>
