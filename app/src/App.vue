<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Code from './components/Code.vue';
  import Input from './components/Input.vue';
  import LoadingOverlay from './components/LoadingOverlay.vue';
  import { sendPrompt } from '@code-gen/chat';

  const progress = ref(0);
  const code = ref('');
  const language = ref('');
  const isLoadingResponse = ref(false);

  onMounted(() => {
    setTimeout(() => {
      progress.value = 0.7;
    }, 1000);

    setTimeout(() => {
      progress.value = 0.99;
    }, 2000);

    setTimeout(() => {
      progress.value = 1;
    }, 2200);
  });

  const handleSubmit = async (value: string) => {
    isLoadingResponse.value = true;
    const res = await sendPrompt(value);

    if (!res.success) {
      code.value = 'Coś poszło nie tak';
      return;
    }

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
