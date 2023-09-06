<template>
  <breadcrumbs :breadcrumbs="breadcrumbs" />
  <div>Dictionaries Create</div>
</template>
<script>
export default {
  name: 'CreateView',
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Dictionaries',
          link: { name: 'DictionariesList' },
        },
        {
          title: 'Create',
          link: { name: 'DictionariesCreate' },
        },
      ],
    };
  },
};
</script>
