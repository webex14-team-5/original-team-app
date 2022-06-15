<template>
  <ActionGood v-bind:uIdForActionGood="uIdForSendUid" />{{
    uIdForSendUid
  }}中間子
</template>

<script>
import ActionGood from "@/components/ActionGood.vue"

export default {
  components: {
    ActionGood,
  },
  props: ["uIdForSendUid"],
  created() {
    console.log(this.uIdForSendUid)
  },
}
</script>
