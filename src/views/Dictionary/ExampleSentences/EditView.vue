<template>
  <breadcrumbs :breadcrumbs="breadcrumbs" />
  <div>Sentences Edit</div>
</template>
<script>
export default {
  name: 'EditView',
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Sentences',
          link: { name: 'SentencesList' },
        },
        {
          title: this.$route.params.slug,
          link: { name: 'SentencesEdit', params: { slug: this.$route.params.slug } },
        },
        {
          title: 'Edit',
          link: { name: 'SentencesEdit', params: { slug: this.$route.params.slug } },
        },
      ],
    };
  },
};
</script>
