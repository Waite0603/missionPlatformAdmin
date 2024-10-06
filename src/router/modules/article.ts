export default {
  path: '/articles',
  meta: {
    icon: 'ri:article-line',
    // showLink: false,
    title: '文章页面',
    rank: 9
  },
  children: [
    {
      path: '/articles/index',
      name: 'Articles',
      component: () => import('@/views/article/index.vue'),
      meta: {
        title: '文章',
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable
