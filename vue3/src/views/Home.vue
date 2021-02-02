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
import { arrToObj } from '@/utils/util';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const testarr = [
      {
        name: '陈明旭',
        age: 28,
      },
      {
        name: '沈诚露',
        age: 28,
      },
    ];
    console.log(arrToObj(testarr, 'name'));
    const refRoutes = ref<RouteRecordRaw[]>(routes.slice(1, routes.length));
    const router = useRouter();
    const handleCallClick = (path: string) => {
      router.push({
        path,
      });
    };
    onMounted(async () => {});
    return {
      refRoutes,
      handleCallClick,
    };
  },
});
</script>

<style lang="stylus" scoped></style>
