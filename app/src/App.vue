<script setup lang="ts">
  import { onMounted, ref } from 'vue';
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
  <div class="flex justify-center items-center h-screen w-screen">
    <Input />
  </div>
  <LoadingOverlay v-if="progress < 1" :progress="progress" />
</template>
