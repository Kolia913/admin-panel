<template>
  <div
    class="fixed top-0 flex flex-row gap-2 justify-between items-center h-16 border-b w-full bg-white lg:px-8 px-2 header dark:bg-grey-dark-100 dark:border-b-grey-dark-border"
  >
    <div class="justify-self-start">
      <Burger :active="isMobileAsideOpen" @toggleMenu="toggleAside" />
    </div>
    <div class="flex flex-row lg:gap-6 gap-2">
      <SearchInput class="lg:w-64 w-auto" name="header-searchbar" />
      <div
        class="relative w-10 h-10 flex justify-center items-center cursor-pointer"
        @click="openNotifications"
      >
        <AppBadge class="w-5 h-5 absolute top-0 right-0" :count="0" />
        <BellIcon class="w-8 h-8" />
      </div>
      <div
        class="rounded-full overflow-hidden cursor-pointer avatar"
        @click="toggleProfileDropdown(true)"
      >
        <AvatarDemo class="w-10 h-10" />
      </div>
    </div>
    <div class="absolute top-14 lg:right-8 right-2">
      <ProfileDropdown
        :is-open="isProfileDropDownShown"
        :current-theme="currentTheme"
        @onCloseDropdown="toggleProfileDropdown(false)"
        @onThemeChange="changeTheme"
      />
    </div>
    <Teleport to="#app">
      <NotificationsAside
        :isNotificationsOpen="isNotificationsOpen"
        @onClose="isNotificationsOpen = false"
      />
    </Teleport>
  </div>
</template>
<script>
import SearchInput from '@/components/atoms/inputs/SearchInput.vue';
import BellIcon from '@/components/icons/BellIcon.vue';
import AvatarDemo from '@/components/icons/AvatarDemo.vue';
import AppBadge from '@/components/atoms/AppBadge.vue';
import Burger from '@/components/atoms/buttons/Burger.vue';
import ProfileDropdown from './ProfileDropdown.vue';
import NotificationsAside from '../NotificationsAside/NotificationsAside.vue';

import { mapState, mapActions } from 'pinia';
import useSettingsStore from '@/stores/settings';

export default {
  name: 'AppHeader',
  components: {
    SearchInput,
    BellIcon,
    AvatarDemo,
    AppBadge,
    Burger,
    ProfileDropdown,
    NotificationsAside,
  },
  data() {
    return {
      isProfileDropDownShown: false,
      isNotificationsOpen: false,
    };
  },
  computed: {
    ...mapState(useSettingsStore, ['isMobileAsideOpen', 'currentTheme']),
  },
  methods: {
    toggleAside() {
      this.toggleMobileAside();
    },
    toggleProfileDropdown(value) {
      this.isProfileDropDownShown = value;
    },
    openNotifications() {
      this.isNotificationsOpen = true;
    },
    ...mapActions(useSettingsStore, ['toggleMobileAside', 'changeTheme']),
  },
};
</script>
<style lang="scss" scoped>
.header {
  z-index: 5;
  padding-left: 340px;
  @media screen and (max-width: 1280px) {
    padding-left: 280px;
  }
  @media screen and (max-width: 1023px) {
    padding-left: 8px;
  }
}
.avatar {
  min-width: 40px;
}
</style>
