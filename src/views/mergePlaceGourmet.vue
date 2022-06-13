<template>
  <div>
    {{ a }}
  </div>
  <GourmetApi></GourmetApi>
</template>

<script>
import GourmetApi from "@/views/gourmetApi.vue"

export default {
  components: { GourmetApi },
  data() {
    return {
      shopData: { results: { shop: [{ name: "あ" }] } },
      shopName: "",
      // 「 numbers 件目の店」
      numbers: "",
      // 条件合致する店が存在するかどうか
      a: "",
    }
  },
}
</script>
