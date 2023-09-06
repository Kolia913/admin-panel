<template>
  <breadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="pt-2">
    <page-title text="Users Dictionaries" />
  </div>
</template>
<script>
export default {
  name: 'ListView',
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Users Dictionaries',
          link: { name: 'UsersDictionariesList' },
        },
        {
          title: 'List',
          link: { name: 'UsersDictionariesList' },
        },
      ],
    };
  },
};
</script>
