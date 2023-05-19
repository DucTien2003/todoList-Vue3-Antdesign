<template>
  <div class="d-flex">
    <nav-comp></nav-comp>

    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import NavComp from "@/components/NavComp.vue";

export default {
  components: {
    NavComp,
  },
};
</script>

<style scoped>
.main {
  min-height: 100vh;
  flex: 1;
}
</style>
