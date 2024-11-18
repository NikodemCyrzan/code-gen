<script setup lang="ts">
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
        class="absolute bg-secondary left-0 top-0 bottom-0 transition-all overflow-hidden"
        :style="{
          right: `calc(100% - ${(props.progress ?? 0) * 100}%)`
        }"
      ></div>
    </div>
    <div class="text-on-surface w-14 grow-0">
      {{ Math.round(props.progress ?? 0 * 100) + '%' }}
    </div>
  </div>
</template>
