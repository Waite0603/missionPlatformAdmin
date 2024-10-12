export default {
  path: '/feedback',
  meta: {
    icon: 'ri:mail-add-line',
    // showLink: false,
    title: '反馈管理',
    rank: 9
  },
  children: [
    {
      path: '/feedback/index',
      name: 'Feedback',
      component: () => import('@/views/feedback/index.vue'),
      meta: {
        title: '反馈',
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable
