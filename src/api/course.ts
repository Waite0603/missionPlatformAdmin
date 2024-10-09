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

// 查看所有分类标签
export const getCourseCategory = () => {
  return http.request<CourseCategoryListResult>('get', '/course/category/list')
}

// 删除分类标签
export const deleteCourseCategory = (id: number) => {
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
