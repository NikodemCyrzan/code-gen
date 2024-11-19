<script setup lang="ts">
  defineProps({
    height: String
  });
</script>

<template>
  <div
    class="aspect-square overflow-hidden border-4 border-surface-bright border-t-primary border-r-primary rounded-full relative animate-spin"
    :style="{
      height: height
    }"
  ></div>
</template>
