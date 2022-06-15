<template>
  <div>
    <button v-on:click="good">いいね！</button>{{ uIdForActionGood }}宇宙間子{{
      this.uid
    }}
  </div>
  <div><button v-on:click="goodNess">よい</button></div>
</template>

<script>
import { doc, setDoc } from "@firebase/firestore"
import { db } from "/firebase"

export default {
  props: ["uIdForActionGood"],
  methods: {
    good() {
      console.log("start")
      console.log(this.uIdForActionGood)
      setDoc(doc(db, "users", this.uIdForActionGood), {
        starPost: "のあー！のあー！grid...",
      })
      console.log("succuss")
    },
    goodNess() {
      console.log("よい")
    },
  },
}
</script>
