<template>
  <div>a{{ shopInformation }}</div>
</template>

<script>
export default {
  props: {
    shopName: {
      default: "o",
    },
  },
  data() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "no-cors",
      },
    }
  },

  async mounted() {
    console.log("start to fetch!")
    const data = await fetch(
      "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=ccf9680638c80665&name=" +
        this.shopName,
      this.headers
    )
    console.log("fetched!")
    const json = await data.json()
    this.shopInformation = json.shop
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
}
</script>
