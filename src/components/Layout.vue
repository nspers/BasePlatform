<template>
  <div style="overflow-x:hidden">
    <headers></headers>
    <router-view />
  </div>
</template>

<script>
import headers from '@/components/header.vue'
export default {
    components:{headers}
};
</script>
