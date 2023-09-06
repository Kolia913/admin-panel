<template>
  <breadcrumbs :breadcrumbs="breadcrumbs" />
  <div>Users Dictionaries Edit</div>
</template>
<script>
export default {
  name: 'EditView',
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Users Dictionaries',
          link: { name: 'UsersDictionariesList' },
        },
        {
          title: this.$route.params.slug,
          link: { name: 'UsersDictionariesEdit', params: { slug: this.$route.params.slug } },
        },
        {
          title: 'Edit',
          link: { name: 'UsersDictionariesEdit', params: { slug: this.$route.params.slug } },
        },
      ],
    };
  },
};
</script>
