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
          @click="clearCanvas">上一步
        </van-button>
        <van-button plain
          type="success"
          round
          @click="clearCanvas">确定保存
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  setup() {
    let canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null;
    const clearCanvas = () => {
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    onMounted(() => {
      canvas = document.querySelector('canvas');
      const clientWidth = Math.min(document.documentElement.clientWidth, 480);
      if (canvas) {
        canvas.width = canvas.height = Math.floor((clientWidth * 600) / 750);
        ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = '#111';
          ctx.lineWidth = 10;
          ctx.lineCap = 'round';
        }
        const offsetY = canvas.getBoundingClientRect().top;
        const offsetX = canvas.getBoundingClientRect().left;
        canvas.addEventListener('touchstart', (e: TouchEvent) => {
          e.preventDefault();
          if (ctx) {
            ctx.beginPath();
            ctx.moveTo(e.targetTouches[0].pageX - offsetX, e.targetTouches[0].pageY - offsetY);
          }
        });
        canvas.addEventListener('touchmove', (e: TouchEvent) => {
          e.preventDefault();
          if (ctx) {
            ctx.lineTo(e.targetTouches[0].pageX - offsetX, e.targetTouches[0].pageY - offsetY);
            ctx.stroke();
          }
        });
        canvas.addEventListener('touchend', () => {
          if (ctx) {
            console.log(ctx.getImageData(0, 0, (canvas as HTMLCanvasElement).width, (canvas as HTMLCanvasElement).height));
            ctx.closePath();
          }
        });
      }
    });

    return {
      clearCanvas,
    };
  },
});
</script>

<style lang='stylus' scoped>
.sign
  height 100vh
  flex-center()
  canvas
    border 1px solid #ddd
    display block
  &>div>div
    margin-top 100px
    flex-space()
</style>