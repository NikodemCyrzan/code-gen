<script setup lang="ts">
  import { javascript } from '@codemirror/lang-javascript';
  import { Codemirror } from 'vue-codemirror';
  import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { ref } from 'vue';

  const props = defineProps({
    code: String
  });

  const showSuccessCopyIcon = ref(false);
  const copyTimeout = ref();

  const extensions = [javascript()];

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
</script>

<template>
  <div
    class="max-w-[1000px] w-full overflow-hidden max-h-[70vh] overflow-y-auto custom-scroll relative"
  >
    <button
      class="sticky top-1 left-full right-1 rounded bg-surface-bright h-9 text-secondary z-10 flex gap-4 justify-center items-center p-4"
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
