<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Code from './components/Code.vue';
  import Input from './components/Input.vue';
  import LoadingOverlay from './components/LoadingOverlay.vue';
  import { addListener, getChat } from '@code-gen/chat';

  const progress = ref(0);
  const code = ref('');
  const language = ref('');
  const isLoadingResponse = ref(false);

  onMounted(() => {
    addListener('loading', (report) => {
      progress.value = report.progress;
    });
  });

  const handleSubmit = async (value: string) => {
    const chat = await getChat();

    isLoadingResponse.value = true;
    const res = await chat.sendPrompt(value);

    code.value = res.code;
    language.value = res.language;
    isLoadingResponse.value = false;
  };
</script>

<template>
  <div
    class="flex flex-col gap-10 justify-center items-center h-screen w-screen p-5"
  >
    <Code v-if="code.length > 0" :code="code" :language="language" />
    <Input @submit-prompt="handleSubmit" :is-loading="isLoadingResponse" />
  </div>
  <LoadingOverlay v-if="progress < 1" :progress="progress" />
</template>
