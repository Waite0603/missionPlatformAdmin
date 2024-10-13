export default {
  path: '/courses',
  meta: {
    icon: 'ri:book-2-line',
    // showLink: false,
    title: '课程页面',
    rank: 9
  },
  children: [
    {
      path: '/courses/tag',
      name: 'CoursesTag',
      component: () => import('@/views/course/tag/index.vue'),
      meta: {
        title: '分类标签',
        showParent: true
      }
    },
    {
      path: '/courses/list',
      name: 'CoursesList',
      component: () => import('@/views/course/list/index.vue'),
      meta: {
        title: '课程列表',
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable
