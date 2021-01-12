<template>
  <div class='directives'>
    <van-cell title="复制："
      class="name"></van-cell>
    <div v-copy="copyText"
      class="van-collapse-item__content">
      {{copyText}}
    </div>
    <van-cell title="长按："
      class="name"></van-cell>
    <div v-longpress="handleLongpress"
      class="van-collapse-item__content">
      长按2秒
    </div>
    <van-cell title="过滤空格："
      class="name"></van-cell>
    <div class="van-collapse-item__content">
      <input type="text"
        v-model="spaceTest"
        v-filterspace />
    </div>
    <van-cell title="水印："
      class="name"></van-cell>
    <div class="van-collapse-item__content">
      <div style="height: 200px;border: 1px solid #d5d5d5"
        v-watermark="{text: '沈诚露', fillStyle: 'pink'}"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const copyText = ref('如果你突然打了个喷嚏');
    const handleLongpress = (e: Event) => {
      e.preventDefault();
      alert('长按了');
    };
    const spaceTest = ref('');
    return {
      copyText,
      handleLongpress,
      spaceTest,
    };
  },
});
</script>

<style lang='stylus' scoped>
.directives
  .name
    font-size 48px
</style>