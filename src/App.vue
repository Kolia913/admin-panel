<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script>
import { RouterView } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';

import { mapState, mapActions } from 'pinia';
import useSettingsStore from '@/stores/settings';

export default {
  name: 'App',
  components: {
    MainLayout,
    EmptyLayout,
    RouterView,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout';
    },
    ...mapState(useSettingsStore, ['currentTheme']),
  },
  methods: {
    ...mapActions(useSettingsStore, ['changeTheme']),
  },
  mounted() {
    this.changeTheme(localStorage.theme);
  },
};
</script>
