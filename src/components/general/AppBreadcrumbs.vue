<template>
  <div class="sm:flex hidden flex-row justify-start items-center gap-x-2 flex-wrap">
    <div
      v-for="(item, idx) in breadcrumbs"
      :key="`${item?.link?.name}_${idx}`"
      class="flex flex-row justify-start items-center gap-x-2"
    >
      <router-link
        :to="item.link"
        class="text-gray-500 dark:text-gray-400 text-sm hover:text-grey-400 dark:hover:text-grey-100 font-normal capitalize"
      >
        {{ item.title }}
      </router-link>
      <ArrowIcon class="w-2.5 h-2.5 rotate-90" v-if="idx !== breadcrumbs.length - 1" />
    </div>
  </div>
</template>
<script>
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
export default {
  name: 'AppBreadcrumbs',
  components: { ArrowIcon },
  props: ['breadcrumbs'],
};
</script>
