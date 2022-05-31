<template>
  <div>{{ shopinformation }}</div>
</template>

<script>
fetch("https://webservice.recruit.co.jp/hotpepper/shop/v1/")
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    const shopInformation = data.shop
    /*
    shop[id: お店id,
    name: 掲載店名, name_kane: 掲載店名かな,
    address: 住所, genre: お店ジャンル[name: お店ジャンル名],
    urls: 店舗URL[pc: PC向けURL],
    desc: 詳細フラグ, 1の場合グルメサーチAPI対象店舗]
    */
  })
fetch("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/")
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    const shopInformation = data.shop
    /*
    名前、ジャンル、価格帯、場所、営業時間、日
    shop[id: お店id, name: 掲載店名, name_kane: 掲載店名かな,
    logo_image: ロゴ画像, address: 住所,
    genre: お店ジャンル[code: お店ジャンルコード, name: お店ジャンル名, catch: お店ジャンルキャッチ],
    budget: ディナー予算[code: 検索用ディナー予算コード, name: 検索用ディナー予算, average: 平均ディナー予算]
    budget_memo: 料金備考, catch: お店キャッチ, urls: 店舗url,
    photo: 写真[[pc: [l, m, s], [mobile: [l, s]], open: 営業日時間]
    */
  })
export default {
  props: {
    shopInformation,
  },
}
</script>
