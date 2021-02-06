<template>
  <div class="sign">
    <div>
      <canvas width=""></canvas>
      <div>
        <van-button plain
          type="danger"
          round
          @click="clearCanvas">清空写字板
        </van-button>
        <van-button plain
          type="primary"
          round
          :class="{disabled: preDisabled}"
          @click="prev">上一步
        </van-button>
        <van-button plain
          type="primary"
          round
          @click="next">下一步
        </van-button>
        <van-button plain
          type="success"
          round
          @click="clearCanvas"> 保存
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    let canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null;
    const imageDataArr = ref<any>([]);
    const currentIndex = ref(0);
    const ratio = 3;
    const maxMemo = 3;
    const imgData = computed(() => {
      if (currentIndex.value >= 0 && currentIndex.value < imageDataArr.value.length) {
        return imageDataArr.value[currentIndex.value];
      }
    });
    const preDisabled = computed(() => {
      return (imageDataArr.value.length < 4 && currentIndex.value < 0) || (imageDataArr.value.length >= 4 && currentIndex.value === 0);
    });
    const clearCanvas = () => {
      imageDataArr.value = [];
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    const prev = () => {
      if (canvas && ctx) {
        if (!preDisabled.value) {
          currentIndex.value--;
        }
      }
    };
    watch(currentIndex, () => {
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (imgData.value) {
          ctx.putImageData(imgData.value, 0, 0);
        }
      }
    });
    const next = () => {};
    onMounted(() => {
      canvas = document.querySelector('canvas');
      const clientWidth = Math.min(document.documentElement.clientWidth, 480);
      if (canvas) {
        canvas.width = canvas.height = Math.floor((clientWidth * 600 * ratio) / 750);
        ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = '#111';
          ctx.lineWidth = 10 * ratio;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        }
        const offsetY = canvas.getBoundingClientRect().top;
        const offsetX = canvas.getBoundingClientRect().left;
        canvas.addEventListener('touchstart', (e: TouchEvent) => {
          e.preventDefault();
          if (ctx) {
            ctx.beginPath();
            ctx.moveTo((e.targetTouches[0].pageX - offsetX) * ratio, (e.targetTouches[0].pageY - offsetY) * ratio);
          }
        });
        canvas.addEventListener('touchmove', (e: TouchEvent) => {
          e.preventDefault();
          if (ctx) {
            ctx.lineTo((e.targetTouches[0].pageX - offsetX) * ratio, (e.targetTouches[0].pageY - offsetY) * ratio);
            ctx.stroke();
          }
        });
        canvas.addEventListener('touchend', () => {
          if (canvas && ctx) {
            const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
            imageDataArr.value.push(data);
            imageDataArr.value = imageDataArr.value.slice(maxMemo * -1 - 1);
            currentIndex.value = imageDataArr.value.length - 1;
            ctx.closePath();
          }
        });
      }
    });

    return {
      clearCanvas,
      prev,
      next,
      imageDataArr,
      imgData,
      currentIndex,
      preDisabled,
    };
  },
});
</script>

<style lang='stylus' scoped>
.sign
  height 100vh
  flex-center()
  &>div
    flex 1
    margin 0 20px
  canvas
    border 1px solid #ddd
    display block
    width 600px
    height 600px
    margin 0 auto
  &>div>div
    margin-top 200px
    flex-space()
  button.disabled
    opacity 0.2
    pointer-events none
</style>