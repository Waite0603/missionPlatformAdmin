import { http } from '@/utils/http'

export type CourseCategoryParams = {
  id: number
  name: string
  desc: string
  create_time: string
  update_time: string
}

export type CourseCategoryListResult = {
  code: number
  msg: string
  data: CourseCategoryParams[]
}

export type Result = {
  code: number
  msg: string
}

// 课程信息类型
export type CourseInfoItem = {
  id: number
  name: string
  desc: string
  cover: string
  create_time: string
  update_time: string
  category_id: number
  category: string
  author_id: number
  status: number
}

export type CourseInfoListResult = {
  code: number
  msg: string
  data: CourseInfoItem[]
}

// 课程播放列表类型
export type ChapterListItem = {
  id: number
  name: string
  course_id: number
  video: string
  create_time: string
  update_time: string
  watch_num: number
  author_id: number
  status: number
}

export type CourseDetailResult = {
  code: number
  msg: string
  data: {
    course: CourseInfoItem
    chapter: ChapterListItem[]
  }
}

// 查看所有分类标签
export const getCourseCategoryAPI = () => {
  return http.request<CourseCategoryListResult>('get', '/course/category/list')
}

// 删除分类标签
export const deleteCourseCategoryAPI = (id: number) => {
  return http.request<Result>('get', '/course/category/delete?id=' + id)
}

// 添加分类标签
export const addCourseCategoryAPI = (data: object) => {
  return http.request<Result>('post', '/course/category/create', { data })
}

// 更新分类标签
export const updateCourseCategoryAPI = (data: object) => {
  return http.request<Result>('post', '/course/category/update', { data })
}

// 查看所有课程
export const getCourseAPI = () => {
  return http.request<CourseInfoListResult>('get', '/course/list')
}

// 更改课程会员状态
export const updateCourseStatusAPI = (id: number) => {
  return http.request<Result>('get', '/course/change/status?id=' + id)
}

// 删除课程
export const deleteCourseAPI = (id: number) => {
  return http.request<Result>('get', '/course/delete?id=' + id)
}

// 添加课程
export const addCourseAPI = (data: object) => {
  return http.request<CourseCategoryListResult>('post', '/course/create', {
    data
  })
}

// 根据 id 查看课程
export const getCourseDetailByIdAPI = (id: number) => {
  return http.request<CourseDetailResult>(
    'get',
    '/course/chapter/list?courseId=' + id
  )
}

// 更新课程信息
export const updateCourseAPI = (data: object) => {
  return http.request<Result>('post', '/course/update', { data })
}

// 添加课程章节
export const addCourseChapterAPI = (data: object) => {
  return http.request<Result>('post', '/course/chapter/create', { data })
}

// 更新课程章节
export const updateCourseChapterAPI = (data: object) => {
  return http.request<Result>('post', '/course/chapter/update', { data })
}
