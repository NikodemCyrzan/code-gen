<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue';
  import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import LoadingCircle from './LoadingCircle.vue';

  const props = defineProps({
    isLoading: Boolean
  });

  const emit = defineEmits<{
    (e: 'submit-prompt', value: string): void;
  }>();

  const inputValue = ref('');
  const height = ref('auto');

  const textarea = useTemplateRef('textarea');
  const hidden = useTemplateRef('hidden');

  const handleInput = () => {
    if (textarea && hidden) {
      height.value = hidden.value?.clientHeight
        ? hidden.value?.clientHeight + 'px'
        : 'auto';
    }
  };

  const handleSummit = () => {
    emit('submit-prompt', inputValue.value.trim());
    inputValue.value = '';
    height.value = 'auto';
  };

  const handleKeyDown = (payload: KeyboardEvent) => {
    if (payload.key === 'Enter' && !payload.shiftKey) {
      handleSummit();
      payload.preventDefault();
      return;
    }
  };
</script>

<template>
  <div
    class="flex px-6 py-4 text-on-surface rounded-[30px] bg-surface-bright w-full max-w-[700px] gap-3 items-end"
  >
    <pre
      ref="hidden"
      class="fixed pointer-events-none opacity-0"
      v-html="inputValue.replace(/\n/g, '\n.')"
    ></pre>
    <textarea
      class="bg-transparent resize-none w-full outline-none placeholder:text-on-surface-variant max-h-72 custom-scroll break-all"
      v-model="inputValue"
      ref="textarea"
      placeholder="Wyślij wiadomość do Code Gen"
      :style="{ height: height }"
      @keydown="handleKeyDown"
      @input="handleInput"
      rows="1"
    ></textarea>
    <LoadingCircle v-if="props.isLoading" class="h-6" />
    <button
      v-if="!props.isLoading"
      title="send prompt"
      type="button"
      class="h-6 aspect-square relative rounded-full"
      :style="{
        color: inputValue.trim().length <= 0 ? '#15130b' : '#dbc66e'
      }"
      @click="handleSummit"
    >
      <FontAwesomeIcon :icon="faPaperPlane" />
    </button>
  </div>
</template>
