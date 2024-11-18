<script setup lang="ts">
  import LoadingBar from './LoadingBar.vue';

  const props = defineProps({
    progress: Number,
    opacity: Number
  });
</script>

<template>
  <div
    class="fixed inset-0 backdrop-blur-sm backdrop-brightness-75 flex items-center justify-center"
  >
    <div class="flex flex-col items-center gap-10">
      <h1 class="text-primary text-9xl font-extrabold">Code Gen</h1>
      <div class="text-secondary text-xl">Darmowy generator kodu</div>
      <LoadingBar :progress="props.progress" />
    </div>
  </div>
</template>
