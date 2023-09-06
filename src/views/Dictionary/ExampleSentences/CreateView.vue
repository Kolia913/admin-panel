<template>
  <breadcrumbs :breadcrumbs="breadcrumbs" />
  <div>Sentences Create</div>
</template>
<script>
export default {
  name: 'CreateView',
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Sentences',
          link: { name: 'SentencesList' },
        },
        {
          title: 'Create',
          link: { name: 'SentencesCreate' },
        },
      ],
    };
  },
};
</script>
