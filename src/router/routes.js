
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('pages/HomePage.vue'),
  },
  {
    path: '/auth/login',
    name: 'auth.login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/auth/register',
    name: 'auth.register',
    component: () => import('pages/RegisterPage.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('pages/UserPage.vue'),
  },
  {
    path: '/profile/jokes',
    name: 'profile.jokes',
    component: () => import('pages/MyJokes.vue'),
  },
  {
    path: '/jokes/create',
    name: 'jokes.create',
    component: () => import('pages/CreateJokePage.vue'),
  },
  {
    path: '/jokes/:id/edit',
    name: 'jokes.edit',
    component: () => import('pages/EditJokePage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
