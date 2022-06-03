<template>
  <!--検索欄-->
  <section>
    <input class="search_word" type="text" v-model="message" />
    <button v-on:click="searchWithWord">検索</button>
  </section>
  <!-- 結果表示 -->
  <section>
    {{ shopData }}
  </section>
</template>

<script src="https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=ccf9680638c80665&&format=jsonp&&callback=tester&&name= +
        this.shopName"></script>

<script>
import fetchJsonp from "fetch-jsonp"

const tester = function (data) {
  console.log(data)
}

export default {
  data() {
    return {
      shopData: [],
      shopName: "",
    }
  },
  async mounted() {
    const res = await fetchJsonp(
      "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=ccf9680638c80665&&format=jsonp&&callback=" +
        tester +
        "&&name=" +
        this.shopName
    )
    const data = await res.json()
    this.shopData = data
    /*
    名前、ジャンル、価格帯、場所、営業時間、日
    shop[id: お店id, name: 掲載店名, name_kane: 掲載店名かな,
    logo_image: ロゴ画像, address: 住所,
    genre: お店ジャンル[code: お店ジャンルコード, name: お店ジャンル名, catch: お店ジャンルキャッチ],
    budget: ディナー予算[code: 検索用ディナー予算コード, name: 検索用ディナー予算, average: 平均ディナー予算]
    budget_memo: 料金備考, catch: お店キャッチ, urls: 店舗url,
    photo: 写真[[pc: [l, m, s], [mobile: [l, s]], open: 営業日時間]
    */
  },
  methods: {
    searchWithWord: function () {
      this.shopName = this.message
    },
    tester: function (data) {
      console.log(data)
    },
  },
}
</script>
