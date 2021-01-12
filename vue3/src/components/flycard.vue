<template>
  <div class='flycard-container'>
    <div class="card-wrap"
      :style="{'width': pxToRem(cardWidth), 'height': pxToRem(cardHeight)}">
      <div class="card"
        v-for="(item,index) of 4"
        :key="index"
        :class="{'animation': isAnimating}"
        :style="{'width': pxToRem(cardInfoList[index].width), 'height': pxToRem(cardInfoList[index].height), 'top': cardInfoList[index].top, 'left': cardInfoList[index].left, 'opacity': cardInfoList[index].opacity, 'z-index': 4 - index}"
        @touchstart="handleTouchstart($event, index)"
        @touchmove="handleTouchmove"
        @touchend="handleTouchend"
        @touchcancel="handleTouchend">
        <slot :name="`card${item}`"></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';

interface CardInfo {
  width: number;
  height: number;
  top: string;
  left: string;
  opacity?: number;
}
type DragDirection = 'all' | 'vertical' | 'horizontal';

export default defineComponent({
  props: {
    // 默认卡片宽度
    cardWidth: {
      type: Number,
      default: 480,
    },
    // 默认卡片高度
    cardHeight: {
      type: Number,
      default: 480,
    },
    // 卡片层叠的横向边距
    leftPad: {
      type: Number,
      default: 10,
    },
    // 卡片层叠的纵向边距
    topPad: {
      type: Number,
      default: 6,
    },
    // 卡片拖拽方向
    dragDirection: {
      type: String as PropType<DragDirection>,
      default: 'all',
    },
    // 卡片触发飞卡效果的距离
    throwTriggerDistance: {
      type: Number,
      default: 100,
    },
  },
  emits: ['drag-start', 'drag-move', 'drag-end', 'throw-end', 'card-back'],
  setup(props, context) {
    const startTop = ref(0);
    const startLeft = ref(0);
    const isAnimating = ref(false);
    const isDrag = ref(false);
    const isThrow = ref(false);
    const isBack = ref(false);
    const cardInfoList = ref<CardInfo[]>([
      {
        width: 0,
        height: 0,
        top: '',
        left: '',
      },
      {
        width: 0,
        height: 0,
        top: '',
        left: '',
      },
      {
        width: 0,
        height: 0,
        top: '',
        left: '',
      },
      {
        width: 0,
        height: 0,
        top: '',
        left: '',
      },
    ]);
    const left = computed(() => +cardInfoList.value[0].left.replace(/[^\d.-]/g, ''));
    const top = computed(() => +cardInfoList.value[0].top.replace(/[^\d.-]/g, ''));
    const pxToRem = (px: number) => {
      return px / 40 + 'rem';
    };
    const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
      const x = Math.abs(x1 - x2);
      const y = Math.abs(y1 - y2);
      return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };
    const resetCardState = () => {
      cardInfoList.value.splice(4, cardInfoList.value.length - 4);
      cardInfoList.value.forEach((card, index) => {
        card.width = props.cardWidth - props.leftPad * index * 2;
        card.height = props.cardHeight - props.topPad * index * 2;
        card.top = pxToRem(props.topPad * index * 3.2);
        card.left = pxToRem(props.leftPad * index);
        card.opacity = index === 3 ? 0 : 1;
      });
    };

    const handleTouchstart = (e: TouchEvent, index: number) => {
      if (index !== 0 || isAnimating.value) {
        return;
      }
      isDrag.value = true;
      isBack.value = false;
      isThrow.value = false;
      const touch = e.touches[0];
      startTop.value = touch.clientY;
      startLeft.value = touch.clientX;
      context.emit('drag-start');
    };
    const handleTouchmove = (e: TouchEvent) => {
      if (isAnimating.value) {
        return;
      }
      e.preventDefault();
      const touch = e.touches[0];
      if (props.dragDirection === 'all' || props.dragDirection === 'horizontal') {
        cardInfoList.value[0].left = touch.clientX - startLeft.value + 'px';
      }
      if (props.dragDirection === 'all' || props.dragDirection === 'vertical') {
        cardInfoList.value[0].top = touch.clientY - startTop.value + 'px';
      }
      const distance = getDistance(0, 0, left.value, top.value);
      context.emit('drag-move', {
        left: left.value,
        top: top.value,
        distance,
      });
    };
    const throwCard = () => {
      isThrow.value = true;
      isBack.value = false;
      isAnimating.value = true;
      const angle = Math.atan2(top.value, left.value);
      cardInfoList.value[0].top = Math.sin(angle) * 1000 + 'px';
      cardInfoList.value[0].left = Math.cos(angle) * 1000 + 'px';
      cardInfoList.value.splice(1, 0, {
        width: props.cardWidth,
        height: props.cardHeight,
        top: '0px',
        left: '0px',
      });
      setTimeout(() => {
        isThrow.value = false;
        isAnimating.value = false;
        resetCardState();
        context.emit('throw-end');
      }, 500);
    };
    const cardBack = () => {
      isThrow.value = false;
      isBack.value = true;
      isAnimating.value = true;
      cardInfoList.value[0].top = '0px';
      cardInfoList.value[0].left = '0px';
      context.emit('card-back');
      setTimeout(() => {
        isAnimating.value = false;
        isBack.value = false;
      }, 600);
    };
    const handleTouchend = () => {
      const distance = getDistance(0, 0, left.value, top.value);
      isDrag.value = false;
      context.emit('drag-end', {
        left: left.value,
        top: top.value,
        distance,
      });
      if (isAnimating.value) {
        return;
      }
      if (distance > props.throwTriggerDistance) {
        throwCard();
      } else {
        cardBack();
      }
    };
    onMounted(() => {
      resetCardState();
    });
    return {
      cardInfoList, // 卡片状态列表
      pxToRem, // px转rem
      resetCardState, // 重置所有状态
      isAnimating, // 正在动画
      isDrag, // 正在拖拽
      isThrow, // 正在飞
      isBack, // 正在返回
      handleTouchstart, // 处理触摸屏幕
      handleTouchmove, // 处理手指移动
      handleTouchend, // 处理手指离开屏幕或者切换应用
      startTop, // 初始点距离屏幕上边距离
      startLeft, // 初始点距离屏幕左边距离
      throwCard, // 飞卡
      cardBack, // 卡片返回
      top,
      left,
    };
  },
});
</script>

<style lang='stylus' scoped>
.flycard-container
  height 100vh
  overflow hidden
  flex-center()
  .card-wrap
    position relative
    .card
      border-radius 10px
      box-shadow 0px 4px 20px rgba(0, 0, 0, 0.3)
      position absolute
      background-color #fff
      overflow hidden
    .animation
      transition all 0.4s ease-out
</style>