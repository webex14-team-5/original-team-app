<template></template>

<script>
fetch("https://webservice.recruit.co.jp/hotpepper/shop/v1/")
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    imageElement.src = data.message // 画像を表示する
  })
</script>
