<template>
  <router-link
    :to="item.link"
    class="flex flex-row justify-start items-center gap-4 p-2 rounded-lg hover:bg-grey-100 dark:hover:bg-grey-dark-50"
    :class="
      isActive
        ? 'text-primary-300 bg-grey-100 dark:bg-grey-dark-50 dark:text-primary-dark-300'
        : undefined
    "
  >
    <div class="w-5 h-5">
      <component
        :is="{ ...item.icon }"
        :color="isActive ? (isDarkTheme ? '#FBBF24' : '#D97707') : undefined"
      />
    </div>
    <span>{{ item.title }}</span>
  </router-link>
</template>
<script>
import { mapState } from 'pinia';
import useSettingsStore from '@/stores/settings';
export default {
  name: 'AsideMenuItem',
  props: ['item', 'isActive'],
  computed: {
    isDarkTheme() {
      if (this.currentTheme !== undefined) {
        return this.currentTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    ...mapState(useSettingsStore, ['currentTheme']),
  },
};
</script>
