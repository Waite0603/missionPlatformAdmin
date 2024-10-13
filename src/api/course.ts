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

// 删除课程
export const deleteCourseAPI = (id: number) => {
  return http.request<Result>('get', '/course/delete?id=' + id)
}
