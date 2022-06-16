<template>
  <div><button v-on:click="good">いいね！</button>{{ uId }}</div>
  <div><button v-on:click="goodNess">よい</button></div>
</template>

<script>
import { doc, setDoc } from "@firebase/firestore"
import { db } from "/firebase"

export default {
  props: ["uId"],
  methods: {
    good() {
      console.log("start")
      console.log(this.uId)
      setDoc(doc(db, "users", this.uId), {
        starPost: "のあー！のあー！uid2...",
      })
      console.log("succuss")
    },
    goodNess() {
      console.log("よい")
    },
  },
}
</script>
