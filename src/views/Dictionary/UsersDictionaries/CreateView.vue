<template>
  <breadcrumbs :breadcrumbs="breadcrumbs" />
  <div>Users Dictionaries Create</div>
</template>
<script>
export default {
  name: 'CreateView',
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Users Dictionaries',
          link: { name: 'UsersDictionariesList' },
        },
        {
          title: 'Create',
          link: { name: 'UsersDictionariesCreate' },
        },
      ],
    };
  },
};
</script>
