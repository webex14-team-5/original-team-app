<template>
  <button v-on:click="good">いいね！</button>
</template>

<script>
import { collection, addDoc } from "@firebase/firestore"
import { db } from "/firebase"
import uid from "@/components/LoginComponents.vue"

export default {
  props: ["uid"],
  method: {
    good() {
      console.log("start")
      console.log(this.uid)
      addDoc(collection(db, "users", uid), {
        starPost: "のあー！",
      })
      console.log("succuss")
    },
  },
}
</script>
