import { defineStore } from 'pinia';

export default defineStore('settings', {
  state: () => ({
    isMobileAsideOpen: false,
    currentTheme: localStorage.theme,
  }),
  actions: {
    toggleMobileAside() {
      this.isMobileAsideOpen = !this.isMobileAsideOpen;
    },
    changeTheme(variant) {
      if (!variant) {
        localStorage.removeItem('theme');
        this.currentTheme = undefined;
      } else {
        localStorage.theme = variant;
        this.currentTheme = variant;
      }

      if (
        variant === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});
