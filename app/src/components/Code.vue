<script setup lang="ts">
  import { javascript } from '@codemirror/lang-javascript';
  import { Codemirror } from 'vue-codemirror';

  const props = defineProps({
    code: String
  });

  const extensions = [javascript()];
</script>

<template>
  <div class="max-w-[1000px] w-full overflow-hidden">
    <Codemirror
      v-model="props.code"
      :extensions="extensions"
      :disabled="true"
    />
  </div>
</template>
