<template>
  <!--検索欄-->
  <section>
    <input class="search_word" type="text" v-model="inputText" />
    <button v-on:click="catcher">検索</button>
    <!-- 大学選択 -->
    <section class="search_with_univ_name">
      <label for="search_univ">大学を選んでください（規定値は"なし"）</label>
      <select name="univ" id="search_univ" v-model="univ">
        <option value="なし" selected>なし</option>
        <option value="U_tokyo">東京大学</option>
        <option value="U_kyoto">京都大学</option>
        <option value="rits_U">立命館大学</option>
        <option value="meiji_U">明治大学</option>
      </select>
    </section>
  </section>
  <!-- 結果表示 -->
  <section>
    <!-- 上位10件表示 -->
    <div v-for="(shop, numbers) in shopData.results.shop" :key="numbers">
      <!-- 店存在した場合で表示 -->
      <div v-if="exit">
        {{ numbers + 1 }}{{ shop.name }}{{ shop.id }}
        <ActionGood v-bind:uId="uid" v-bind:shop="shop" />
      </div>
    </div>
  </section>
</template>

<script>
import fetchJsonp from "fetch-jsonp"
import ActionGood from "@/components/ActionGood.vue"

export default {
  props: ["uid"],
  components: {
    ActionGood,
  },
  data() {
    return {
      shopData: { results: { shop: [{ name: "", id: "" }] } },
      shopName: "",
      // 「 numbers 件目の店」
      numbers: "",
      // 条件合致する店が存在するかどうか
      exit: false,
      lat: 35.032563,
      lng: 135.723292,
      userData: "",
      // lat...緯度 lng...経度
      // 大学の設定
      univSetting: true,
    }
  },

  methods: {
    async catcher() {
      this.shopName = this.inputText
      console.log(this.uid)
      console.log(this.univ)
      this.univSelecter()
      let res = {}
      if (this.univSetting) {
        res = await fetchJsonp(
          "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=ccf9680638c80665&&format=jsonp&&name=" +
            this.shopName +
            "&lat=" +
            String(this.lat) +
            "&lng=" +
            String(this.lng)
        )
        console.log("大学設定検索完了")
      } else {
        res = await fetchJsonp(
          "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=ccf9680638c80665&&format=jsonp&&name=" +
            this.shopName
        )
      }
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
      var associativeArrayGourmet = {}
      for (let i = 0; i < this.shopData.results.shop.length; i++) {
        const lat = this.shopData.results.shop[i].lat
        const lng = this.shopData.results.shop[i].lng
        const name = this.shopData.results.shop[i].name
        const place = String(lat) + String(lng)
        associativeArrayGourmet[place] = name
      }
      console.log(associativeArrayGourmet)
    },
    // 大学により緯度経度を設定する method
    univSelecter() {
      if (this.univ == "東京大学") {
        this.lat = 35.7126775
        this.lng = 139.7598003
      } else if (this.univ == "京都大学") {
        this.lat = 35.0262444
        this.lng = 135.7786331
      } else if (this.univ == "立命館大学") {
        this.lat = 35.0328867
        this.lng = 135.7240459
      } else if (this.univ == "明治大学") {
        this.lat = 35.6972422
        this.lng = 139.7593459
      } else {
        this.univSetting = false
      }
      console.log(this.lat)
    },
  },
}
</script>
