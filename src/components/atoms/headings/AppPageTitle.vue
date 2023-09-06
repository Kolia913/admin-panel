<template>
  <h2
    class="self-start text-2xl sm:text-3xl font-bold tracking-tight text-gray-950 dark:text-white"
  >
    {{ text }}
  </h2>
</template>
<script>
export default {
  name: 'AppPageTitle',
  props: ['text'],
};
</script>
