<template>
  <div
    class="no-chat"
    :style="{
      'z-index': `100`,
    }"
  >
    <p>房间号不存在</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component({
  components: {
  },
})
export default class GenalChat extends Vue {
  created() {

  }
}
</script>
<style lang="scss" scoped>

</style>
