<template>
  <transition name="fade-down"
    appear>
    <div class="message"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseleave"
      v-if="isVisible">
      <div class="message-icon-wrap">
        <div class="limit-bar"
          ref="limitBar"
          :style=animationDuration>
        </div>
        <span class="iconfont"
          :class="iconType"></span>
      </div>
      <div class="message-content"
        :class="type">
        <div>
          {{message}}
        </div>
      </div>
      <div class="message-action"
        v-if="closable">
        <div class="iconfont icon-chahao"></div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
export default defineComponent({
  props: {
    duration: {
      type: Number,
      default: 3,
    },
    message: {
      type: [String, Object],
      default: '默认信息默认信息默认信息默认信',
    },
    type: {
      type: String,
      default: 'success',
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['timeup'],
  setup(props, context) {
    const isVisible = ref(true);
    const limitBar = ref();
    const animatePlayState = ref('running');
    const animationDuration = computed(() => {
      return {
        'animation-duration': `${props.duration}s`,
        'animation-play-state': animatePlayState.value,
      };
    });
    const iconType = computed(() => {
      let className;
      switch (props.type) {
        case 'success':
          className = 'icon-duihao';
          break;
        case 'error':
          className = 'icon-chahao';
          break;
        case 'warn':
          className = 'icon-tanhao';
          break;
        default:
          className = 'icon-duihao';
      }
      return className;
    });
    const handleMouseenter = () => {
      animatePlayState.value = 'paused';
    };
    const handleMouseleave = () => {
      animatePlayState.value = 'running';
    };
    function handleAnimationEnd() {
      isVisible.value = false;
      context.emit('timeup');
    }
    onMounted(() => {
      limitBar.value.addEventListener('animationend', handleAnimationEnd);
    });
    onBeforeUnmount(() => {
      limitBar.value.removeEventListener('animationend', handleAnimationEnd);
    });
    return {
      isVisible,
      limitBar,
      animationDuration,
      animatePlayState,
      handleMouseenter,
      handleMouseleave,
      iconType,
    };
  },
  data() {
    return {
      successColor: '#52c41a',
      successContentColor: '#ecfbe4',
    };
  },
});
</script>

<style lang='stylus' scoped>
.message
  width 800px
  height 120px
  border-radius 6px
  overflow hidden
  fixed top 80px left right
  margin 0 auto
  z-index 9
  box-shadow 0 4px 12px rgba(0, 0, 0, 0.15)
  background v-bind(successContentColor)
  flex-space()
  .message-icon-wrap
    width 100px
    height 100%
    background v-bind(successColor)
    position relative
    flex-center()
    .iconfont
      font-size 16px
      color #fff
      z-index 0
  .message-content
    flex 1
    height 100%
    font-size 14px
    font-size 14px
    line-height 1.4
    padding 0 32px
    flex-start()
    &>div
      line-clamp()
  .limit-bar
    absolute bottom 0
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.25)
    animation countdown 3s 1 0.2s linear forwards
  .message-action
    width 50px
    height 100%
    padding-right 20px
    flex-center()
    .iconfont
      font-size 12px
.fade-down-enter-active, .fade-down-leave-active
  transition all 0.3s ease
.fade-down-enter-from, .fade-down-leave-to
  opacity 0
  transform translateY(-100px)
@keyframes countdown
  to
    height 0
</style>