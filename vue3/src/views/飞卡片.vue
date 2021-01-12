<template>
  <div class='tantan-card'>
    <flycard @drag-move="handleDragMove"
      @throw-end="handleThrowEnd"
      @card-back="handleCardBack">
      <template #card1>
        <div class="img-wrap">
          <img :src="imgList[imgBaseIndex + 0]">
        </div>
      </template>
      <template #card2>
        <div class="img-wrap">
          <img :src="imgList[imgBaseIndex + 1]">
        </div>
      </template>
      <template #card3>
        <div class="img-wrap">
          <img :src="imgList[imgBaseIndex + 2]">
        </div>
      </template>
      <template #card4>
        <div class="img-wrap">
          <img :src="imgList[imgBaseIndex + 3]">
        </div>
      </template>
    </flycard>
    <div class="action-text"
      v-if="actionText">{{actionText}}</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import flycard from '@/components/flycard.vue';
export default defineComponent({
  components: {
    flycard,
  },
  setup() {
    const imgList = ref([
      require('@/assets/imgs/scl1.jpg'),
      require('@/assets/imgs/scl2.jpg'),
      require('@/assets/imgs/scl3.jpg'),
      require('@/assets/imgs/scl4.jpg'),
      require('@/assets/imgs/scl5.jpg'),
      require('@/assets/imgs/scl6.jpg'),
      require('@/assets/imgs/scl1.jpg'),
    ]);
    const imgBaseIndex = ref(0);
    const actionText = ref('');
    const handleDragMove = (position: any) => {
      console.log(position);
      if (position.left < -10) {
        actionText.value = '不喜欢';
      } else if (position.left > 10) {
        actionText.value = '喜欢';
      } else {
        actionText.value = '';
      }
    };
    const handleCardBack = () => {
      actionText.value = '';
    };
    const handleThrowEnd = () => {
      if (imgBaseIndex.value && imgBaseIndex.value % 5 === 0) {
        imgBaseIndex.value = 0;
      } else {
        imgBaseIndex.value++;
      }
    };
    return {
      imgList,
      imgBaseIndex,
      actionText,
      handleDragMove,
      handleCardBack,
      handleThrowEnd,
    };
  },
});
</script>

<style lang='stylus' scoped>
.tantan-card
  height 100vh
  overflow-x hidden
  .img-wrap
    height 100%
    img
      width 100%
      height 100%
      object-fit cover
  .action-text
    absolute center
    background rgba(0, 0, 0, 0.5)
    color #fff
    font-size 48px
    padding 20px 40px
    z-index 99
    pointer-events none
    border-radius 10px
</style>