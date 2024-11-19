<script setup lang="ts">
  import LoadingCircle from './LoadingCircle.vue';

  const props = defineProps({
    progress: Number
  });
</script>

<template>
  <div class="flex items-center gap-5 max-w-[700px] w-full">
    <div
      class="h-10 w-full rounded-full bg-surface-bright relative overflow-hidden"
    >
      <div
        class="absolute bg-tertiary left-0 top-0 bottom-0 transition-all overflow-hidden"
        :style="{
          right: `calc(100% - ${(props.progress ?? 0) * 100}%)`
        }"
      ></div>
    </div>
    <div class="text-on-surface w-14 grow-0 relative">
      <LoadingCircle class="h-full" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {{ Math.round((props.progress ?? 0) * 100) + '%' }}
      </div>
    </div>
  </div>
</template>
