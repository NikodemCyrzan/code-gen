<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Code from './components/Code.vue';
  import Input from './components/Input.vue';
  import LoadingOverlay from './components/LoadingOverlay.vue';
  import { addListener } from '@code-gen/chat';

  const progress = ref(0);

  onMounted(() => {
    addListener('loading', (report) => {
      progress.value = report.progress;
    });
  });
</script>

<template>
  <div
    class="flex flex-col gap-10 justify-center items-center h-screen w-screen"
  >
    <Code />
    <Input />
  </div>
  <LoadingOverlay v-if="progress < 1" :progress="progress" />
</template>
