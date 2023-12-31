<template>
  <transition name="fade">
    <div
      class="w-56 bg-white dark:bg-grey-dark-100 rounded-lg border shadow-lg dropdown dark:border-grey-dark-border"
      v-click-outside="closeDropdown"
      v-if="isOpen"
    >
      <div
        class="h-5 flex flex-row justify-start gap-2 items-center w-full border-b dark:border-grey-dark-border px-4 dropdown__username"
      >
        <ProfileIcon class="w-6 h-6" />
        <span class="text-sm">Demo User</span>
      </div>
      <div class="flex flex-row justify-center gap-2 p-1 border-b dark:border-grey-dark-border">
        <div
          class="w-full h- flex flex-row justify-center items-center hover:bg-grey-bg dark:hover:bg-grey-dark-50 rounded-lg cursor-pointer"
          :class="{
            'bg-grey-bg': currentTheme === Theme.LIGHT,
          }"
          @click="onThemeChange(Theme.LIGHT)"
        >
          <SunIcon class="w-6 h-6" :color="currentTheme === Theme.LIGHT ? '#F59E0B' : undefined" />
        </div>
        <div
          class="w-full h-9 flex flex-row justify-center items-center hover:bg-grey-bg dark:hover:bg-grey-dark-50 rounded-lg cursor-pointer"
          :class="{
            'bg-grey-dark-50': currentTheme === Theme.DARK,
          }"
          @click="onThemeChange(Theme.DARK)"
        >
          <MoonIcon class="w-5 h-5" :color="currentTheme === Theme.DARK ? '#FBBF24' : undefined" />
        </div>
        <div
          class="w-full h-9 flex flex-row justify-center items-center hover:bg-grey-bg dark:hover:bg-grey-dark-50 rounded-lg cursor-pointer"
          :class="{
            'bg-grey-bg dark:bg-grey-dark-50': currentTheme === undefined,
          }"
          @click="onThemeChange()"
        >
          <DesktopIcon
            class="w-5 h-5"
            :color="currentTheme === undefined ? (isDarkTheme ? '#FBBF24' : '#F59E0B') : undefined"
          />
        </div>
      </div>
      <div class="flex w-full h-10 pt-1 px-1">
        <div
          class="cursor-pointer flex flex-row justify-start items-center gap-2 hover:bg-grey-bg dark:hover:bg-grey-dark-50 rounded-lg w-full pl-2"
        >
          <SignoutIcon class="w-5 h-5" />
          <span class="text-sm">Sign Out</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import ProfileIcon from '@/components/icons/ProfileIcon.vue';
import MoonIcon from '@/components/icons/MoonIcon.vue';
import SunIcon from '@/components/icons/SunIcon.vue';
import DesktopIcon from '@/components/icons/DesktopIcon.vue';
import SignoutIcon from '@/components/icons/SignoutIcon.vue';

export default {
  name: 'ProfileDropdown',
  props: ['isOpen', 'currentTheme'],
  components: { ProfileIcon, MoonIcon, SunIcon, DesktopIcon, SignoutIcon },
  data() {
    return {
      Theme: {
        DARK: 'dark',
        LIGHT: 'light',
      },
    };
  },
  computed: {
    isDarkTheme() {
      if (this.currentTheme !== undefined) {
        return this.currentTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
  },
  methods: {
    closeDropdown() {
      this.$emit('onCloseDropdown');
    },
    onThemeChange(variant) {
      this.$emit('onThemeChange', variant);
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  height: 134px;
  &__username {
    padding-top: 21px;
    padding-bottom: 21px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
