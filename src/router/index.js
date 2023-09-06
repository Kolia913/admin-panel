import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import Dictionaries from '@/views/Dictionary/Dictionaries';
import Sentences from '@/views/Dictionary/ExampleSentences';
import UsersDictionaries from '@/views/Dictionary/UsersDictionaries';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      meta: { layout: 'main', breadcrumbs: [] },
    },
    {
      path: '/dictionaries',
      name: 'Dictionaries',
      component: Dictionaries.IndexView,
      meta: { layout: 'main' },
      children: [
        {
          path: '',
          name: 'DictionariesList',
          component: Dictionaries.ListView,
        },
        {
          path: 'create',
          name: 'DictionariesCreate',
          component: Dictionaries.CreateView,
        },
        {
          path: ':slug/edit',
          name: 'DictionariesEdit',
          component: Dictionaries.EditView,
        },
      ],
    },
    {
      path: '/sentences',
      name: 'Sentences',
      component: Sentences.IndexView,
      meta: { layout: 'main' },
      children: [
        {
          path: '',
          name: 'SentencesList',
          component: Sentences.ListView,
        },
        {
          path: 'create',
          name: 'SentencesCreate',
          component: Sentences.CreateView,
        },
        {
          path: ':slug/edit',
          name: 'SentencesEdit',
          component: Sentences.EditView,
        },
      ],
    },
    {
      path: '/users-dictionaries',
      name: 'UsersDictionaries',
      component: UsersDictionaries.IndexView,
      meta: { layout: 'main' },
      children: [
        {
          path: '',
          name: 'UsersDictionariesList',
          component: UsersDictionaries.ListView,
        },
        {
          path: 'create',
          name: 'UsersDictionariesCreate',
          component: UsersDictionaries.CreateView,
        },
        {
          path: ':slug/edit',
          name: 'UsersDictionariesEdit',
          component: UsersDictionaries.EditView,
        },
      ],
    },
  ],
});

export default router;
