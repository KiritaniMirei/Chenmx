<template>
  <div class="home">
    <van-cell-group>
      <van-cell v-for="route of refRoutes"
        :key="route.path"
        :title="route.meta.title"
        :label="route.meta.description"
        @click="handleCellClick(route.path)">
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import routes from '../router/routes';
import { RouteRecordRaw, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const refRoutes = ref<RouteRecordRaw[]>(routes.slice(1, routes.length));
    const router = useRouter();
    const handleCellClick = (path: string) => {
      router.push({
        path,
      });
    };
    return {
      refRoutes,
      handleCellClick,
    };
  },
});
</script>

<style lang="stylus" scoped></style>
