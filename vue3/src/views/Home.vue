<template>
  <div class="home">
    <van-cell-group>
      <van-cell v-for="route of refRoutes"
        :key="route.path"
        :title="route.meta.title"
        :label="route.meta.description"
        @click="handleCallClick(route.path)">
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import routes from '../router/routes';
import { RouteRecordRaw, useRouter } from 'vue-router';
import createMessage from '@/plugins/message/createMessage';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const refRoutes = ref<RouteRecordRaw[]>(routes.slice(1, routes.length));
    const router = useRouter();
    const handleCallClick = (path: string) => {
      router.push({
        path,
      });
    };
    onMounted(async () => {
      // const allWWopenData = document.querySelectorAll('ww-open-data');
      // const sleep = (ms) =>
      //   new Promise((resolve) => {
      //     setTimeout(resolve, ms);
      //   });
      // if (allWWopenData.length > 1000) {
      //   for (let i = 0; i < Math.ceil(allWWopenData.length / 1000); i++) {
      //     await sleep(500);
      //     console.log(Array.from(allWWopenData).slice(i * 1000, i * 1000 + 1000));
      //   }
      // }
      createMessage({
        duration: 3,
      });
    });
    return {
      refRoutes,
      handleCallClick,
    };
  },
});
</script>

<style lang="stylus" scoped></style>
