<template>
  <div>
    <button class="btn btn--cubic btn--red btn--shadow" v-on:click="good">
      {{ this.count }}いいね</button
    ><br />
    <h3>{{ this.done }}</h3>
  </div>
</template>

<script>
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  collection,
} from "@firebase/firestore"
import { db } from "/firebase"

export default {
  props: ["uId", "shop"],
  data() {
    return {
      count: 0,
      done: "いいねしてください！",
    }
  },
  async created() {
    // user の starPost に存在するか
    const userDataGet = await getDoc(doc(db, "users", this.uId))
    const userData = userDataGet.data()
    console.log(userData)
    const starPost = userData.starPost
    console.log(starPost)
    console.log(this.shop.id)
    // user の starPost に存在しない => result = -1
    const result = starPost.lastIndexOf(this.shop.id)
    console.log("result: " + result)
    if (result == -1) {
      this.done = "いいねしてください！"
    } else {
      this.done = "いいね！しました。"
    }
    // いいね数の反映
    // いいねされた店リストにあるか
    let exist = false
    let countOfGood = 0
    console.log("start")
    console.log(this.shop)
    console.log(this.uId)
    // ドキュメントidを取得
    const q = query(collection(db, "shops"))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.id == this.shop.id) {
        // いいねされた店にある
        exist = true
        countOfGood = doc.data().countGood
        console.log(doc.data().countGood)
      }
    })
    if (exist) {
      console.log("exist")
      this.count = countOfGood
    }
  },
  methods: {
    async good() {
      // いいねされた店リストにあるか
      let exist = false
      console.log("start")
      console.log(this.shop)
      console.log(this.uId)
      // ドキュメントidを取得
      const q = query(collection(db, "shops"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.id == this.shop.id) {
          // いいねされた店にある
          exist = true
        }
      })
      // user の starPost に存在するか
      const userDataGet = await getDoc(doc(db, "users", this.uId))
      const userData = userDataGet.data()
      console.log(userData)
      const starPost = userData.starPost
      console.log(starPost)
      // user の starPost に存在しない => result = -1
      const result = starPost.lastIndexOf(this.shop.id)
      console.log("result: " + result)
      // user の starPost[] に shop.id を追加
      updateDoc(doc(db, "users", this.uId), {
        starPost: arrayUnion(this.shop.id),
      })
      // いいねされた店リストに追加
      if (exist != true) {
        setDoc(doc(db, "shops", this.shop.id), {
          address: this.shop.address,
          budget: this.shop.budget.name,
          genre: this.shop.genre.name,
          name: this.shop.name,
          open: this.shop.open,
          countGood: 1,
        })
        this.done = "いいね！ありがとう"
        this.count += 1
        console.log("初期設定")
      } // countGood を +1 する
      else if (result == -1) {
        const shopData = await getDoc(doc(db, "shops", this.shop.id))
        const shopDataNew = shopData.data()
        shopDataNew.countGood += 1
        console.log(shopDataNew.countGood)
        const countGoodNew = shopDataNew.countGood
        updateDoc(doc(db, "shops", this.shop.id), {
          countGood: countGoodNew,
        })
        console.log("いいね追加")
      }
      console.log("succuss")
    },
  },
}
</script>
<style>
h3 {
  text-align: center;
  font-size: 1.5em;
  font-weight: 700;
  color: rgb(105, 101, 101);
  margin-bottom: 24px;
}
</style>
