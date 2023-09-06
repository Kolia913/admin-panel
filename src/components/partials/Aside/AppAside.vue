<template>
  <DesktopAside
    :menuItems="menuItems"
    @toggleMenuGroup="toggleMenuGroup"
    :title="'Deschule Admin'"
    class="lg:block hidden"
  />
  <MobileAside
    :menuItems="menuItems"
    :isMobileAsideOpen="isMobileAsideOpen"
    @toggleMenuGroup="toggleMenuGroup"
    @toggleMobileAside="toggleMobileAside"
    :title="'Deschule Admin'"
    class="lg:hidden block"
  />
</template>
<script>
import HomeIcon from '@/components/icons/HomeIcon.vue';
import DictionariesIcon from '@/components/icons/dictionary/DictionariesIcon.vue';
import SentencesIcon from '@/components/icons/dictionary/SentencesIcon.vue';
import UsersDictionaries from '@/components/icons/dictionary/UsersDictionaries.vue';

import DesktopAside from './DesktopAside.vue';
import MobileAside from './MobileAside.vue';

import { mapState, mapActions } from 'pinia';
import useSettingsStore from '@/stores/settings';

export default {
  name: 'AppAside',
  components: { DesktopAside, MobileAside },
  data() {
    return {
      menuItems: [
        {
          id: 1,
          icon: HomeIcon,
          isGroup: false,
          title: 'Dashboard',
          link: '/',
        },
        {
          id: 2,
          isGroup: true,
          icon: undefined,
          link: undefined,
          title: 'Dictionary',
          isOpen: true,
          subItems: [
            {
              id: 21,
              icon: DictionariesIcon,
              isGroup: false,
              title: 'Dictionaries',
              link: '/dictionaries',
            },
            {
              id: 22,
              icon: SentencesIcon,
              isGroup: false,
              title: 'Example Sentences',
              link: '/sentences',
            },
            {
              id: 23,
              icon: UsersDictionaries,
              isGroup: false,
              title: 'User Dictionaries',
              link: '/users-dictionaries',
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState(useSettingsStore, ['isMobileAsideOpen']),
  },
  methods: {
    toggleMenuGroup(groupId) {
      this.menuItems = this.menuItems.map((item) => {
        if (item.id === groupId) {
          return {
            ...item,
            isOpen: !item.isOpen,
          };
        }
        return item;
      });
    },
    ...mapActions(useSettingsStore, ['toggleMobileAside']),
  },
};
</script>
