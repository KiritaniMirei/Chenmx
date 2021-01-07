<template>
  <div class='directives'>
    <van-cell title="复制指令："
      class="name"></van-cell>
    <div v-copy="copyText"
      class="van-collapse-item__content">
      {{copyText}}
    </div>
    <van-cell title="长按指令："
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
        v-filterspace
        @input="test">
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const copyText = ref('沈诚露沈诚露沈诚露沈诚露沈诚露');
    const handleLongpress = (e: Event) => {
      e.preventDefault();
      alert('长按了');
    };
    const spaceTest = ref('');
    const test = () => {
      console.log(spaceTest.value);
    };
    return {
      copyText,
      handleLongpress,
      spaceTest,
      test,
    };
  },
});
</script>

<style lang='stylus' scoped>
.directives
  .name
    font-size 48px
</style>