<script setup lang="ts">
  import { javascript } from '@codemirror/lang-javascript';
  import { Codemirror } from 'vue-codemirror';
  import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { ref } from 'vue';
  import { sql } from '@codemirror/lang-sql';
  import { json } from '@codemirror/lang-json';
  import { html } from '@codemirror/lang-html';

  const props = defineProps({
    code: { type: String, required: true },
    language: { type: String, required: true }
  });

  const showSuccessCopyIcon = ref(false);
  const copyTimeout = ref();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(props.code ?? '');
    showSuccessCopyIcon.value = true;

    if (copyTimeout.value) {
      clearTimeout(copyTimeout.value);
    }

    copyTimeout.value = setTimeout(() => {
      showSuccessCopyIcon.value = false;
    }, 1500);
  };

  const getLangaugeExtension = () => {
    switch (props.language) {
      case 'javascript':
        return javascript();
      case 'mysql':
      case 'sql':
        return sql();
      case 'json':
        return json();
      case 'html':
        return html();
      default:
        return javascript();
    }
  };

  const extensions = [getLangaugeExtension()];
</script>

<template>
  <div
    class="max-w-[1000px] w-full overflow-hidden max-h-[70vh] overflow-y-auto custom-scroll relative"
  >
    <button
      class="sticky top-1 left-full right-1 rounded bg-surface-bright h-9 text-secondary z-10 flex gap-4 justify-center items-center p-4 mb-1"
      @click="handleCopyClick"
    >
      <FontAwesomeIcon :icon="showSuccessCopyIcon ? faCheck : faCopy" />
      {{ showSuccessCopyIcon ? 'Skopiowano' : 'Kopiuj' }}
    </button>
    <Codemirror
      v-model="props.code"
      :extensions="extensions"
      :disabled="true"
    />
  </div>
</template>
