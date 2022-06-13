<template>
  <!--検索欄-->
  <section>
    <input class="search_word" type="text" v-model="inputText" />
    <button v-on:click="catcher">検索</button>
  </section>
  <!-- 結果表示 -->
  <section>
    <!-- 上位10件表示 -->
    <div v-for="(shop, numbers) in shopData.results.shop" :key="numbers">
      <!-- 店存在した場合で表示 -->
      <div v-if="exit">
        {{ numbers + 1 }}{{ shop.name }}
        <div class="actionGood">
          <button v-on:click="good">いいね！</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getFirestore, collection, setDoc, addDoc } from "@firebase/firestore"
import fetchJsonp from "fetch-jsonp"

export default {
  data() {
    return {
      shopData: { results: { shop: [{ name: "" }] } },
      shopName: "",
      // 「 numbers 件目の店」
      numbers: "",
      // 条件合致する店が存在するかどうか
      exit: false,
    }
  },

  methods: {
    async catcher() {
      this.shopName = this.inputText
      const res = await fetchJsonp(
        "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=ccf9680638c80665&&format=jsonp&&name=" +
          this.shopName
      )
      const data = await res.json()
      this.shopData = data
      // 条件合致する店が存在するかどうか
      if (this.shopData != "") {
        this.exit = true
      }
      /*
      名前、ジャンル、価格帯、場所、営業時間、日
      shop{[id: お店id, name: 掲載店名, name_kane: 掲載店名かな,
      logo_image: ロゴ画像, address: 住所,
      genre: お店ジャンル[code: お店ジャンルコード, name: お店ジャンル名, catch: お店ジャンルキャッチ],
      budget: ディナー予算[code: 検索用ディナー予算コード, name: 検索用ディナー予算, average: 平均ディナー予算]
      budget_memo: 料金備考, catch: お店キャッチ, urls: 店舗url,
      photo: 写真[[pc: [l, m, s], [mobile: [l, s]], open: 営業日時間]}
      */
    },
    good: function () {
      const db = getFirestore()
      setDoc(collection(db, "users", "starPost"))
        .then((res) => {
          return res.length
        })
        .then((res2) =>
          addDoc(collection(db, "users")).then((res3) => {
            res3.starPost[res2] =
              this.shopData.results.shop[Number(this.numbers)].id
          })
        )
    },
  },
}
</script>
