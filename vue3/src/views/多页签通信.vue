<template>
  <div class="storage">
    <h3>当前的localStorage:</h3>
    <pre>{{storageData}}</pre>
    <pre class="log">{{log}}</pre>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onUnmounted, ref } from 'vue';

interface StorageData {
  key: string;
  value: string | null;
}
export default defineComponent({
  setup() {
    localStorage.setItem('name', '陈明旭');
    localStorage.setItem('age', '28');
    const storageData = ref<StorageData[]>([]);
    const log = ref<string[]>([]);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) as string;
      const value = localStorage[key];
      storageData.value.push({
        key,
        value,
      });
    }
    const handleStorageChange = (e: StorageEvent) => {
      if (e.newValue && e.oldValue) {
        log.value.push(`${e.key}的值从'${e.oldValue}'变为了'${e.newValue}'`);
        const changedStorage = storageData.value.find((storage) => storage.key === e.key);
        if (changedStorage) {
          changedStorage.value = localStorage.getItem(e.key as string);
        }
      } else if (e.oldValue && !e.newValue) {
        const changedStorageIndex = storageData.value.findIndex((storage) => storage.key === e.key);
        storageData.value.splice(changedStorageIndex);
        log.value.push(`${e.key}被删除了`);
      } else if (!e.oldValue && e.newValue) {
        storageData.value.push({
          key: e.key as string,
          value: e.newValue,
        });
        log.value.push(`新增了${e.key}, 值是'${e.newValue}'`);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    onUnmounted(() => {
      window.removeEventListener('storage', handleStorageChange);
    });
    return {
      storageData,
      handleStorageChange,
      log,
    };
  },
});
</script>

<style lang='stylus' scoped>
.storage
  height 100vh
  overflow-x hidden
  font-size 48px
  .log
    margin-top 20px
    color red
</style>