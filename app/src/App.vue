<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Code from './components/Code.vue';
  import Input from './components/Input.vue';
  import LoadingOverlay from './components/LoadingOverlay.vue';
  import { addListener, getChat } from '@code-gen/chat';

  const progress = ref(0);
  const code = ref('');

  onMounted(() => {
    addListener('loading', (report) => {
      progress.value = report.progress;
    });
  });

  const handleSubmit = async (value: string) => {
    const chat = await getChat();

    const res = await chat.sendPrompt(value);
    code.value = res;
  };
</script>

<template>
  <div
    class="flex flex-col gap-10 justify-center items-center h-screen w-screen"
  >
    <Code v-if="code.length > 0" :code="code" />
    <Input @submit-prompt="handleSubmit" />
  </div>
  <LoadingOverlay v-if="progress < 1" :progress="progress" />
</template>
