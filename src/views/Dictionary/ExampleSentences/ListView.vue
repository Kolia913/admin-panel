<template>
  <breadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="pt-2">
    <page-title text="Example Sentences" />
  </div>
</template>
<script>
export default {
  name: 'ListView',
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Sentences',
          link: { name: 'SentencesList' },
        },
        {
          title: 'List',
          link: { name: 'SentencesList' },
        },
      ],
    };
  },
};
</script>
